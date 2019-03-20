//using Abp.Application.Services;
//using Abp.Authorization;
//using Abp.BackgroundJobs;
//using Abp.Dependency;
//using Abp.Domain.Repositories;
//using Abp.Domain.Uow;
//using Abp.Net.Mail;
//using Abp.Runtime.Session;
//using Abp.Threading.BackgroundWorkers;
//using Abp.Threading.Timers;
//using Abp.Timing;
//using SunriseBank.Authorization.Users;
//using System;
//using System.Threading;
//using System.Threading.Tasks;

//namespace SunriseBank
//{
//    public class SimpleSendEmailJob : BackgroundJob<SimpleSendEmailJobArgs>, ITransientDependency
//    {
//        private readonly IRepository<User, long> _userRepository;
//        private readonly IEmailSender _emailSender;

//        public SimpleSendEmailJob(IRepository<User, long> userRepository, IEmailSender emailSender)
//        {
//            _userRepository = userRepository;
//            _emailSender = emailSender;
//        }

//        [UnitOfWork]
//        public override void Execute(SimpleSendEmailJobArgs args)
//        {
//            var senderUser = _userRepository.Get(args.SenderUserId);
//            var targetUser = _userRepository.Get(args.TargetUserId);

//            _emailSender.Send(senderUser.EmailAddress, targetUser.EmailAddress, args.Subject, args.Body);
//        }
//    }

//    [AbpAuthorize]
//    public class MyEmailAppService : ApplicationService, IMyEmailAppService
//    {
//        private readonly IBackgroundJobManager _backgroundJobManager;

//        public MyEmailAppService(IBackgroundJobManager backgroundJobManager)
//        {
//            _backgroundJobManager = backgroundJobManager;
//        }

//        public async Task SendEmail(SendEmailInput input)
//        {
//            await _backgroundJobManager.EnqueueAsync<SimpleSendEmailJob, SimpleSendEmailJobArgs>(
//            new SimpleSendEmailJobArgs
//            {
//                Subject = input.Subject,
//                Body = input.Body,
//                SenderUserId = AbpSession.GetUserId(),
//                TargetUserId = input.TargetUserId
//            });
//        }
//    }

//    public class SendEmailInput
//    {
//        public string Subject { get; set; }
//        public string Body { get; set; }
//        public long TargetUserId { get; set; } 
//    }

//    public interface IMyEmailAppService
//    {
//    }

//    [Serializable]
//    public class SimpleSendEmailJobArgs
//    {
//        public long SenderUserId { get; set; }

//        public long TargetUserId { get; set; }

//        public string Subject { get; set; }

//        public string Body { get; set; }
//    }
//    public class MakeInactiveUsersPassiveWorker : PeriodicBackgroundWorkerBase, ISingletonDependency
//{
//    private readonly IRepository<User, long> _userRepository;

//    public MakeInactiveUsersPassiveWorker(AbpTimer timer, IRepository<User, long> userRepository)
//        : base(timer)
//    {
//        _userRepository = userRepository;
//        Timer.Period = 5000; //5 seconds (good for tests, but normally will be more)
//    }

//    [UnitOfWork]
//    protected override void DoWork()
//    {
//        using (CurrentUnitOfWork.DisableFilter(AbpDataFilters.MayHaveTenant))
//        {
//            var oneMonthAgo = Clock.Now.Subtract(TimeSpan.FromDays(30));

//            var inactiveUsers = _userRepository.GetAllList(u =>
//                u.IsActive &&
//                ((u.LastLoginTime < oneMonthAgo && u.LastLoginTime != null) || (u.CreationTime < oneMonthAgo && u.LastLoginTime == null))
//                );

//            foreach (var inactiveUser in inactiveUsers)
//            {
//                inactiveUser.IsActive = false;
//                Logger.Info(inactiveUser + " made passive since he/she did not login in last 30 days.");
//            }

//            CurrentUnitOfWork.SaveChanges();
//        }
//    }
//   }
//}

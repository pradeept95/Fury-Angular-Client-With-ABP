using Abp;
using Abp.Application.Services;
using Abp.AutoMapper;
using Abp.Domain.Entities.Auditing;
using Abp.Modules;
using Abp.Reflection.Extensions;
using Abp.Threading.BackgroundWorkers;
using SunriseBank.Application.Admin.Authorization; 

namespace SunriseBank
{
    [DependsOn(
        typeof(SunriseBankCoreModule), 
        typeof(AbpAutoMapperModule))]
    public class SunriseBankAdminApplicationModule : AbpModule
    {
        public override void PreInitialize()
        {
            Configuration.Authorization.Providers.Add<SunriseBankAdminAuthorizationProvider>();

            Configuration.Auditing.IsEnabled = true;
            Configuration.Auditing.IsEnabledForAnonymousUsers = true; 
            Configuration.Auditing.Selectors.Add(
                new NamedTypeSelector(
                    "Abp.ApplicationServices",
                    type => typeof(IApplicationService).IsAssignableFrom(type)
                )
            );

            Configuration.Auditing.IsEnabledForAnonymousUsers = true;
            Configuration.Auditing.RunInBackground = true;

            Configuration.EntityHistory.IsEnabledForAnonymousUsers = true; 
            Configuration.EntityHistory.Selectors.Add(
                   new NamedTypeSelector(
                    "Abp.FullAuditedEntities",
                    type => typeof(IFullAudited).IsAssignableFrom(type)));

            //var workManager = IocManager.Resolve<IBackgroundWorkerManager>();
            //workManager.Add(IocManager.Resolve<MakeInactiveUsersPassiveWorker>());
        }

        public override void Initialize()
        {
            var thisAssembly = typeof(SunriseBankAdminApplicationModule).GetAssembly();

            IocManager.RegisterAssemblyByConvention(thisAssembly);

            Configuration.Modules.AbpAutoMapper().Configurators.Add(
                // Scan the assembly for classes which inherit from AutoMapper.Profile
                cfg => cfg.AddProfiles(thisAssembly)
            );
        }
    }
}

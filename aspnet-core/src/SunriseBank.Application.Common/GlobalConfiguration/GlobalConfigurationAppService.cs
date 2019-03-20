//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Threading.Tasks;
//using Abp.Application.Services;
//using Abp.Application.Services.Dto;
//using Abp.Domain.Repositories;
//using Abp.UI;
//using Microsoft.EntityFrameworkCore; 
//using Abp.Authorization;
//using SunriseBank.Authorization;

//namespace SunriseBank.Application.Common.CompanyInfo
//{
//    [AbpAuthorize(PermissionNames.Pages_Users)]
//    public class GlobalConfigurationAppService : PSPAppServiceBase, IGlobalConfigurationAppService
//    {
//        private readonly IRepository<PSP.Models.GlobalConfiguration, Guid> _repository;
        
//        public GlobalConfigurationAppService(IRepository<PSP.Models.GlobalConfiguration, Guid> repository, IFileService fileService)
//        {
//            _repository = repository;
//        }

//        public async Task<List<GlobalConfigurationDTO>> getAllConfig()
//        {
//            return await _repository.GetAll()
//                .Where(x => !x.IsDeleted)
//                .Select(x => new GlobalConfigurationDTO
//                {
//                    Id = x.Id,
//                    Key = x.Key,
//                    Value = x.Value
//                }).ToListAsync();
//        }

//        public async Task<List<GlobalConfigurationDTO>> UpdateConfig(CreateGlobalConfigDTO input)
//        {
//            if (input.Configs.Any())
//            {
//                var confs = _repository.GetAll().Where(x => !x.IsDeleted);

//                foreach (var item in input.Configs)
//                {
//                    var a = await confs.FirstOrDefaultAsync(x => x.Key == item.Key);
//                    if (a == null)
//                    {
//                        throw new UserFriendlyException("Invalid key");
//                    }
//                    a.Value = item.Value;
//                    await _repository.UpdateAsync(a);
//                }
//                CurrentUnitOfWork.SaveChanges();

//            }
//            else throw new UserFriendlyException("Invalid Operation");
//            return input.Configs;
//        }

//        public async Task<string> getValueByKey(string key)
//        {
//            var confs = await _repository.GetAll().FirstOrDefaultAsync(x => !x.IsDeleted && x.Key == key);
//            return confs != null ? confs.Value : string.Empty;
//        }

//    }
//}


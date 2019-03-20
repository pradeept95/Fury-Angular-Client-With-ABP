
using Abp.AutoMapper;
using Abp.Dependency;
using Abp.Modules;
using Abp.Reflection.Extensions;
using PSP.Application.Common.EmailServices;
using SunriseBank.Application.Common.EncryptionDecryptionService;
using SunriseBank.Application.Common.FileService;
using System.Reflection;

namespace SunriseBank
{
    [DependsOn(
        typeof(SunriseBankCoreModule), 
        typeof(AbpAutoMapperModule))]
    public class SunriseBankCommonApplicationModule : AbpModule
    {
        public override void PreInitialize()
        {
           // Configuration.Authorization.Providers.Add<PSPAuthorizationProvider>();
        }

        public override void Initialize()
        {
            var thisAssembly = typeof(SunriseBankCommonApplicationModule).GetAssembly();

            IocManager.RegisterAssemblyByConvention(thisAssembly);

            IocManager.Register<IEmailService, EmailService>(DependencyLifeStyle.Transient);
            IocManager.Register<IFileService, FileService>(DependencyLifeStyle.Transient);
            IocManager.Register<IEncryptionDecryptionService, EncryptionDecryptionService>(DependencyLifeStyle.Transient);

            Configuration.Modules.AbpAutoMapper().Configurators.Add(
                // Scan the assembly for classes which inherit from AutoMapper.Profile
                cfg => cfg.AddProfiles(thisAssembly)
            );

            // api/services/<module-name>/<service-name>/<method-name>
            //Configuration.Modules.AbpAspNetCore()
            //    .CreateControllersForAppServices(typeof(PSPCommonApplicationModule).Assembly, moduleName: "mobile", useConventionalHttpVerbs: false);
        }
    }
}

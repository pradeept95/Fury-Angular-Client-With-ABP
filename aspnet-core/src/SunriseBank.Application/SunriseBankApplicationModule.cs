using Abp;
using Abp.AutoMapper;
using Abp.Domain.Entities.Auditing;
using Abp.Modules;
using Abp.Reflection.Extensions;
using SunriseBank.Authorization;

namespace SunriseBank
{
    [DependsOn(
        typeof(SunriseBankCoreModule),
        typeof(AbpAutoMapperModule))]
    public class SunriseBankApplicationModule : AbpModule
    {
        public override void PreInitialize()
        {
            Configuration.Authorization.Providers.Add<SunriseBankAuthorizationProvider>();

            Configuration.Auditing.IsEnabled = true;

            Configuration.Auditing.IsEnabledForAnonymousUsers = true;
            Configuration.Auditing.RunInBackground = true;

            Configuration.EntityHistory.IsEnabledForAnonymousUsers = true;
            Configuration.EntityHistory.Selectors.Add(
                   new NamedTypeSelector(
                    "Abp.FullAuditedEntities",
                    type => typeof(IFullAudited).IsAssignableFrom(type)));

        }

        public override void Initialize()
        {
            var thisAssembly = typeof(SunriseBankApplicationModule).GetAssembly();

            IocManager.RegisterAssemblyByConvention(thisAssembly);

            Configuration.Modules.AbpAutoMapper().Configurators.Add(
                // Scan the assembly for classes which inherit from AutoMapper.Profile
                cfg => cfg.AddProfiles(thisAssembly)
            );
        }
    }
}

using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Abp.Modules;
using Abp.Reflection.Extensions;
using SunriseBank.Configuration;

namespace SunriseBank.Web.Host.Startup
{
    [DependsOn(
       typeof(SunriseBankWebCoreModule))]
    public class SunriseBankWebHostModule: AbpModule
    {
        private readonly IHostingEnvironment _env;
        private readonly IConfigurationRoot _appConfiguration;

        public SunriseBankWebHostModule(IHostingEnvironment env)
        {
            _env = env;
            _appConfiguration = env.GetAppConfiguration();
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(SunriseBankWebHostModule).GetAssembly());
        }
    }
}

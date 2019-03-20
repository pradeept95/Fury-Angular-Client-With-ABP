using System;
using System.Text;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Abp.AspNetCore;
using Abp.AspNetCore.Configuration;
using Abp.AspNetCore.SignalR;
using Abp.Modules;
using Abp.Reflection.Extensions;
using Abp.Zero.Configuration;
using SunriseBank.Authentication.JwtBearer;
using SunriseBank.Configuration;
using SunriseBank.EntityFrameworkCore;
using Abp.Application.Services;
using Abp.Configuration.Startup;

namespace SunriseBank
{
    
    [DependsOn(
         typeof(SunriseBankApplicationModule),
         typeof(SunriseBankEntityFrameworkModule),
         typeof(AbpAspNetCoreModule)
        ,typeof(AbpAspNetCoreSignalRModule)
        , typeof(SunriseBankCommonApplicationModule)
         , typeof(SunriseBankAdminApplicationModule)
     )]
    public class SunriseBankWebCoreModule : AbpModule
    {
        private readonly IHostingEnvironment _env;
        private readonly IConfigurationRoot _appConfiguration;

        public SunriseBankWebCoreModule(IHostingEnvironment env)
        {
            _env = env;
            _appConfiguration = env.GetAppConfiguration();
        }

        public override void PreInitialize()
        {
            Configuration.DefaultNameOrConnectionString = _appConfiguration.GetConnectionString(
                SunriseBankConsts.ConnectionStringName
            );

            // Use database for language management
            Configuration.Modules.Zero().LanguageManagement.EnableDbLocalization();

            Configuration.Modules.AbpAspNetCore()
                 .CreateControllersForAppServices(
                     typeof(SunriseBankApplicationModule).GetAssembly()
                 );

            Configuration.Modules.AbpAspNetCore()
                .CreateControllersForAppServices(
                    typeof(SunriseBankCommonApplicationModule).GetAssembly(), "common"
                );

            Configuration.Modules.AbpAspNetCore()
             .CreateControllersForAppServices(
                 typeof(SunriseBankAdminApplicationModule).GetAssembly(), "admin"
             );


            ConfigureTokenAuth();
            ApplicationService.CommonPostfixes = new string[] { "MobileService", "CommonService", "AdminService", "AppService", "ApplicationService", "Service" };
            Configuration.Modules.AbpWebCommon().SendAllExceptionsToClients = true; 
            Configuration.MultiTenancy.IsEnabled = false;
        }

        private void ConfigureTokenAuth()
        {
            IocManager.Register<TokenAuthConfiguration>();
            var tokenAuthConfig = IocManager.Resolve<TokenAuthConfiguration>();

            tokenAuthConfig.SecurityKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_appConfiguration["Authentication:JwtBearer:SecurityKey"]));
            tokenAuthConfig.Issuer = _appConfiguration["Authentication:JwtBearer:Issuer"];
            tokenAuthConfig.Audience = _appConfiguration["Authentication:JwtBearer:Audience"];
            tokenAuthConfig.SigningCredentials = new SigningCredentials(tokenAuthConfig.SecurityKey, SecurityAlgorithms.HmacSha256);
            tokenAuthConfig.Expiration = TimeSpan.FromDays(1);
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(SunriseBankWebCoreModule).GetAssembly());
        }
    }
}

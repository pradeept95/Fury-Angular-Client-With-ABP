using Abp.AspNetCore.Mvc.Controllers;
using Abp.IdentityFramework;
using Microsoft.AspNetCore.Identity;

namespace SunriseBank.Controllers
{
    public abstract class SunriseBankControllerBase: AbpController
    {
        protected SunriseBankControllerBase()
        {
            LocalizationSourceName = SunriseBankConsts.LocalizationSourceName;
        }

        protected void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}

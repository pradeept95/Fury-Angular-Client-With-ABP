using System.Threading.Tasks;
using Abp.Authorization;
using Abp.Runtime.Session;
using SunriseBank.Configuration.Dto;

namespace SunriseBank.Configuration
{
    [AbpAuthorize]
    public class ConfigurationAppService : SunriseBankAppServiceBase, IConfigurationAppService
    {
        public async Task ChangeUiTheme(ChangeUiThemeInput input)
        {
            await SettingManager.ChangeSettingForUserAsync(AbpSession.ToUserIdentifier(), AppSettingNames.UiTheme, input.Theme);
        }
    }
}

using System.Threading.Tasks;
using SunriseBank.Configuration.Dto;

namespace SunriseBank.Configuration
{
    public interface IConfigurationAppService
    {
        Task ChangeUiTheme(ChangeUiThemeInput input);
    }
}

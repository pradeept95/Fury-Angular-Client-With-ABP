using System.Threading.Tasks;
using Abp.Application.Services;
using SunriseBank.Sessions.Dto;

namespace SunriseBank.Sessions
{
    public interface ISessionAppService : IApplicationService
    {
        Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();
    }
}

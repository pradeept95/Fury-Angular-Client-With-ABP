using Abp.Application.Services;
using Abp.Application.Services.Dto;
using SunriseBank.MultiTenancy.Dto;

namespace SunriseBank.MultiTenancy
{
    public interface ITenantAppService : IAsyncCrudAppService<TenantDto, int, PagedResultRequestDto, CreateTenantDto, TenantDto>
    {
    }
}

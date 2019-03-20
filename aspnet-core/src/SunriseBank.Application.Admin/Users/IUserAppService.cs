using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using SunriseBank.Roles.Dto;
using SunriseBank.Users.Dto;

namespace SunriseBank.Users
{
    public interface IUserAppService : IAsyncCrudAppService<UserDto, long, PagedResultRequestDto, CreateUserDto, UserDto>
    {
        Task<ListResultDto<RoleDto>> GetRoles();

        Task ChangeLanguage(ChangeUserLanguageDto input);
    }
}

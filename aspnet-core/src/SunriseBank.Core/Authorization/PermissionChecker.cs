using Abp.Authorization;
using SunriseBank.Authorization.Roles;
using SunriseBank.Authorization.Users;

namespace SunriseBank.Authorization
{
    public class PermissionChecker : PermissionChecker<Role, User>
    {
        public PermissionChecker(UserManager userManager)
            : base(userManager)
        {
        }
    }
}

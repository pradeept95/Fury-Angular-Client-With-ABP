using Abp.Authorization;
using Abp.Localization;
using Abp.MultiTenancy;

namespace SunriseBank.Application.Admin.Authorization
{
    public class SunriseBankAdminAuthorizationProvider : AuthorizationProvider
    {
        public override void SetPermissions(IPermissionDefinitionContext context)
        {
            var permissionName = new PermissionNames();

            var applicationName = permissionName.ApplicationKey;

            var administration = context.CreatePermission(applicationName, L(applicationName));

            var allPermissionWithAuthLevel = permissionName.ServicesWithPermission;

            foreach (var permission in allPermissionWithAuthLevel)
            {
                var serviceLevelPermission = administration.CreateChildPermission(AdminPermissionHandler.GetPermissionNameWithWithService(permission.ServiceName), L(permission.ServiceName));
                foreach (var permissionLevel in permission.AuthorizationLevel)
                {
                    serviceLevelPermission.CreateChildPermission(AdminPermissionHandler.GetPermissionNameWithAuthLevel(permission.ServiceName, permissionLevel), L(permissionLevel.ToString()));
                }
            } 
        }

        private static ILocalizableString L(string name)
        {
            return new LocalizableString(name, SunriseBankConsts.LocalizationSourceName);
        }
    }
}

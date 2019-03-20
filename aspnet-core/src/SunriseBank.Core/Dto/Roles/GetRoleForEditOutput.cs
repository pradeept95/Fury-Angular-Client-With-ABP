using System.Collections.Generic;

namespace SunriseBank.Roles.Dto
{
    public class GetRoleForEditOutput
    {
        public RoleEditDto Role { get; set; }

        public List<FlatPermissionDto> Permissions { get; set; }

        public List<PermissionDto> PermissionsHierarchy { get; set; }

        public List<string> GrantedPermissionNames { get; set; }
    }
}
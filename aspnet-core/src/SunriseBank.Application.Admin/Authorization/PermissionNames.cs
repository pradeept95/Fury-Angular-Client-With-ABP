using SunriseBank.Enum;
using System.Collections.Generic;

namespace SunriseBank.Application.Admin.Authorization
{ 
    public static class AdminPermissionHandler
    {
        public const string ApplicationKey = "BankAdmin";

        public static string GetPermissionNameWithWithService(string serviceName)
        {
            var permissionName = string.Join(".", new List<string> { ApplicationKey, serviceName});
            return permissionName;
        }

        public static string GetPermissionNameWithAuthLevel(string serviceName, AuthorizationLevel authorizationLevel)
        {
            var permissionName = string.Join(".", new List<string> { ApplicationKey, serviceName, authorizationLevel.ToString() });
            return permissionName;
        }
    }

    public class PermissionNames
    {
        public string ApplicationKey = string.Empty;
        public List<AuthorizationNamePermissionModel> ServicesWithPermission;
        public PermissionNames()
        {
            ApplicationKey = "BankAdmin";
            ServicesWithPermission = new List<AuthorizationNamePermissionModel> {
                new AuthorizationNamePermissionModel {
                    ServiceName = ServiceNames.Template_services,
                    AuthorizationLevel = new List<AuthorizationLevel>
                    {
                        AuthorizationLevel.Read,
                        AuthorizationLevel.Write,
                        AuthorizationLevel.Modify,
                        AuthorizationLevel.Delete,
                        AuthorizationLevel.Approve
                   }
                },
                new AuthorizationNamePermissionModel {
                    ServiceName = "OtherTemplate",
                    AuthorizationLevel = new List<AuthorizationLevel>
                    {
                        AuthorizationLevel.Read,
                        AuthorizationLevel.Write,
                        AuthorizationLevel.Modify,
                        AuthorizationLevel.Delete,
                        AuthorizationLevel.Approve
                   }
                }
            }; 
        }
    }

    public static class ServiceNames
    {
        public const string Template_services = "Template";
    }

    public static class AdminPermissionNames
    {
        //for template
        public const string template_service_per = "BankAdmin.Template";
        public const string template_service_read_per = "BankAdmin.Template.Read";
        public const string template_service_write_per = "BankAdmin.Template.Write";
        public const string template_service_modify_per = "BankAdmin.Template.Modify";
        public const string template_service_delete_per = "BankAdmin.Template.Delete";
        public const string template_service_approve_per = "BankAdmin.Template.Approve";
    }


    public class AuthorizationNamePermissionModel
    {
        public string ServiceName { get; set; }
        public List<AuthorizationLevel> AuthorizationLevel { get; set; }
    }
}

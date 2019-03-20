using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using Abp.Authorization;
using System.Collections.Generic;

namespace SunriseBank.Roles.Dto
{
    [AutoMapFrom(typeof(Permission))]
    public class PermissionDto : EntityDto<long>
    { 
        public PermissionDto()
        {
            ChildPermission = new List<PermissionDto>();
        }
        public string Name { get; set; }

        public string DisplayName { get; set; }

        public string Description { get; set; }
        public bool IsAssigned { get; set; }

        public List<PermissionDto> ChildPermission { get; set; }
    }
}

using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Authorization;
using Abp.Domain.Repositories;
using Abp.IdentityFramework;
using Abp.Linq.Extensions;
using Abp.Extensions;
using SunriseBank.Authorization;
using SunriseBank.Authorization.Roles;
using SunriseBank.Authorization.Users;
using SunriseBank.Roles.Dto;
using Abp.Localization;
using Abp.Configuration.Startup;

namespace SunriseBank.Roles
{
    [AbpAuthorize(PermissionNames.Pages_Roles)]
    public class RoleAppService : AsyncCrudAppService<Role, RoleDto, int, PagedResultRequestDto, CreateRoleDto, RoleDto>, IRoleAppService
    {
        private readonly RoleManager _roleManager;
        private readonly UserManager _userManager;
        private readonly ILocalizationManager _localizationManager;
        private readonly IRepository<Role> _repository;

        public RoleAppService(IRepository<Role> repository, RoleManager roleManager, UserManager userManager, ILocalizationManager localizationManager)
            : base(repository)
        {
            _roleManager = roleManager;
            _userManager = userManager;
            _localizationManager = localizationManager;
            _repository = repository;
        }

        //[AbpAuthorize(AdminPermissionNames.template_service_read_per)]
        public async Task<PagedResultDto<RoleDto>> GetPagedAsync(int skipCount, int maxResultCount, string searchText, bool isAsc, string sortActiveColumn)
        {
            var items = _repository.GetAll().Where(x => !x.IsDeleted);

            if (!string.IsNullOrEmpty(searchText))
            {
                items = items.Where(x => x.Name.Trim().ToLower().Contains(searchText.Trim().ToLower())
                                         || x.DisplayName.Trim().ToLower().Contains(searchText.Trim().ToLower())
                                           || x.Description.Trim().ToLower().Contains(searchText.Trim().ToLower())
                );
            }
            if (!string.IsNullOrEmpty(sortActiveColumn))
            {
                switch (sortActiveColumn.ToLower())
                {
                    case "name":
                        items = isAsc ? items.OrderBy(x => x.Name) : items.OrderByDescending(x => x.Name);
                        break;

                    case "displayname":
                        items = isAsc ? items.OrderBy(x => x.DisplayName) : items.OrderByDescending(x => x.DisplayName);
                        break;

                    case "description":
                        items = isAsc ? items.OrderBy(x => x.Description) : items.OrderByDescending(x => x.Description);
                        break;

                    default:
                        break;
                }
            }

            var totalCount = await items.CountAsync(); ;
            var roles = await items
                            .Skip(skipCount)
                            .Take(maxResultCount)
                            .ToListAsync();

            var result = ObjectMapper.Map<List<RoleDto>>(roles);
            return new PagedResultDto<RoleDto>(totalCount, result);
        }

        public override async Task<RoleDto> Create(CreateRoleDto input)
        {
            CheckCreatePermission();

            var role = new Role
            {
                Name = input.Name,
                DisplayName = input.DisplayName,
                Description = input.Description
            };
            role.SetNormalizedName();

            CheckErrors(await _roleManager.CreateAsync(role));

            var grantedPermissions = PermissionManager
                .GetAllPermissions()
                .Where(p => input.Permissions.Contains(p.Name))
                .ToList();

            await _roleManager.SetGrantedPermissionsAsync(role, grantedPermissions);

            return MapToEntityDto(role);
        }

        public async Task<ListResultDto<RoleListDto>> GetRolesAsync(GetRolesInput input)
        {
            var roles = await _roleManager
                .Roles
                .WhereIf(
                    !input.Permission.IsNullOrWhiteSpace(),
                    r => r.Permissions.Any(rp => rp.Name == input.Permission && rp.IsGranted)
                )
                .ToListAsync();

            return new ListResultDto<RoleListDto>(ObjectMapper.Map<List<RoleListDto>>(roles));
        }

        public override async Task<RoleDto> Update(RoleDto input)
        {
            CheckUpdatePermission();

            var role = await _roleManager.GetRoleByIdAsync(input.Id);

            //ObjectMapper.Map(input, role);
            role.Name = input.Name;
            role.Description = input.Description;
            role.DisplayName = input.DisplayName;

            CheckErrors(await _roleManager.UpdateAsync(role));

            var grantedPermissions = PermissionManager
                .GetAllPermissions()
                .Where(p => input.Permissions.Contains(p.Name))
                .ToList();

            await _roleManager.SetGrantedPermissionsAsync(role, grantedPermissions);

            return MapToEntityDto(role);
        }

        public override async Task Delete(EntityDto<int> input)
        {
            CheckDeletePermission();

            var role = await _roleManager.FindByIdAsync(input.Id.ToString());
            var users = await _userManager.GetUsersInRoleAsync(role.NormalizedName);

            foreach (var user in users)
            {
                CheckErrors(await _userManager.RemoveFromRoleAsync(user, role.NormalizedName));
            }

            CheckErrors(await _roleManager.DeleteAsync(role));
        }

        public Task<ListResultDto<PermissionDto>> GetAllPermissions()
        {
            var permissions = PermissionManager.GetAllPermissions();

            var PermissionWithChild = permissions.Where(p => p.Parent == null)
                                    .Select((x, index) => new PermissionDto
                                    {
                                        Id = index + 1, 
                                        Name = x.Name.Replace('[', ' ').Replace(']', ' '),
                                        DisplayName = x.DisplayName == null ? "" : _localizationManager.GetString((Abp.Localization.LocalizableString)x.DisplayName).Replace('[', ' ').Replace(']', ' '),
                                        Description = x.Description == null ? "" : _localizationManager.GetString((Abp.Localization.LocalizableString)x.Description).Replace('[', ' ').Replace(']', ' '),
                                        ChildPermission = x.Children.Select((c1, i1) => new PermissionDto
                                        {
                                            Id = i1 + 1,
                                            Name = c1.Name.Replace('[', ' ').Replace(']', ' '),
                                            DisplayName = c1.DisplayName == null ? "" : _localizationManager.GetString((Abp.Localization.LocalizableString)c1.DisplayName).Replace('[', ' ').Replace(']', ' '),
                                            Description = c1.Description == null ? "" : _localizationManager.GetString((Abp.Localization.LocalizableString)c1.Description).Replace('[', ' ').Replace(']', ' '),
                                            ChildPermission = c1.Children.Select((c2, i2) => new PermissionDto
                                            {
                                                Id = i1 + 1,
                                                Name = c2.Name.Replace('[', ' ').Replace(']', ' '),
                                                DisplayName = c2.DisplayName == null ? "" : _localizationManager.GetString((Abp.Localization.LocalizableString)c2.DisplayName).Replace('[', ' ').Replace(']', ' '),
                                                Description = c2.Description == null ? "" : _localizationManager.GetString((Abp.Localization.LocalizableString)c2.Description).Replace('[', ' ').Replace(']', ' '),

                                            }).ToList()

                                        }).ToList()

                                    }).ToList();

            return Task.FromResult(new ListResultDto<PermissionDto>(
                ObjectMapper.Map<List<PermissionDto>>(permissions)
            ));
        }

        public async Task<ListResultDto<PermissionDto>> GetAllPermissionsHierarchy()
        {
            var permissions = PermissionManager.GetAllPermissions();

            var permissionWithChild = permissions.Where(p => p.Parent == null)
                                    .Select((x, index) => new PermissionDto
                                    {
                                        Id = index + 1,
                                        Name = x.Name.Replace('[', ' ').Replace(']', ' '),
                                        DisplayName = x.DisplayName == null ? "" : _localizationManager.GetString((Abp.Localization.LocalizableString)x.DisplayName).Replace('[', ' ').Replace(']', ' ').Trim(),
                                        Description = x.Description == null ? "" : _localizationManager.GetString((Abp.Localization.LocalizableString)x.Description).Replace('[', ' ').Replace(']', ' ').Trim(),
                                        ChildPermission = x.Children.Select((c1, i1) => new PermissionDto
                                        {
                                            Id = i1 + 1,
                                            Name = c1.Name.Replace('[', ' ').Replace(']', ' '),
                                            DisplayName = c1.DisplayName == null ? "" : _localizationManager.GetString((Abp.Localization.LocalizableString)c1.DisplayName).Replace('[', ' ').Replace(']', ' ').Trim(),
                                            Description = c1.Description == null ? "" : _localizationManager.GetString((Abp.Localization.LocalizableString)c1.Description).Replace('[', ' ').Replace(']', ' ').Trim(),
                                            ChildPermission = c1.Children.Select((c2, i2) => new PermissionDto
                                            {
                                                Id = i1 + 1,
                                                Name = c2.Name.Replace('[', ' ').Replace(']', ' '),
                                                DisplayName = c2.DisplayName == null ? "" : _localizationManager.GetString((Abp.Localization.LocalizableString)c2.DisplayName).Replace('[', ' ').Replace(']', ' ').Trim(),
                                                Description = c2.Description == null ? "" : _localizationManager.GetString((Abp.Localization.LocalizableString)c2.Description).Replace('[', ' ').Replace(']', ' ').Trim(),

                                            }).ToList()

                                        }).ToList()

                                    }).ToList();

            return new ListResultDto<PermissionDto>(permissionWithChild.ToList());
        }

        protected override IQueryable<Role> CreateFilteredQuery(PagedResultRequestDto input)
        {
            return Repository.GetAllIncluding(x => x.Permissions);
        }

        protected override async Task<Role> GetEntityByIdAsync(int id)
        {
            return await Repository.GetAllIncluding(x => x.Permissions).FirstOrDefaultAsync(x => x.Id == id);
        }

        protected override IQueryable<Role> ApplySorting(IQueryable<Role> query, PagedResultRequestDto input)
        {
            return query.OrderBy(r => r.DisplayName);
        }

        protected virtual void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }

        public async Task<GetRoleForEditOutput> GetRoleForEdit(EntityDto input)
        {
            var permissions = PermissionManager.GetAllPermissions();
            var role = await _roleManager.GetRoleByIdAsync(input.Id);
            var grantedPermissions = (await _roleManager.GetGrantedPermissionsAsync(role)).ToArray();
            var roleEditDto = ObjectMapper.Map<RoleEditDto>(role);

            return new GetRoleForEditOutput
            {
                Role = roleEditDto,
                Permissions = ObjectMapper.Map<List<FlatPermissionDto>>(permissions).OrderBy(p => p.DisplayName).ToList(),
                GrantedPermissionNames = grantedPermissions.Select(p => p.Name).ToList()
            };
        }

        public async Task<GetRoleForEditOutput> GetRoleForEditWithHierarchy(EntityDto input)
        {
            var permissions = PermissionManager.GetAllPermissions();
            var grantedPermissions = new List<Permission>();
            var role = new Role();
            if (input.Id > 0)
            {
                role = await _roleManager.GetRoleByIdAsync(input.Id);
                grantedPermissions = (await _roleManager.GetGrantedPermissionsAsync(role)).ToList();  
            }

            var permissionWithChild = permissions.Where(p => p.Parent == null)
                               .Select((x, index) => new PermissionDto
                               {
                                   Id = index + 1,
                                   Name = x.Name.Replace('[', ' ').Replace(']', ' '),
                                   DisplayName = x.DisplayName == null ? "" : _localizationManager.GetString((Abp.Localization.LocalizableString)x.DisplayName).Replace('[', ' ').Replace(']', ' ').Trim(),
                                   Description = x.Description == null ? "" : _localizationManager.GetString((Abp.Localization.LocalizableString)x.Description).Replace('[', ' ').Replace(']', ' ').Trim(),
                                   IsAssigned = grantedPermissions.Any(gp => gp.Name == x.Name),
                                   ChildPermission = x.Children.Select((c1, i1) => new PermissionDto
                                   {
                                       Id = i1 + 1,
                                       Name = c1.Name.Replace('[', ' ').Replace(']', ' '),
                                       DisplayName = c1.DisplayName == null ? "" : _localizationManager.GetString((Abp.Localization.LocalizableString)c1.DisplayName).Replace('[', ' ').Replace(']', ' ').Trim(),
                                       Description = c1.Description == null ? "" : _localizationManager.GetString((Abp.Localization.LocalizableString)c1.Description).Replace('[', ' ').Replace(']', ' ').Trim(),
                                       IsAssigned = grantedPermissions.Any(gp => gp.Name == c1.Name),
                                       ChildPermission = c1.Children.Select((c2, i2) => new PermissionDto
                                       {
                                           Id = i1 + 1,
                                           Name = c2.Name.Replace('[', ' ').Replace(']', ' '),
                                           DisplayName = c2.DisplayName == null ? "" : _localizationManager.GetString((Abp.Localization.LocalizableString)c2.DisplayName).Replace('[', ' ').Replace(']', ' ').Trim(),
                                           Description = c2.Description == null ? "" : _localizationManager.GetString((Abp.Localization.LocalizableString)c2.Description).Replace('[', ' ').Replace(']', ' ').Trim(),
                                           IsAssigned = grantedPermissions.Any(gp => gp.Name == c2.Name),
                                       }).ToList()

                                   }).ToList()

                               }).ToList();

            var roleEditDto = ObjectMapper.Map<RoleEditDto>(role);
             
            return new GetRoleForEditOutput
            {
                Role = roleEditDto,
                //Permissions = ObjectMapper.Map<List<FlatPermissionDto>>(permissions).OrderBy(p => p.DisplayName).ToList(),
                PermissionsHierarchy = permissionWithChild,
                GrantedPermissionNames = grantedPermissions.Select(p => p.Name).ToList()
            };
        }
    }
}

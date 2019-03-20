using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using Abp.Auditing;
using Abp.Authorization;
using Abp.Domain.Repositories;
using Abp.EntityHistory;
using Abp.UI;
using Microsoft.EntityFrameworkCore;
using SunriseBank.Application.Admin.Authorization;
using SunriseBank.Dto;
using SunriseBank.Entity;
using SunriseBank.Enum;

namespace SunriseBank.Templates
{
    [Audited]
    [AbpAuthorize(AdminPermissionNames.template_service_per)]
    public class TemplateAppService : AsyncCrudAppService<Template, TemplateDto, Guid, PagedResultRequestDto, CreateTemplateDto, UpdateTemplateDto>, ITemplateAppService
    {
        private readonly IRepository<Template, Guid> _repository; 

        public TemplateAppService(IRepository<Template, Guid> repository)
             : base(repository)
        {
            _repository = repository; 
        }

        [AbpAuthorize(AdminPermissionNames.template_service_read_per)]
        public async Task<PagedResultDto<TemplateDto>> GetPagedAsync(int skipCount, int maxResultCount, string searchText, bool isAsc, string sortActiveColumn)
        {
            var items = _repository.GetAll();
           
            if(!string.IsNullOrEmpty(searchText)) {
                items = items.Where(x=>x.KeyName.Trim().ToLower().Contains(searchText.Trim().ToLower())
                                         || x.DisplayName.Trim().ToLower().Contains(searchText.Trim().ToLower())
                                           || x.TemplateContent.Trim().ToLower().Contains(searchText.Trim().ToLower())
                );
            }
            if (!string.IsNullOrEmpty(sortActiveColumn))
            {
                switch (sortActiveColumn.ToLower())
                {
                    case "keyname":
                        items = isAsc ? items.OrderBy(x => x.KeyName) : items.OrderByDescending(x => x.KeyName);
                        break;

                    case "displayname":
                        items = isAsc ? items.OrderBy(x => x.DisplayName) : items.OrderByDescending(x => x.DisplayName);
                        break;

                    case "templatecontent":
                        items = isAsc ? items.OrderBy(x => x.TemplateContent) : items.OrderByDescending(x => x.TemplateContent);
                        break;

                    default:
                        break;
                }
            }

            var totalCount = await items.CountAsync();;
            var templates = await items
                            .Skip(skipCount)
                            .Take(maxResultCount)
                            .ToListAsync();

            var result = ObjectMapper.Map<List<TemplateDto>>(templates);
            return new PagedResultDto<TemplateDto>(totalCount, result);
        }

        [AbpAuthorize(AdminPermissionNames.template_service_write_per)]
        [UseCase(Description = "Template is Created.")]
        public override async Task<TemplateDto> Create(CreateTemplateDto input)
        { 
            var model = await _repository.GetAll().FirstOrDefaultAsync(x => x.KeyName.ToLower() == input.KeyName.ToLower());
            if(model != null)
            {
                throw new UserFriendlyException("Template already exist.");
            }
            var template = await base.Create(input); 
            CurrentUnitOfWork.SaveChanges();
            return template; 
        }

        [AbpAuthorize(AdminPermissionNames.template_service_modify_per)]
        public override async Task<TemplateDto> Update(UpdateTemplateDto input)
        {
            var template = await GetEntityByIdAsync(input.Id);
            if(template == null)
            {
                throw new UserFriendlyException("Could not find the template.");
            } 
            var tem = await base.Update(input);
            CurrentUnitOfWork.SaveChanges(); 
            return tem;
        }

        [AbpAuthorize(AdminPermissionNames.template_service_delete_per)]
        public override async Task Delete(EntityDto<Guid> input)
        {
            var template = await GetEntityByIdAsync(input.Id);
            if(template == null)
            {
                throw new UserFriendlyException("Could not find the template.");
            }
            await _repository.DeleteAsync(template);
        }

        [AbpAuthorize(AdminPermissionNames.template_service_read_per)]
        protected override async Task<Template> GetEntityByIdAsync(Guid id)
        {
            return await _repository.GetAll().FirstOrDefaultAsync(x => x.Id == id);
        }  
    }
}


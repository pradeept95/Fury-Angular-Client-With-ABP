using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Application.Services.Dto;
using SunriseBank.Dto;

namespace SunriseBank.Templates
{
    public interface ITemplateAppService : IAsyncCrudAppService<TemplateDto, Guid, PagedResultRequestDto, CreateTemplateDto, UpdateTemplateDto>
    {
        Task<PagedResultDto<TemplateDto>> GetPagedAsync(int skipCount, int maxResultCount, string searchText, bool isAsc, string sortActiveColumn); 
    }
}

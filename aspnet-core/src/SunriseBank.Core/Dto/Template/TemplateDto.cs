using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using SunriseBank.Entity;
using System;
using System.ComponentModel.DataAnnotations;

namespace SunriseBank.Dto
{ 
    [AutoMapFrom(typeof(Template))]
    public class TemplateDto : FullAuditedEntityDto<Guid>
    {
        [Required]
        public string KeyName { get; set; }
        [Required]
        public string DisplayName { get; set; }
        public string TemplateContent { get; set; }
        public bool IsActive { get; set; }
        public bool IsStatic { get; set; }
    }

    [AutoMapFrom(typeof(Template))]
    public class CreateTemplateDto : TemplateDto
    { 
        public CreateTemplateDto()
        {
            this.IsStatic = false;
            this.IsActive = true;
        }
    }

    [AutoMapFrom(typeof(Template))]
    public class UpdateTemplateDto : TemplateDto
    {
        public UpdateTemplateDto()
        {
            //this.IsStatic = false;
            //this.IsActive = true;
        }
    }
}

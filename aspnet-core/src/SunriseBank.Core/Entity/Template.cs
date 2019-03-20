using Abp.Auditing;
using Abp.Domain.Entities.Auditing;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SunriseBank.Entity
{
    [Table("m_template")]
    [Audited]
    public class Template : FullAuditedEntity<Guid>
    {
        [Required]
        public string KeyName { get; set; }
        [Required]
        public string DisplayName { get; set; }
        public string TemplateContent { get; set; }
        public bool IsActive { get; set; }
        [DisableAuditing]
        public bool IsStatic { get; set; }
    }

}

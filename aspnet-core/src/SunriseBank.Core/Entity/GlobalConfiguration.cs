using Abp.Domain.Entities.Auditing;
using SunriseBank.Enum;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace SunriseBank.Entity
{
    [Table("m_global_configuration")]
    public class GlobalConfiguration : FullAuditedEntity<Guid>
    {
        public string Key { get; set; }
        public string DisplayName { get; set; }
        public GlobalConfigurationFormType Type { get; set; }
        public string ConfigurationValue { get; set; }
        public int OrderNumber { get; set; } 
        public bool IsActive { get; set; }
        public bool IsStatic { get; set; }
    }

}

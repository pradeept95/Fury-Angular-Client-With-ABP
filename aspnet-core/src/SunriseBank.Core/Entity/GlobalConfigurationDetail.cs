using Abp.Domain.Entities.Auditing;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace SunriseBank.Entity
{
    [Table("m_global_configuration_detail")]
    public class GlobalConfigurationDetail : FullAuditedEntity<Guid>
    { 
        [ForeignKey("GlobalConfiguration")]
        public Guid GlobalConfigurationId { get; set; }
        public virtual GlobalConfiguration GlobalConfiguration { get; set; }

        public string Label { get; set; }
        public string Value { get; set; } 
    }

}

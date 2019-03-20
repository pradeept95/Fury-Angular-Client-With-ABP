using Abp.Domain.Entities.Auditing;
using SunriseBank.Authorization.Users;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace SunriseBank.Entity
{
    [Table("m_activity_log")]
    public class ActivityLog : FullAuditedEntity<Guid>
    {

        [ForeignKey("Users")]
        public long UserId { get; set; }
        public virtual User Users { get; set; }

        public string Action { get; set; }
        public string Remarks { get; set; }
        public DateTime Timestamp { get; set; }  
        public string RequestContent { get; set; }
        public string ResponseContent { get; set; }

    }

}

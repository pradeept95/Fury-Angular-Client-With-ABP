using Abp.Domain.Entities.Auditing;
using SunriseBank.Authorization.Users;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace SunriseBank.Entity
{
    [Table("m_application_user_documents")]
    public class ApplicationUserDocument : FullAuditedEntity<Guid>
    {
        [ForeignKey("Users")]
        public long UserId { get; set; }
        public virtual User Users { get; set; }

        public string Name { get; set; }
        public string Note { get; set; }
        public string DocumentPath { get; set; }
        public string IsActive { get; set; }
    }

}

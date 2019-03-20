using Abp.Domain.Entities.Auditing;
using SunriseBank.Authorization.Users;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace SunriseBank.Entity
{
    [Table("m_application_user_password_history")]
    public class ApplicationUserPasswordHistory : FullAuditedEntity<Guid>
    {
        [ForeignKey("Users")]
        public long UserId { get; set; }
        public virtual User Users { get; set; }

        public string HashPassword { get; set; }
        public DateTime ExpiryDate { get; set; }
        public bool IsActivePassword { get; set; }  
    }

}

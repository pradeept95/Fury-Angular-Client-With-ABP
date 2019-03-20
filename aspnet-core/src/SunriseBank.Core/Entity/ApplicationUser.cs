using Abp.Auditing;
using Abp.Domain.Entities.Auditing;
using SunriseBank.Authorization.Users;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SunriseBank.Entity
{
    [Table("m_application_user")]
    [Audited]
    public class ApplicationUser : FullAuditedEntity<Guid>
    {
        [ForeignKey("Users")]
        public long UserId { get; set; }
        public virtual User Users { get; set; }

        [Required]
        public string FirstName { get; set; }
        public string MiddleName { get; set; }

        [Required]
        public string LastName { get; set; }

        [Required]
        public string PrimaryMobileNumber { get; set; }
        public string SecondaryMobileNumber { get; set; }

        [Required]
        public string PrimaryEmailAddress { get; set; }
        public string SecondaryEmailAddress { get; set; }

        public string Address1 { get; set; }
        public string Address2 { get; set; }
         
        public bool IsActive { get; set; }
        public bool IsSuspended { get; set; }
        public bool IsVerified { get; set; }
        public bool IsPasswordCreated { get; set; } 
    }

}

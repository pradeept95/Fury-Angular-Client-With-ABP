using Abp.Authorization.Users;
using System.ComponentModel.DataAnnotations;

namespace SunriseBank.Users.Dto
{
    public class ChangePasswordDto
    { 
        public string OldPassword { get; set; }

        [Required]
        [StringLength(AbpUserBase.MaxPlainPasswordLength)] 
        public string NewPassword { get; set; }

        [Required]
        [StringLength(AbpUserBase.MaxPlainPasswordLength)] 
        public string ConfirmPassword { get; set; }
    }
}
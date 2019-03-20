using Abp.Authorization.Users;
using System.ComponentModel.DataAnnotations;

namespace SunriseBank.Authorization.Accounts.Dto
{
    public class ResetPasswordDto
    {
        [Required]
        public string UserKey { get; set; }

        [Required]
        public string Token { get; set; }

        [Required]
        [StringLength(AbpUserBase.MaxPlainPasswordLength)]
        public string NewPassword { get; set; }

        [Required]
        [StringLength(AbpUserBase.MaxPlainPasswordLength)]
        public string ConfirmPassword { get; set; }
    }
}

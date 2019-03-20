using System.ComponentModel.DataAnnotations;

namespace SunriseBank.Users.Dto
{
    public class ChangeUserLanguageDto
    {
        [Required]
        public string LanguageName { get; set; }
    }
}
namespace SunriseBank.Authorization.Accounts.Dto
{
    public class RegisterVerificationDto
    {
        public long UserId { get; set; }
        public string VerificationEmailToken { get; set; }
        public string VerificationPhoneTokne { get; set; }
        public string VerificationCode { get; set; }
    }

    public class RegisterVerificationResponseDto
    {
        public bool IsVerificationSuccess { get; set; }
        public string VerificationMessage { get; set; }
        public string Token { get; set; }
        public string userKey { get; set; }
    }
}

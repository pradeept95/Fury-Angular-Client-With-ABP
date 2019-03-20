namespace SunriseBank.Authorization.Accounts.Dto
{
    public class RegisterOutput
    {
        public bool CanLogin { get; set; }
        public bool IsSuccess { get; set; }
        public string RegisterMessage { get; set; }

        public long UserId { get; set; }
        public string VerificationEmailToken { get; set; }
        public string VerificationPhoneTokne { get; set; }
        public string VerificationCode { get; set; }

    }
}

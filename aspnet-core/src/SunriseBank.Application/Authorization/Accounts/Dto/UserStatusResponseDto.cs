namespace SunriseBank.Authorization.Accounts.Dto
{
    public class UserStatusResponseDto
    {
        public bool IsSuccess { get; set; }
        public string Message { get; set; }
        public int StepNumber { get; set; }
        public long UserId { get; set; }
        public string VerificationEmailToken { get; set; }
        public string VerificationPhoneToken { get; set; }
        public string UserKey { get; set; }
        public string Token { get; set; }
    }
}

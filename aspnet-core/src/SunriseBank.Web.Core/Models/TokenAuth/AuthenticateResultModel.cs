namespace SunriseBank.Models.TokenAuth
{
    public class AuthenticateResultModel
    {
        public string AccessToken { get; set; }

        public string EncryptedAccessToken { get; set; }

        public int ExpireInSeconds { get; set; }

        public long UserId { get; set; }

        public bool IsLoginSuccess { get; set; }
        public string Key { get; set; }
        public string LoginMessage { get; set; }

    }
}

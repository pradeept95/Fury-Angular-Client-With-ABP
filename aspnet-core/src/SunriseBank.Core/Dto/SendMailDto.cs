using System.Collections.Generic;

namespace SunriseBank.Dto
{
    public class SendMailDto
    {
        public string Subject { get; set; }
        public string Body { get; set; }
        public List<string> EmailAddresses { get; set; } = new List<string>(); 
        public string TemplateKey { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;
using Abp.UI;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using SunriseBank.Application.Common.EncryptionDecryptionService;
using SunriseBank.Dto;

namespace PSP.Application.Common.EmailServices
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _configuration;
        private readonly IHostingEnvironment _environment;
        private readonly IEncryptionDecryptionService _encryptionDecryptionService;

        public EmailService(IConfiguration configuration, IEncryptionDecryptionService encryptionDecryptionService, IHostingEnvironment environment)
        {
            _configuration = configuration;
            _environment = environment;
            _encryptionDecryptionService = encryptionDecryptionService;
        }

        private async Task SendEmail(SendMailDto mailInput)
        {
            try
            {
                var encryptedEmailAddress = _configuration["EmailConfig:EncryptedEmailAddress"];
                var encryptedPassword = _configuration["EmailConfig:EncryptedPassword"];
                var host = _configuration["EmailConfig:Host"];
                var port = _configuration["EmailConfig:Port"];
                var enableSSL = _configuration["EmailConfig:EnableSSL"];
                var defaultCCEmails = _configuration["EmailConfig:DefaultCCEmails"];
                var defaultEmails = _configuration["EmailConfig:DefaultEmails"];
                var defaultSubject = _configuration["EmailConfig:DefaultSubject"]; 

                using (var client = new SmtpClient())
                {
                    var credential = new NetworkCredential
                    {
                        UserName = await _encryptionDecryptionService.DecryptString(encryptedEmailAddress),
                        Password = await _encryptionDecryptionService.DecryptString(encryptedPassword)
                    };

                    client.Credentials = credential;
                    client.Host = host;
                    client.EnableSsl = Convert.ToBoolean(enableSSL);

                    //Try port 587 instead of 465. Port 465 is technically deprecated.
                    client.Port = Convert.ToInt32(port);

                    using (var emailMessage = new MailMessage())
                    {
                        foreach (var email in mailInput.EmailAddresses)
                        {
                            emailMessage.To.Add(email);
                        }
                       
                        emailMessage.From = new MailAddress(await _encryptionDecryptionService.DecryptString(encryptedEmailAddress));

                        if (_environment.IsDevelopment())
                        {
                            foreach (var ccEmail in defaultCCEmails.Split(','))
                            {
                                emailMessage.CC.Add(ccEmail);
                            } 
                        }

                        emailMessage.Subject = string.IsNullOrEmpty(mailInput.Subject)? defaultSubject : mailInput.Subject;
                        emailMessage.Body = mailInput.Body;  
                        emailMessage.IsBodyHtml = true;

                        // Include "Message-Id" header or your message will be treated as spam by Google.
                        emailMessage.Headers.Add("Message-Id", String.Concat("<", DateTime.Now.ToString("yyMMdd"), ".", DateTime.Now.ToString("HHmmss"), "@amniltech.com"));

                        client.Send(emailMessage);
                    }
                }
                await Task.CompletedTask;
            }
            catch (Exception ex)
            {
                throw new UserFriendlyException(ex.Message);
            }
        }
        
        public async Task ForgetPasswordMailHelper(SendMailDto mailInput)
        {
            await this.SendEmail(mailInput);
        }

        public async Task UserVerificationMailHelper(SendMailDto mailInput)
        {
            await this.SendEmail(mailInput);
        }

    }
}

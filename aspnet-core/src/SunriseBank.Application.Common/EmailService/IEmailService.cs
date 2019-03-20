using Microsoft.AspNetCore.Http;
using SunriseBank.Dto;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace PSP.Application.Common.EmailServices
{
    public interface IEmailService
    {
        Task ForgetPasswordMailHelper(SendMailDto mailInput);
        Task UserVerificationMailHelper(SendMailDto mailInput);
    }
}

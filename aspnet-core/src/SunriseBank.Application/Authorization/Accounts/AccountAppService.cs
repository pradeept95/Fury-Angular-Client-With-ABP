using System;
using System.Linq;
using System.Security.Policy;
using System.Threading.Tasks;
using Abp.Auditing;
using Abp.Configuration;
using Abp.Domain.Repositories;
using Abp.Domain.Uow;
using Abp.EntityHistory;
using Abp.UI;
using Abp.Zero.Configuration;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using PSP.Application.Common.EmailServices;
using SunriseBank.Application.Common.EncryptionDecryptionService;
using SunriseBank.Authorization.Accounts.Dto;
using SunriseBank.Authorization.Users;
using SunriseBank.Dto;
using SunriseBank.Entity;

namespace SunriseBank.Authorization.Accounts
{
    [Audited]
    public class AccountAppService : SunriseBankAppServiceBase, IAccountAppService
    {
        private readonly IEntityChangeSetReasonProvider _reasonProvider;

        private readonly UserRegistrationManager _userRegistrationManager;
        private readonly UserManager _userManager;

        private readonly IEncryptionDecryptionService _encryptionDecryptionService;
        private readonly IEmailService _emailService;

        private readonly IRepository<ApplicationUser, Guid> _applicationUserReposatory;
        private readonly IRepository<ApplicationUserPasswordHistory, Guid> _applicationUserPasswordHistoryReposatory;

        public AccountAppService(
             UserManager userManager,
             IEncryptionDecryptionService encryptionDecryptionService,
             IEmailService emailService,
             IRepository<ApplicationUser, Guid> applicationUserReposatory,
             IRepository<ApplicationUserPasswordHistory, Guid> applicationUserPasswordHistoryReposatory,
             UserRegistrationManager userRegistrationManager,
             IEntityChangeSetReasonProvider reasonProvider)
        {
            _userManager = userManager;
            _encryptionDecryptionService = encryptionDecryptionService;
            _userRegistrationManager = userRegistrationManager;
            _emailService = emailService;

            _applicationUserReposatory = applicationUserReposatory;
            _applicationUserPasswordHistoryReposatory = applicationUserPasswordHistoryReposatory;
            _reasonProvider = reasonProvider;
        }

        public async Task<IsTenantAvailableOutput> IsTenantAvailable(IsTenantAvailableInput input)
        {
            var tenant = await TenantManager.FindByTenancyNameAsync(input.TenancyName);
            if (tenant == null)
            {
                return new IsTenantAvailableOutput(TenantAvailabilityState.NotFound);
            }

            if (!tenant.IsActive)
            {
                return new IsTenantAvailableOutput(TenantAvailabilityState.InActive);
            }

            return new IsTenantAvailableOutput(TenantAvailabilityState.Available, tenant.Id);
        }

        [UseCase(Description = "User Registration : Registration begin with basic information")]
        [UnitOfWork]
        public virtual async Task<RegisterOutput> Register(RegisterInput input)
        {
            try
            {
                CheckErrors(await _userManager.CheckDuplicateUsernameOrEmailAddressAsync(1, input.PhoneNumber, input.EmailAddress));
                var user = await _userRegistrationManager.RegisterAsync(
                    input.FirstName + " " + input.LastName,
                    input.LastName,
                    input.EmailAddress,
                    input.PhoneNumber //phone number become a user name
                );

                //register user extra information
                var additionalUserInfo = new ApplicationUser
                {
                    UserId = user.Id,
                    FirstName = input.FirstName,
                    MiddleName = input.MiddleName,
                    LastName = input.LastName,
                    PrimaryEmailAddress = input.EmailAddress,
                    PrimaryMobileNumber = input.PhoneNumber,
                    IsVerified = false,
                    IsActive = false,
                    IsPasswordCreated = false,
                    IsSuspended = false,
                };
                var reason = "User Registration : Registration begin with basic information, Registered User Id is : "+ user.Id;
                using (_reasonProvider.Use(reason))
                { 
                    await _applicationUserReposatory.InsertAsync(additionalUserInfo); 
                }

                var isEmailConfirmationRequiredForLogin = await SettingManager.GetSettingValueAsync<bool>(AbpZeroSettingNames.UserManagement.IsEmailConfirmationRequiredForLogin);
                var verificationEmailToken = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                var verificationPhoneTokne = await _userManager.GenerateChangePhoneNumberTokenAsync(user, input.PhoneNumber);

                try
                {
                    var message = "Your verification code is " + verificationPhoneTokne + ". Thank you";
                    var emailList = new System.Collections.Generic.List<string>();
                    emailList.Add(additionalUserInfo.PrimaryEmailAddress);
                    var mailModel = new SendMailDto
                    {
                        Subject = "Sunrise Bank User Registration",
                        Body = message,
                        EmailAddresses = emailList
                    };
                    await _emailService.UserVerificationMailHelper(mailModel);
                }
                catch (Exception)
                {

                    throw new UserFriendlyException("Server response with an exception. Please try again.");
                }

                await CurrentUnitOfWork.SaveChangesAsync();
                return new RegisterOutput
                {
                    CanLogin = user.IsActive && (user.IsEmailConfirmed || !isEmailConfirmationRequiredForLogin),
                    IsSuccess = true,
                    UserId = user.Id,
                    RegisterMessage = "User Successfully registered",
                    VerificationCode = "",
                    VerificationEmailToken = verificationEmailToken,
                    VerificationPhoneTokne = verificationPhoneTokne,
                };
            }
            catch (Exception ex)
            {
                return new RegisterOutput
                {
                    CanLogin = false,
                    IsSuccess = false,
                    RegisterMessage = ex.Message
                };
            }
        }

        [UseCase(Description = "User Registration : User request for verification using OTP")]
        public async Task<RegisterVerificationResponseDto> VerifyUser(RegisterVerificationDto verificationInput)
        {
            var result = new RegisterVerificationResponseDto();
            try
            {
                var user = await _userManager.GetUserByIdAsync(verificationInput.UserId);
                if (user == null)
                {
                    // Don't reveal that the user does not exist 
                    result.IsVerificationSuccess = false;
                    result.VerificationMessage = "Invalid request";
                    return result;
                }

                var applicationUser = await _applicationUserReposatory.GetAll().FirstOrDefaultAsync(x => x.UserId == user.Id);
                if (applicationUser == null)
                {
                    // Don't reveal that the user does not exist 
                    result.IsVerificationSuccess = false;
                    result.VerificationMessage = "Invalid request";
                    return result;
                }

                if (!await _userManager.IsEmailConfirmedAsync(user))
                {
                    CheckErrors(await _userManager.ConfirmEmailAsync(user, verificationInput.VerificationEmailToken.Replace(' ', '+')));
                }

                if (!await _userManager.IsPhoneNumberConfirmedAsync(user))
                {
                    CheckErrors(await _userManager.ChangePhoneNumberAsync(user, user.UserName, verificationInput.VerificationCode.Replace(' ', '+')));
                }

                //set verified flag in sunrise user also 

                //here is the success

                var code = await _userManager.GeneratePasswordResetTokenAsync(user);
                var encodedUserId = await _encryptionDecryptionService.EncryptString(user.Id.ToString());


                //update application user state as verified state
                applicationUser.IsVerified = true;
                await _applicationUserReposatory.UpdateAsync(applicationUser);
                CurrentUnitOfWork.SaveChanges();

                result.userKey = encodedUserId;
                result.Token = code;
                result.IsVerificationSuccess = true;
                result.VerificationMessage = "User successfully verified";
                return result;
            }
            catch (Exception ex)
            {

                result.VerificationMessage = ex.Message;
                result.IsVerificationSuccess = false;
                return result;
            }
        }

        [UseCase(Description = "User Registration : User reset their password")]
        public async Task<RegisterOutput> VerificationUserResetPasswprd(ResetPasswordDto input)
        {
            var result = new RegisterOutput();
            try
            {
                if (!input.NewPassword.Equals(input.ConfirmPassword))
                {
                    result.CanLogin = false;
                    result.RegisterMessage = "New password and confirm password not match.";
                    return result;
                }

                long userId = 0;
                try
                {
                    userId = Convert.ToInt32(await _encryptionDecryptionService.DecryptString(input.UserKey));
                }
                catch (Exception ex)
                {
                    result.CanLogin = false;
                    result.RegisterMessage = "Invalid request.";
                    return result;

                }

                var user = await _userManager.GetUserByIdAsync(userId);

                if (user == null)
                {
                    // Don't reveal that the user does not exist 
                    result.CanLogin = false;
                    result.RegisterMessage = "Invalid request.";
                    return result;
                }

                var applicationUser = await _applicationUserReposatory.GetAll().FirstOrDefaultAsync(x => x.UserId == user.Id);
                if (applicationUser == null)
                {
                    // Don't reveal that the user does not exist 
                    result.CanLogin = false;
                    result.RegisterMessage = "Invalid request.";
                    return result;
                }

                //add logic to check password history table and manage user password history

                CheckErrors(await _userManager.ResetPasswordAsync(user, input.Token.Replace(' ', '+'), input.NewPassword));


                //update application and user state
                applicationUser.IsActive = true;
                applicationUser.IsPasswordCreated = true;
                await _applicationUserReposatory.UpdateAsync(applicationUser);

                //add user role that can access the general user content
                //TDDO

                await CurrentUnitOfWork.SaveChangesAsync();
                var isEmailConfirmationRequiredForLogin = await SettingManager.GetSettingValueAsync<bool>(AbpZeroSettingNames.UserManagement.IsEmailConfirmationRequiredForLogin);

                result.CanLogin = user.IsActive && (user.IsEmailConfirmed || !isEmailConfirmationRequiredForLogin);
                result.RegisterMessage = "Your password successfully changed. Now you can login with your new credentials.";
                return result;
            }
            catch (Exception ex)
            {
                result.CanLogin = false;
                result.RegisterMessage = ex.Message;
                return result;
            }
        }

        public async Task<UserStatusResponseDto> CheckUserStatus(string userKey)
        {
            var result = new UserStatusResponseDto();
            try
            {
                long userId = 0;
                try
                {
                    userId = Convert.ToInt32(await _encryptionDecryptionService.DecryptString(userKey.Replace(" ", "+")));
                }
                catch (Exception ex)
                {
                    result.IsSuccess = false;
                    result.Message = "Your request is not valid";
                    return result;
                    // throw new UserFriendlyException("Your link is broken, please try again with another link");
                }
                var user = await _userManager.GetUserByIdAsync(userId);
                if (user == null)
                {
                    // Don't reveal that the user does not exist 
                    result.IsSuccess = false;
                    result.Message = "Your request is not valid";
                    return result;
                }

                var applicationUser = await _applicationUserReposatory.GetAll().FirstOrDefaultAsync(x => x.UserId == user.Id);
                if (applicationUser == null)
                {
                    // Don't reveal that the user does not exist 
                    result.IsSuccess = false;
                    result.Message = "Your request is not valid";
                    return result;
                }

                var stepNumber = applicationUser.IsVerified && !applicationUser.IsPasswordCreated ? 3 : 2;

                result.UserId = user.Id;
                result.StepNumber = stepNumber;
                if (stepNumber == 2)
                {
                    result.VerificationEmailToken = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                    result.VerificationPhoneToken = await _userManager.GenerateChangePhoneNumberTokenAsync(user, user.UserName);
                }
                else if (stepNumber == 3)
                {
                    result.UserKey = await _userManager.GeneratePasswordResetTokenAsync(user);
                    result.Token = await _encryptionDecryptionService.EncryptString(user.Id.ToString()); 
                }
                result.IsSuccess = true;
                return result;
            }
            catch (Exception ex)
            {
                // Don't reveal that the user does not exist 
                result.IsSuccess = false;
                result.Message = "Your request is not valid";
                return result;
            }

        }

        [UseCase(Description = "Forget password: User request to change password")]
        public async Task<string> ForgetPassword(string emailAddress, string passwordResetCallbackUrl)
        {

            var user = await _userManager.FindByEmailAsync(emailAddress);

            if (user == null)
            {
                // Don't reveal that the user does not exist 
                return "Recover link is send to your email";
            }

            var code = await _userManager.GeneratePasswordResetTokenAsync(user);
            var encodedUserId = await _encryptionDecryptionService.EncryptString(user.Id.ToString());

            var callbackUrl = System.Web.HttpUtility.UrlDecode(System.Web.HttpUtility.UrlEncode(passwordResetCallbackUrl.TrimEnd('/') + "?userKey=" + encodedUserId + "&token=" + code));

            var message = "Please reset your password by clicking here: <a href=\"" + callbackUrl + "\">link</a>";
            var emailList = new System.Collections.Generic.List<string>();
            emailList.Add(emailAddress);
            var mailModel = new SendMailDto
            {
                Subject = "Sunrise Bank forget password",
                Body = message,
                EmailAddresses = emailList
            };
            try
            {
                await _emailService.ForgetPasswordMailHelper(mailModel);
            }
            catch (Exception)
            {
                return "Server response with an error, please try again later.";
            }
            // If we got this far, something failed, redisplay form 
            return "Password recovery email successfully send at " + emailAddress + ". Check your email for the confirmation link.";
        }

        [UseCase(Description = "Forget Password : User reset their password")]
        public async Task<string> ResetPasswprd(ResetPasswordDto input)
        {
            long userId = 0;
            try
            {
                userId = Convert.ToInt32(await _encryptionDecryptionService.DecryptString(input.UserKey));
            }
            catch (Exception ex)
            {
                throw new UserFriendlyException("Your link is broken, please try again with another link");
            }
            var user = await _userManager.GetUserByIdAsync(userId);
            if (user == null)
            {
                // Don't reveal that the user does not exist 
                return "Your link is broken, please try again with another link";
            }

            if (!input.NewPassword.Equals(input.ConfirmPassword))
            {
                throw new UserFriendlyException("New password and confirm password not match.");
            }
            //add logic to check password history table and manage user password history

            CheckErrors(await _userManager.ResetPasswordAsync(user, input.Token.Replace(' ', '+'), input.NewPassword));
            CurrentUnitOfWork.SaveChanges();
            return "Your password successfully changed. Now you can login with your new credentials.";
        }

        public async Task<string> Encrypt(string value)
        {
            return await _encryptionDecryptionService.EncryptString(value);
        }
    }
}


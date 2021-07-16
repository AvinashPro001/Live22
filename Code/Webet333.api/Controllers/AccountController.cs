using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Webet333.api.Controllers.Base;
using Webet333.api.Filters;
using Webet333.api.Helpers;
using Webet333.dapper;
using Webet333.files.interfaces;
using Webet333.models.Configs;
using Webet333.models.Constants;
using Webet333.models.Request;
using Webet333.models.Request.Account;
using Webet333.models.Request.Game;
using Webet333.models.Request.Payments;
using Webet333.models.Response.Account;
using Webet333.models.Response.SMS;
using Webet333.notify.interfaces.Email;

namespace Webet333.api.Controllers
{
    [Route(ActionsConst.ApiVersion)]
    public class AccountController : BaseController
    {
        #region Global Variable

        private IHostingEnvironment _hostingEnvironment;

        private IHubContext<SignalRHub> _hubContext;

        public AccountController(IStringLocalizer<BaseController> Localizer, IOptions<ConnectionConfigs> ConnectionStringsOptions, IHostingEnvironment environment, IHubContext<SignalRHub> hubContext, IOptions<BaseUrlConfigs> BaseUrlConfigsOption) : base(ConnectionStringsOptions.Value, Localizer, BaseUrlConfigsOption.Value)
        {
            this.Localizer = Localizer;
            _hostingEnvironment = environment;
            _hubContext = hubContext;
        }

        #endregion Global Variable

        #region User Login

        [HttpPost(ActionsConst.Account.Login)]
        public async Task<IActionResult> Login([FromBody] LoginRequest request, [FromServices] IOptions<AuthConfig> AuthConfigOptions)
        {
            if (request.GrantType == models.Enums.GrantTypeEnums.error) throw new ApiException("error_invalid_grant_type", 400);
            if (request == null) return BadResponse("error_empty_request");
            if (!ModelState.IsValid) return BadResponse(ModelState);
            if (request.Password.Length < 6) return BadResponse("error_password_length");

            using (var account_help = new AccountHelpers(Connection))
            {
                var uniqueId = Guid.NewGuid();
                var user = await account_help.FindUser(request.UserName, request.Password, uniqueId: uniqueId.ToString(), grantType: request.GrantType.ToString());

                if (user == null) throw new ApiException("error_invalid_login");

                await ValidateUser(user, request.GrantType.ToString());
                var user_token = new TokenHelpers(Connection).GetAccessToken(AuthConfigOptions.Value, user, uniqueId.ToString());

                #region User Permission

                if (!string.IsNullOrEmpty(user.Permissions))
                    user.PermissionsList = new GenericHelpers(Connection).BindPermissionList(user.Permissions, user.DefaultPermission).Where(x => x.IsChecked).ToList();

                #endregion User Permission

                if (request.GrantType == models.Enums.GrantTypeEnums.admin)
                    return OkResponse(new { access_token = user_token, user.PermissionsList });

                user.VIPBanner = (user.VIPBanner != null ? baseUrlConfigs.ImageBase + baseUrlConfigs.VIPIcon + "/" + user.VIPLevel + user.VIPBanner : null);

                return OkResponse(new { access_token = user_token, totalBankAccount = user.BankAccount, user });
            }
        }

        #endregion User Login

        #region Email Confirme

        [HttpPost(ActionsConst.Account.EmailConfirm)]
        public async Task<IActionResult> EmailConfirm([FromBody] TokenRequest request)
        {
            using (var account_help = new AccountHelpers(Connection))
            {
                await account_help.ConfirmEmail(request.Token);
                return OkResponse();
            }
        }

        #endregion Email Confirme

        #region Reset Password Get Token Data

        [HttpPost(ActionsConst.Account.ResetPasswordGetTokenData)]
        public async Task<IActionResult> ResetPasswordGetTokenData([FromBody] TokenRequest request)
        {
            if (!ModelState.IsValid) return BadResponse(ModelState);

            using (var account_help = new AccountHelpers(Connection))
            {
                var userId = await account_help.GetDataFromPasswordToken(request.Token);

                UserEntity = await account_help.FindUser(userId: userId);

                return OkResponse(UserEntity);
            }
        }

        #endregion Reset Password Get Token Data

        #region Reset Password Get Token Data

        [HttpPost(ActionsConst.Account.ResetPassword)]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordRequest request, [FromServices] IMessages messages)
        {
            if (!ModelState.IsValid) return BadResponse(ModelState);

            using (var account_help = new AccountHelpers(Connection))
            {
                var userId = await account_help.UpdatePasswordToken(request.Token, request.Password);

                #region Sending email in queue

                var user = await account_help.FindUser(userId: userId);
                new EmailHelpers(Localizer, messages).SendAccountEmail(user, null, EmailTypeConst.ChangePassword);

                #endregion Sending email in queue
            }
            return OkResponse();
        }

        #endregion Reset Password Get Token Data

        #region Admin Invite

        [HttpPost(ActionsConst.Account.AdminInvite)]
        public async Task<IActionResult> AdminInvite([FromBody] ResetPasswordRequest request, [FromServices] IMessages messages)
        {
            if (!ModelState.IsValid) return BadResponse(ModelState);

            using (var account_help = new AccountHelpers(Connection))
            {
                var userId = await account_help.AdminInviteUpdate(request.Token, request.Password);

                #region Sending email in queue

                var user = account_help.FindUser(userId: userId);
                new EmailHelpers(Localizer, messages).SendAccountEmail(user.Result, null, EmailTypeConst.ChangePassword);

                #endregion Sending email in queue
            }
            return OkResponse();
        }

        #endregion Admin Invite

        #region Logout

        [Authorize]
        [HttpGet(ActionsConst.Account.Logout)]
        public async Task<IActionResult> Logout()
        {
            using (var account_help = new AccountHelpers(Connection))
            {
                await account_help.Logout(GetUniqueId(User));
            }
            return OkResponse();
        }

        #endregion Logout

        #region Profile

        [Authorize]
        [HttpPost(ActionsConst.Account.Profile)]
        public async Task<IActionResult> Profile([FromBody] GetProfileRequest request, [FromServices] IOptions<BaseUrlConfigs> BaseUrlConfigsOption)
        {
            await ValidateUser();
            if (request.Id == null && request.Username == null) return OkResponse(UserEntity);
            else if (UserEntity.Role == RoleConst.Admin)
            {
                using (var account_help = new AccountHelpers(Connection))
                {
                    var users = await account_help.FindUser(userId: request.Id, userName: request.Username);
                    users.VIPBanner = (!string.IsNullOrEmpty(users.VIPBanner)) ? $"{BaseUrlConfigsOption.Value.ImageBase}{BaseUrlConfigsOption.Value.VIPIcon}/{users.VIPLevel}{users.VIPBanner}" : "";
                    if (users != null)
                        return OkResponse(users);
                }
            }
            return NotFoundResponse();
        }

        #endregion Profile

        #region Change Password

        [Authorize]
        [HttpPost(ActionsConst.Account.ChangePassword)]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordRequest request, [FromServices] IMessages messages)
        {
            await ValidateUser();
            if (!ModelState.IsValid) return BadResponse(ModelState);

            using (var account_help = new AccountHelpers(Connection))
            {
                var user = await account_help.FindUser(userId: UserEntity.Id.ToString(), password: request.CurrentPassword);

                if (user == null)
                    throw new ApiException("error_invalid_password", 401);

                if (UserEntity.Role == RoleConst.Users)
                    await account_help.UserGamePasswordChange(user.Id.ToString(), request.Password, _hostingEnvironment);

                await account_help.ChangePassword(user.Id.ToString(), request.Password);
            }
            return OkResponse();
        }

        #endregion Change Password

        #region Register Users

        [HttpPost(ActionsConst.Account.Register)]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request, [FromServices] IOptions<AuthConfig> AuthConfigOptions)
        {
            if (!ModelState.IsValid) return BadResponse(ModelState);
            using (var account_help = new AccountHelpers(Connection))
            {
                var uniqueId = Guid.NewGuid().ToString();

                var user = await account_help.AddUser(Connection, request, RoleConst.Users, uniqueId);

                #region Sending SMS in queue

                if (user == null) return OkResponse();

                await account_help.SendOtp(user.Id.ToString(), user.MobileNo);

                var registerMessage = Localizer["msg_register_msg"].Value;

                var messageResponse = await account_help.SendSMSAPI(request.Mobile, String.Format(registerMessage, request.Username));
                var count = messageResponse.Count(f => f == ',');

                var user_token = new TokenHelpers(Connection).GetAccessToken(AuthConfigOptions.Value, user, uniqueId);

                user.VIPBanner = (user.VIPBanner != null ? baseUrlConfigs.ImageBase + baseUrlConfigs.VIPIcon + "/" + user.VIPLevel + user.VIPBanner : null);

                return OkResponse(new
                {
                    access_token = user_token,
                    user,
                    totalBankAccount = user.BankAccount,
                    messageResponse = new SMSResponse
                    {
                        smsMessage = Localizer["e_" + messageResponse].Value,
                        statusCode = messageResponse
                    }
                });

                #endregion Sending SMS in queue
            }
        }

        #endregion Register Users

        #region Dashboard

        [Authorize]
        [HttpGet(ActionsConst.Account.Dashboard)]
        public async Task<IActionResult> Dashboard()
        {
            var role = GetUserRole(User);
            if (role != RoleConst.Admin) BadResponse("forbid_error_access");
            using (var account_help = new AccountHelpers(Connection))
            {
                var user = await account_help.DashboardStats();
                return OkResponse(user);
            }
        }

        #endregion Dashboard

        #region Get user and Update Password

        [HttpPost(ActionsConst.Account.ProfileGetBYMobileNumber)]
        public async Task<IActionResult> GetUserByMobile([FromBody] EmailRequest request)
        {
            ProfileResponseByMobile updateUser;
            using (var account_help = new AccountHelpers(Connection))
            {
                request.NewPassword = Pussy888GameHelpers.genrate6DigitPassword();
                updateUser = await account_help.updatePasswordByMobielNumber(request);
                await account_help.UserGamePasswordChange(updateUser.Id.ToString(), request.NewPassword, _hostingEnvironment);
                var messageResponse = await account_help.SendSMSAPI(updateUser.MobileNo, $"Your Username is :" + updateUser.UserName + ".  Your New Password is: " + SecurityHelpers.DecryptPassword(updateUser.Password) + ",  It's Your Temporary Password. It will Expire After Some Time, So Please Change Your Password After Successfully Login.");
                var count = messageResponse.Count(f => f == ',');
                return OkResponse(new
                {
                    messageResponse = new SMSResponse
                    {
                        smsMessage = Localizer["e_" + messageResponse].Value,
                        statusCode = messageResponse
                    }
                });
            }
        }

        #endregion Get user and Update Password

        #region Wallet Maintenacnce Update

        [Authorize]
        [HttpPost(ActionsConst.Account.WalletMaintenanceUpdate)]
        public async Task<IActionResult> WalletMaintenanceUpdate([FromBody] WalletMaintenanceUpdateRequest request)
        {
            await CheckUserRole();

            string adminId = GetUserId(User).ToString();

            using (var account_help = new AccountHelpers(Connection))
            {
                var WalletUpdate = await account_help.WalletMainteanceUpdate(request, adminId);
                if (WalletUpdate != null)
                {
                    await _hubContext.Clients.All.SendAsync("WalletUpdate", new { data = WalletUpdate });
                    return OkResponse(WalletUpdate);
                }
                else
                {
                    return BadResponse();
                }
            }
        }

        #endregion Wallet Maintenacnce Update

        #region Wallet List

        [HttpGet(ActionsConst.Account.WalletList)]
        public async Task<IActionResult> WalletList()
        {
            using (var account_help = new AccountHelpers(Connection))
            {
                var walletList = await account_help.WalletList();
                if (walletList != null)
                    return OkResponse(walletList);
                else
                    return BadResponse();
            }
        }

        #endregion Wallet List

        #region Social Media Reference

        [HttpPost(ActionsConst.Account.SocialMediaReference)]
        public async Task<IActionResult> SocialMediaStaticsInsert([FromBody] SocailMediaStaticsRequest request)
        {
            using (AccountHelpers account_helpers = new AccountHelpers(Connection))
            {
                await account_helpers.SocialMediaStatics(request.keyword);
            }
            return OkResponse();
        }

        #endregion Social Media Reference

        #region Reference Keyword Select

        [Authorize]
        [HttpGet(ActionsConst.Account.RefKeywordSelect)]
        public async Task<IActionResult> ReferencekeywordList()
        {
            await CheckUserRole();

            using (var account_help = new AccountHelpers(Connection))
            {
                var refKeyword = await account_help.ReferenceKeywordList();
                return OkResponse(refKeyword);
            }
        }

        #endregion Reference Keyword Select

        #region Reference Keyword Insert

        [Authorize]
        [HttpPost(ActionsConst.Account.RefKeywordInsert)]
        public async Task<IActionResult> ReferencekeywordInsert([FromBody] SocailMediaStaticsRequest request)
        {
            await CheckUserRole();
            if (String.IsNullOrEmpty(request.keyword))
                return BadResponse(Localizer["error_empty_keyword"].Value);

            var adminId = GetUserId(User).ToString();

            using (var account_help = new AccountHelpers(Connection))
            {
                var refKeyword = await account_help.ReferenceKeywordInsert(request.keyword, adminId);
                return OkResponse(refKeyword);
            }
        }

        #endregion Reference Keyword Insert

        #region Reference Keyword Delete

        [Authorize]
        [HttpPost(ActionsConst.Account.RefKeywordDelete)]
        public async Task<IActionResult> ReferencekeywordDelete([FromBody] GetByIdRequestWithRequired request)
        {
            await CheckUserRole();
            if (!ModelState.IsValid) return BadResponse(ModelState);

            var adminId = GetUserId(User).ToString();

            using (var account_help = new AccountHelpers(Connection))
            {
                var refKeyword = await account_help.ReferenceKeywordDelete(request.Id.ToString(), adminId);
                return OkResponse(refKeyword);
            }
        }

        #endregion Reference Keyword Delete

        #region Analytics

        [Authorize]
        [HttpPost(ActionsConst.Account.Analytics)]
        public async Task<IActionResult> Analytics([FromBody] AnalyticsRequest request)
        {
            CheckUserRole();
            using (var account_help = new AccountHelpers(Connection))
            {
                var user = await account_help.Analytics(request);
                return OkResponse(user);
            }
        }

        #endregion Analytics

        #region Get List of Language

        [Authorize]
        [HttpGet(ActionsConst.Account.GetLanguage)]
        public async Task<IActionResult> GetLanguageList()
        {
            await CheckUserRole();

            using (var account_help = new AccountHelpers(Connection))
            {
                return OkResponse(await account_help.GetLanguage());
            }
        }

        #endregion Get List of Language

        #region Login Reigster Tracking Insert

        [HttpPost(ActionsConst.Account.TrackingInsert)]
        public IActionResult TrackingInsert([FromBody] TrackingInsertRequest request)
        {
            if (!ModelState.IsValid) return BadResponse(ModelState);

            using (var accounthelper = new AccountHelpers(Connection))
            {
                accounthelper.TrackingInsert(request);
                // accounthelper.TrackingLoginRegisterUpdate();
            }
            return OkResponse();
        }

        #endregion Login Reigster Tracking Insert

        #region Login Reigster Tracking Select

        [Authorize]
        [HttpPost(ActionsConst.Account.TrackingSelect)]
        public async Task<IActionResult> TrackingSelect([FromBody] TrackingSelectRequest request)
        {
            await CheckUserRole();

            request.UniqueId = GetUniqueId(User);
            request.Role = GetUserRole(User);

            using (var accounthelper = new AccountHelpers(Connection))
            {
                return OkResponse(await accounthelper.TrackingSelect(request));
            }
        }

        #endregion Login Reigster Tracking Select

        #region Betting Details Last Update Select

        [Authorize]
        [HttpPost(ActionsConst.Account.BetDetailsLastUpdateSelect)]
        public async Task<IActionResult> BettingDetailsLastUpdateSelect([FromBody] RebateListRequest request)
        {
            await CheckUserRole();

            using (var accounthelper = new AccountHelpers(Connection))
            {
                return OkResponse(await accounthelper.BettingDetailsLastUpdateSelect(request));
            }
        }

        #endregion Betting Details Last Update Select

        #region Manager Operation Insert

        [Authorize]
        [HttpPost(ActionsConst.Account.ManagerOperationInsert)]
        public async Task<IActionResult> ManagerOperationInsert([FromBody] ManagerOperationInsertRequest request, [FromServices] IUploadManager uploadManager, [FromServices] IOptions<BaseUrlConfigs> BaseUrlConfigsOptions)
        {
            await CheckUserRole();
            if (!ModelState.IsValid) return BadResponse(ModelState);

            var extension = "." + request.IdentityProof.Split("base64,")[0].Split("/")[1].Replace(";", "");
            request.IdentityProof = request.IdentityProof.Split("base64,")[1];

            var Id = Guid.NewGuid().ToString();
            using (var generic_help = new GenericHelpers(Connection))
            {
                generic_help.GetImageWithExtension(uploadManager, request.IdentityProof, BaseUrlConfigsOptions.Value.ManagerProof, Id, extension);
            }

            request.IdentityProof = extension;
            using (var account_help = new AccountHelpers(Connection))
            {
                await account_help.ManagerInsert(request, Id);
                await _hubContext.Clients.All.SendAsync("ManagerApprovalList");
                return OkResponse();
            }
        }

        #endregion Manager Operation Insert

        #region Manager Operation Select

        [Authorize]
        [HttpPost(ActionsConst.Account.ManagerOperationSelect)]
        public async Task<IActionResult> ManagerOperationSelect([FromBody] GlobalGetRequest request, [FromServices] IOptions<BaseUrlConfigs> BaseUrlConfigsOptions)
        {
            await CheckUserRole();

            using (var account_help = new AccountHelpers(Connection))
            {
                var result = await account_help.ManagerSelect(request, BaseUrlConfigsOptions.Value);
                return OkResponse(result);
            }
        }

        #endregion Manager Operation Select

        #region Manager Operation update

        [Authorize]
        [HttpPost(ActionsConst.Account.ManagerOperationUpdate)]
        public async Task<IActionResult> ManagerOperationUpdate([FromBody] ManagerOperationUpdateRequest request)
        {
            await CheckUserRole();

            using (var account_help = new AccountHelpers(Connection))
            {
                await account_help.ManagerUpdate(request);
                return OkResponse();
            }
        }

        #endregion Manager Operation update

        #region SMS Users Select

        [Authorize]
        [HttpPost(ActionsConst.Account.SmsList)]
        public async Task<IActionResult> SmsUserSelect([FromBody] SmsListRequest request)
        {
            await CheckUserRole();

            using (var account_help = new AccountHelpers(Connection))
            {
                var result = await account_help.SmsUserList(request);
                return OkResponse(new { result, toalUser = result.Count });
            }
        }

        #endregion SMS Users Select

        #region SMS SEND

        [HttpPost(ActionsConst.Account.SendSMS)]
        public async Task<IActionResult> SendSMS([FromBody] SmsSend request)
        {
            if (request == null) return BadResponse("error_empty_request");
            if (!ModelState.IsValid) return BadResponse(ModelState);

            #region Admin Log

            string adminId = GetUserId(User).ToString();

            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                await repository.AddOrUpdateAsync(
                    StoredProcConsts.Global.AdminLog,
                    new
                    {
                        adminId,
                        Action = "Add",
                        Module = "SMS Announcement",
                        Description = $"Send {request.Message} as SMS to users"
                    });
            }

            #endregion Admin Log

            using (var account_helper = new AccountHelpers(Connection))
            {
                var messageResponse = await account_helper.SendSMSAPI(request.MobileNo, request.Message);

                if (request.Username != null)
                    return OkResponse(new
                    {
                        request.Username,
                        messageResponse = new SMSResponse
                        {
                            smsMessage = Localizer["e_" + messageResponse].Value,
                            statusCode = messageResponse
                        }
                    });

                return OkResponse(new
                {
                    messageResponse = new SMSResponse
                    {
                        smsMessage = Localizer["e_" + messageResponse].Value,
                        statusCode = messageResponse
                    }
                });
            }
        }

        #endregion SMS SEND

        #region Last Login Update

        [Authorize]
        [HttpPost(ActionsConst.Account.LastLoginTimeUpdate)]
        public IActionResult LastLoginTimeUpdate([FromBody] GetByIdRequest request)
        {
            var userId = GetUserId(User).ToString();
            using (var account_help = new AccountHelpers(Connection))
            {
                account_help.UserLastLoginTime(userId, Language.Code, GetUserRole(User), GetUniqueId(User));
            }
            return OkResponse();
        }

        #endregion Last Login Update

        #region Notification Select

        [Authorize]
        [HttpPost(ActionsConst.Account.NotificationSelect)]
        public async Task<IActionResult> AdminNotificationGlobalPrameterSelect([FromBody] GlobalParameterUpdateRequest request)
        {
            await CheckUserRole();

            using (var account_help = new AccountHelpers(Connection))
            {
                var response = await account_help.GlobalSelect(request.Name);
                return OkResponse(response);
            }
        }

        #endregion Notification Select

        #region Notification Update

        [Authorize]
        [HttpPost(ActionsConst.Account.NotificationUpdate)]
        public async Task<IActionResult> AdminNotificationGlobalPrameterUpdate([FromBody] GlobalParameterUpdateRequest request)
        {
            await CheckUserRole();

            using (var account_help = new AccountHelpers(Connection))
            {
                await account_help.GlobalParameterUpdate(request.Value, request.Name);
                return OkResponse();
            }
        }

        #endregion Notification Update

        #region Game Username

        [Authorize]
        [HttpPost(ActionsConst.Account.GameUsername)]
        public async Task<IActionResult> GetAdminUsername([FromBody] GetByIdRequestWithRequired request)
        {
            await CheckUserRole();

            using (var account_help = new AccountHelpers(Connection))
            {
                var response = await account_help.GetgameUsername(request.Id);
                return OkResponse(response);
            }
        }

        #endregion Game Username

        #region Send OTP

        [Authorize]
        [HttpPost(ActionsConst.Account.SendOtp)]
        public async Task<IActionResult> SendOtp([FromBody] GetByIdRequest request)
        {
            await ValidateUser();

            using (var account_help = new AccountHelpers(Connection))
            {
                if (string.IsNullOrWhiteSpace(request.Id))  // Called by user
                {
                    var response = await account_help.SendOtp(UserEntity.Id.ToString(), UserEntity.MobileNo);
                    if (response.ErrorCode != 0) return BadResponse();
                }
                else // Called by Admin
                {
                    var result = await account_help.FindUser(userId: request.Id);
                    var response = await account_help.SendOtp(result.Id.ToString(), result.MobileNo);
                    if (response.ErrorCode != 0) return BadResponse();
                }

                return OkResponse();
            }
        }

        #endregion Send OTP

        #region Verified OTP

        [Authorize]
        [HttpPost(ActionsConst.Account.VerifiedOtp)]
        public async Task<IActionResult> VerifiedOTP([FromBody] OtpVerifiedRequest request)
        {
            await ValidateUser();
            using (var account_help = new AccountHelpers(Connection))
            {
                var response = await account_help.VerifiedOtp(UserEntity.Id.ToString(), request.OTP);
                return OkResponse(response);
            }
        }

        #endregion Verified OTP

        #region Add IC Number

        [Authorize]
        [HttpPost(ActionsConst.Account.ICNumberAdd)]
        public async Task<IActionResult> ICNumberAdd([FromBody] IcNumberAddRequest request)
        {
            await ValidateUser(role: RoleConst.Admin);
            using (var account_help = new AccountHelpers(Connection))
            {
                await account_help.ICNumberAdd(request.UserId, request.ICNumber);
                return OkResponse();
            }
        }

        #endregion Add IC Number

        #region Add IC Image

        [Authorize]
        [HttpPost(ActionsConst.Account.ICImageAdd)]
        public async Task<IActionResult> ICImageAdd([FromBody] IcImageAddRequest request, [FromServices] IUploadManager uploadManager, [FromServices] IOptions<BaseUrlConfigs> BaseUrlConfigsOptions)
        {
            await ValidateUser(role: RoleConst.Admin);
            List<ImagesRequest> IcImages = new List<ImagesRequest>();
            List<IcImageRequestList> icImagesRequestList = new List<IcImageRequestList>();
            foreach (var File in request.Images)
            {
                var extension = "." + File.Images.Split("base64,")[0].Split("/")[1].Replace(";", "");
                File.Images = File.Images.Split("base64,")[1];

                var imageName = Guid.NewGuid().ToString() + "_" + DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();

                using (var generic_help = new GenericHelpers(Connection))
                {
                    generic_help.GetImageWithExtension(uploadManager, File.Images, BaseUrlConfigsOptions.Value.UserICImage, imageName, extension);
                }
                IcImages.Add(new ImagesRequest { Images = BaseUrlConfigsOptions.Value.ImageBase + BaseUrlConfigsOptions.Value.UserICImage + "/" + imageName + extension });
                icImagesRequestList.Add(new IcImageRequestList { ICImage = imageName + extension, UserId = request.UserId });
            }
            using (var account_help = new AccountHelpers(Connection))
            {
                await account_help.ICImageAdd(icImagesRequestList);
            }

            return OkResponse(IcImages);
        }

        #endregion Add IC Image

        #region IC Image List

        [Authorize]
        [HttpPost(ActionsConst.Account.ICImagesList)]
        public async Task<IActionResult> ICImageList([FromBody] GetByIdRequestWithRequired request, [FromServices] IOptions<BaseUrlConfigs> BaseUrlConfigsOptions)
        {
            await ValidateUser(role: RoleConst.Admin);
            using (var account_help = new AccountHelpers(Connection))
            {
                var result = await account_help.ICImageSelect(request.Id, BaseUrlConfigsOptions.Value);
                return OkResponse(result);
            }
        }

        #endregion IC Image List

        #region Vader Pay Maintenance Select

        [HttpGet(ActionsConst.Account.VaderPayMaintenanceSelect)]
        public async Task<IActionResult> VaderPayMaintenanceSelect()
        {
            using (var account_help = new AccountHelpers(Connection))
            {
                var VaderPay = await account_help.GlobalSelect("VaderPay");
                return OkResponse(new { VaderPay = VaderPay });
            }
        }

        #endregion Vader Pay Maintenance Select

        #region Vader Pay Maintenance Update

        [Authorize]
        [HttpPost(ActionsConst.Account.VaderPayMaintenanceUpdate)]
        public async Task<IActionResult> VaderPayMaintenanceUpdate([FromBody] GlobalParameterUpdateRequest request)
        {
            await ValidateUser(role: RoleConst.Admin);

            string adminId = GetUserId(User).ToString();

            using (var account_help = new AccountHelpers(Connection))
            {
                await account_help.GlobalParameterUpdate(request.Value, "VaderPay", adminId);
                return OkResponse();
            }
        }

        #endregion Vader Pay Maintenance Update

        #region Global ParaMeter Select

        [HttpPost(ActionsConst.Account.GlobalparameterSelect)]
        public async Task<IActionResult> GlobalParaMeterSelect([FromBody] GlobalParameterUpdateRequest request)
        {
            using (var account_help = new AccountHelpers(Connection))
            {
                var response = await account_help.GlobalSelect(request.Name);
                return OkResponse(response);
            }
        }

        #endregion Global ParaMeter Select

        #region Global ParaMeter Update

        [Authorize]
        [HttpPost(ActionsConst.Account.GlobalparameterUpdate)]
        public async Task<IActionResult> GlobalParaMeterUpdate([FromBody] GlobalParameterUpdateRequest request)
        {
            await ValidateUser(role: RoleConst.Admin);

            string adminId = GetUserId(User).ToString();

            using (var account_help = new AccountHelpers(Connection))
            {
                await account_help.GlobalParameterUpdate(request.Value, request.Name, adminId);
                return OkResponse();
            }
        }

        #endregion Global ParaMeter Update

        #region REBATE SETTING Update

        [Authorize]
        [HttpPost(ActionsConst.Account.RebateSettingUpdate)]
        public async Task<IActionResult> RebateSettingUpdate([FromBody] RebateSettingUpdateRequest request)
        {
            await ValidateUser(role: RoleConst.Admin);

            string adminId = GetUserId(User).ToString();

            using (var account_help = new AccountHelpers(Connection))
            {
                await account_help.RebateSettingUpdate(request.DateTime, adminId);
                return OkResponse();
            }
        }

        #endregion REBATE SETTING Update

        #region Admin User Register Select

        [Authorize]
        [HttpPost(ActionsConst.Account.AdminRegisterReportSelect)]
        public async Task<IActionResult> AdminRegisterReportSelect([FromBody] AdminResigterReportRequest request)
        {
            await CheckUserRole();

            using (var account_help = new AccountHelpers(Connection))
            {
                var result = await account_help.AdminRegisterReportSelect(request);
                return OkResponse(result);
            }
        }

        #endregion Admin User Register Select

        #region Admin User Behaviour Select

        [Authorize]
        [HttpPost(ActionsConst.Account.AdminBehaviourReportSelect)]
        public async Task<IActionResult> AdminBehaviourReportSelect([FromBody] AdminBehaviourReportRequest request)
        {
            await CheckUserRole();
            using (var account_help = new AccountHelpers(Connection))
            {
                var result = await account_help.AdminBehaviourReportSelect(request);
                return OkResponse(result);
            }
        }

        #endregion Admin User Behaviour Select

        #region Download Excel File

        [HttpPost(ActionsConst.Account.ExcelDownload)]
        public async Task<IActionResult> DownloadExcel([FromBody] ExcelExportRequest request, [FromServices] IOptions<BaseUrlConfigs> BaseUrlConfigsOption)
        {
            var fileName = request.FileName + "-" + DateTime.Now.ToString("yyyyMMddHHmmssffff") + ".xlsx";
            await AccountHelpers.SaveExcelFile(fileName, BaseUrlConfigsOption.Value.ExcelLocalPath + "\\", request.json);
            return OkResponse(new { path = BaseUrlConfigsOption.Value.ImageBase + BaseUrlConfigsOption.Value.ExcelFilesPath + "/" + fileName });
        }

        #endregion Download Excel File

        #region Manager GamePassword Show

        [Authorize]
        [HttpPost(ActionsConst.Account.ManagerGamePasswordShow)]
        public async Task<IActionResult> ManagerGamePasswordShow([FromBody] ManagerApprovalGamePasswordRequest request)
        {
            await CheckUserRole();
            using (var account_help = new AccountHelpers(Connection))
            {
                var response = await account_help.ManagerApprovalGamePasswordSelect(request);
                return OkResponse(response);
            }
        }

        #endregion Manager GamePassword Show

        #region Manager resert List

        [Authorize]
        [HttpPost(ActionsConst.Account.GameResetPasswordSelect)]
        public async Task<IActionResult> GameResetPasswordSelect([FromBody] SearchGlobalRequest request)
        {
            await CheckUserRole();
            using (var account_help = new AccountHelpers(Connection))
            {
                var response = await account_help.GameResetPasswordSelect(request);
                return OkResponse(response);
            }
        }

        #endregion Manager resert List

        #region Contact Information

        [HttpPost(ActionsConst.Account.ContactInformationSelect)]
        public async Task<ContentResult> ContactInformationSelect([FromBody] ContactInformationRequest request, [FromServices] IOptions<BaseUrlConfigs> BaseUrlConfigsOptions)
        {
            using (var account_help = new AccountHelpers(Connection))
            {
                List<ContactInformationResponse> type = await account_help.ContactInformation();
                type.ForEach(x =>
                {
                    x.TypeImage = x.TypeImage == null ? null : $"{BaseUrlConfigsOptions.Value.ImageBase}{BaseUrlConfigsOptions.Value.ContactImage}/{x.TypeId}{x.TypeImage}";
                });

                type = type.Where(x => x.Details != null).ToList();

                string htmlCode = string.Empty;
                if (!request.IsMobile)
                {
                    htmlCode = @"<li class=""support-live""><h5><strong>Live Support</strong></h5><p><img src=""../../images/hours_24.png"" alt=""hours 24""></p><h6><strong style=""padding-right:60px;"">24 Hours</strong></h6></li>";
                    foreach (var contact in type)
                    {
                        htmlCode += $@"<li class=""text-center""><h5><img class=""contact-logos"" src=""{contact.TypeImage}"" alt=""{contact.Type}""> <strong><u>{contact.Type}</u></strong></h5>";
                        var contactInformationDetails = JsonConvert.DeserializeObject<List<ContactInformationDetails>>(contact.Details);
                        contactInformationDetails.ForEach(x =>
                        {
                            x.CSImage = x.CSImage == null || x.CSImage == "" ? null : $"{BaseUrlConfigsOptions.Value.ImageBase}{BaseUrlConfigsOptions.Value.ContactImage}/{x.TypeDetailsId}{x.CSImage}";
                        });
                        foreach (var info in contactInformationDetails)
                        {
                            string className = string.Empty;
                            if (info.ClassChecked)
                                className = "contact-us";

                            if (info.CSImage == null)
                            {
                                htmlCode += $@"<strong><a class=""{className}"" href=""{info.Url}"" ";

                                if (info.IsOpenInNewPage)
                                    htmlCode += $@"target=""_blank"" ";

                                htmlCode += $@">{info.CSId}</a><strong> : {info.CSName}</strong></strong><br/>";
                            }
                            else
                            {
                                htmlCode += $@"<h6><strong>{info.CSName}</strong></h6><figure><img class=""image-qr"" src=""{info.CSImage}"" alt=""barcode""></figure><a class=""{className}"">{info.CSId}</a>";
                            }
                        }
                        htmlCode += @"</li>";
                    }
                }
                else
                {
                    htmlCode = $@"<table cellpadding=""0"" cellspacing=""0"" style=""text-align:center;width:100%;border-color:white;""><tr><td colspan=""2"" style=""padding:10px;""><h5 class=""""><span>L</span>ive Chat<img src=""../../images/hours_24.png""  alt=""hours 24""></h5></td></tr></table><br/><br/><br/>";

                    foreach (var contact in type)
                    {
                        htmlCode += $@"<table class=""contact-details-info"" cellpadding=""0"" cellspacing=""0"" style=""text-align:center;width: 100%;border-color:white;margin:0 auto 10px;max-width:320px;"">";

                        var contactInformationDetails = JsonConvert.DeserializeObject<List<ContactInformationDetails>>(contact.Details);
                        contactInformationDetails.ForEach(x =>
                        {
                            x.CSImage = x.CSImage == null || x.CSImage == "" ? null : $"{BaseUrlConfigsOptions.Value.ImageBase}{BaseUrlConfigsOptions.Value.ContactImage}/{x.TypeDetailsId}{x.CSImage}";
                        });

                        string replaceHtml = $@"<tr><td rowspan=""{{0}}"" class=""text-right"" width=""30%""><img  class=""downloadIconMobile"" src=""{contact.TypeImage}"" alt=""{contact.Type}""><p class="""" style=""font-size:10px;margin:0px 5px 0px 0px;""><span>{contact.Type}</span></p></td>";

                        for (int i = 0; i < contactInformationDetails.Count; i++)
                        {
                            if (contactInformationDetails[i].CSImage == null)
                            {
                                if (i == 0)
                                {
                                    int rowSpan = contactInformationDetails[i].CSImage == null ? contactInformationDetails.Count : 2;

                                    htmlCode += string.Format(replaceHtml, rowSpan);

                                    htmlCode += $@"<td class=""text-left""><label class=""mobile-number""><a style=""color:#ffb701"" href=""{contactInformationDetails[i].Url}"">{contactInformationDetails[i].MobileText}</a></label></td></tr>";
                                }
                                else
                                {
                                    htmlCode += $@"<tr><td class=""text-left""><label class=""mobile-number""><a style=""color:#ffb701""  href=""{contactInformationDetails[i].Url}"">{contactInformationDetails[i].MobileText}</a></label></td></tr>";
                                }
                            }
                            else
                            {
                                int rowSpan = contactInformationDetails[i].CSImage == null ? contactInformationDetails.Count : 2;

                                htmlCode += string.Format(replaceHtml, rowSpan);

                                htmlCode += $@"</tr><tr><td><div style=""text-align:center;""><div style=""border:2px solid  black;width:69%;padding:10px; border-radius:20px;width:150px;""><img style=""width:100px;height:100px;text-align:center;"" src=""{contactInformationDetails[i].CSImage}"" alt=""barcode""><p>{contactInformationDetails[i].CSId}</p></div></div></td></tr>";
                            }
                        }
                        htmlCode += @"</table>";
                    }
                }

                return base.Content(htmlCode, "text/html");
            }
        }

        #endregion Contact Information

        #region Check password

        [HttpPost("testpassword")]
        public IActionResult checkpassword(string password)
        {
            return OkResponse(SecurityHelpers.DecryptPassword(password));
        }

        #endregion Check password
    }
}
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Options;
using System;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;
using Webet333.api.Controllers.Base;
using Webet333.api.Filters;
using Webet333.api.Helpers;
using Webet333.files.interfaces;
using Webet333.models.Configs;
using Webet333.models.Constants;
using Webet333.models.Request;
using Webet333.models.Request.Account;
using Webet333.models.Request.Game;
using Webet333.models.Request.Payments;
using Webet333.models.Response.Account;
using Webet333.notify.interfaces.Email;
using Webet333.models.Response.SMS;
using System.Data;
using Newtonsoft.Json;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Spreadsheet;
using DocumentFormat.OpenXml;

namespace Webet333.api.Controllers
{
    [Route(ActionsConst.ApiVersion)]
    public class AccountController : BaseController
    {
        #region Global Variable
        private IHostingEnvironment _hostingEnvironment;
        private IHubContext<SignalRHub> _hubContext;
        public AccountController(IStringLocalizer<BaseController> Localizer, IOptions<ConnectionConfigs> ConnectionStringsOptions, IHostingEnvironment environment, IHubContext<SignalRHub> hubContext) : base(ConnectionStringsOptions.Value, Localizer)
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

                if (request.GrantType == models.Enums.GrantTypeEnums.admin)
                    return OkResponse(new { access_token = user_token });

                return OkResponse(new { access_token = user_token, totalBankAccount = user.BankAccount });
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
                #endregion
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
                #endregion
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
        public async Task<IActionResult> Profile([FromBody] GetProfileRequest request)
        {
            await ValidateUser();
            if (request.Id == null && request.Username == null) return OkResponse(UserEntity);
            else if (UserEntity.Role == RoleConst.Admin)
            {
                using (var account_help = new AccountHelpers(Connection))
                {
                    var users = await account_help.FindUser(userId: request.Id, userName: request.Username);
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
                var user = await account_help.AddUser(Connection, request, RoleConst.Users);

                #region Sending email in queue
                if (user == null) return OkResponse();

                await account_help.SendOtp(user.Id.ToString(), user.MobileNo);

                var registerMessage = Localizer["msg_register_msg"].Value;

                var messageResponse = await AccountHelpers.SendSMSAPI(request.Mobile, String.Format(registerMessage, request.Username));
                var count = messageResponse.Count(f => f == ',');

                var user_token = new TokenHelpers(Connection).GetAccessToken(AuthConfigOptions.Value, user, Guid.NewGuid().ToString());

                return OkResponse(new
                {
                    access_token = user_token,
                    totalBankAccount = user.BankAccount,
                    messageResponse = new SMSResponse
                    {
                        smsMessage = Localizer["e_" + messageResponse].Value,
                        statusCode = messageResponse
                    }
                });
                #endregion
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
                request.NewPassword = Pussy888GameHelpers.genratePassword();
                updateUser = await account_help.updatePasswordByMobielNumber(request);

            }
            var messageResponse = await AccountHelpers.SendSMSAPI(updateUser.MobileNo, $"Your Username is :" + updateUser.UserName + ".  Your New Password is: " + SecurityHelpers.DecryptPassword(updateUser.Password) + ",  It's Your Temporary Password. It will Expire After Some Time, So Please Change Your Password After Successfully Login.");
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

        #endregion Get user and Update Password

        #region Wallet Maintenacnce Update

        [Authorize]
        [HttpPost(ActionsConst.Account.WalletMaintenanceUpdate)]
        public async Task<IActionResult> WalletMaintenanceUpdate([FromBody] WalletMaintenanceUpdateRequest request)
        {
            await CheckUserRole();
            using (var account_help = new AccountHelpers(Connection))
            {
                var WalletUpdate = await account_help.WalletMainteanceUpdate(request);
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

            using (var account_help = new AccountHelpers(Connection))
            {
                var refKeyword = await account_help.ReferenceKeywordInsert(request.keyword);
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

            using (var account_help = new AccountHelpers(Connection))
            {
                var refKeyword = await account_help.ReferenceKeywordDelete(request.Id.ToString());
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

        #region  Get List of Language

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

        #endregion

        #region Login Reigster Tracking Insert

        [HttpPost(ActionsConst.Account.TrackingInsert)]
        public async Task<IActionResult> TrackingInsert([FromBody] TrackingInsertRequest request)
        {
            if (!ModelState.IsValid) return BadResponse(ModelState);

            using (var accounthelper = new AccountHelpers(Connection))
            {
                await accounthelper.TrackingInsert(request);
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

        #endregion 

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

        #endregion 

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

        #endregion 

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

        #endregion 

        #region SMS SEND

        [HttpPost(ActionsConst.Account.SendSMS)]
        public async Task<IActionResult> SendSMS([FromBody] SmsSend request)
        {
            if (request == null) return BadResponse("error_empty_request");
            if (!ModelState.IsValid) return BadResponse(ModelState);

            var messageResponse = await AccountHelpers.SendSMSAPI(request.MobileNo, request.Message);

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

        #endregion 

        #region Last Login Update

        [Authorize]
        [HttpPost(ActionsConst.Account.LastLoginTimeUpdate)]
        public async Task<IActionResult> LastLoginTimeUpdate([FromBody] GetByIdRequest request)
        {
            using (var account_help = new AccountHelpers(Connection))
            {
                await account_help.UserLastLoginTime(GetUserId(User).ToString());
                return OkResponse();
            }
        }

        #endregion 

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

        #endregion 

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

        #endregion 

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

        #endregion

        #region Send OTP
        [Authorize]
        [HttpGet(ActionsConst.Account.SendOtp)]
        public async Task<IActionResult> SendOtp()
        {
            await ValidateUser();
            using (var account_help = new AccountHelpers(Connection))
            {
                var response = await account_help.SendOtp(UserEntity.Id.ToString(), UserEntity.MobileNo);
                if (response.ErrorCode != 0) return BadResponse();
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

        #region  IC Image List

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

        #endregion

        #region  Vader Pay Maintenance Select

        [HttpGet(ActionsConst.Account.VaderPayMaintenanceSelect)]
        public async Task<IActionResult> VaderPayMaintenanceSelect()
        {
            using (var account_help = new AccountHelpers(Connection))
            {
                var VaderPay = await account_help.GlobalSelect("VaderPay");
                return OkResponse(new { VaderPay = VaderPay });
            }
        }

        #endregion

        #region  Vader Pay Maintenance Update

        [Authorize]
        [HttpPost(ActionsConst.Account.VaderPayMaintenanceUpdate)]
        public async Task<IActionResult> VaderPayMaintenanceUpdate([FromBody] GlobalParameterUpdateRequest request)
        {
            await ValidateUser(role: RoleConst.Admin);
            using (var account_help = new AccountHelpers(Connection))
            {
                await account_help.GlobalParameterUpdate(request.Value, "VaderPay");
                return OkResponse();
            }
        }

        #endregion

        #region  Global ParaMeter Select

        [HttpPost(ActionsConst.Account.GlobalparameterSelect)]
        public async Task<IActionResult> GlobalParaMeterSelect([FromBody] GlobalParameterUpdateRequest request)
        {
            using (var account_help = new AccountHelpers(Connection))
            {
                var response = await account_help.GlobalSelect(request.Name);
                return OkResponse(response);
            }
        }

        #endregion

        #region  Global ParaMeter Update

        [Authorize]
        [HttpPost(ActionsConst.Account.GlobalparameterUpdate)]
        public async Task<IActionResult> GlobalParaMeterUpdate([FromBody] GlobalParameterUpdateRequest request)
        {
            await ValidateUser(role: RoleConst.Admin);
            using (var account_help = new AccountHelpers(Connection))
            {
                await account_help.GlobalParameterUpdate(request.Value, request.Name);
                return OkResponse();
            }
        }

        #endregion

        #region  REBATE SETTING Update

        [Authorize]
        [HttpPost(ActionsConst.Account.RebateSettingUpdate)]
        public async Task<IActionResult> RebateSettingUpdate([FromBody] RebateSettingUpdateRequest request)
        {
            await ValidateUser(role: RoleConst.Admin);
            using (var account_help = new AccountHelpers(Connection))
            {
                await account_help.RebateSettingUpdate(request.DateTime);
                return OkResponse();
            }
        }

        #endregion

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

        #endregion 

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

        #endregion 

        #region Download Excel File

        [HttpPost(ActionsConst.Account.ExcelDownload)]
        public async Task<IActionResult> DownloadExcel([FromBody] ExcelExportRequest request, [FromServices] IOptions<BaseUrlConfigs> BaseUrlConfigsOption)
        {
            var fileName = request.FileName + "-" + DateTime.Now.ToString("yyyyMMddHHmmssffff") + ".xlsx";
            await AccountHelpers.SaveExcelFile(fileName, BaseUrlConfigsOption.Value.ExcelLocalPath + "\\", request.json);
            return OkResponse(new { path = BaseUrlConfigsOption.Value.ImageBase + BaseUrlConfigsOption.Value.ExcelFilesPath + "/" + fileName });
        }

        #endregion



        //#region check password

        //[HttpPost("testpassword")]
        //public IActionResult checkpassword(string password)
        //{
        //    return OkResponse(SecurityHelpers.DecryptPassword(password));
        //}

        //#endregion 
    }
}
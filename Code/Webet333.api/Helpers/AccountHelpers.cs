using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Office2010.Excel;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Spreadsheet;
using Microsoft.AspNetCore.Hosting;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Data;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
using Webet333.dapper;
using Webet333.models.Configs;
using Webet333.models.Constants;
using Webet333.models.Entities;
using Webet333.models.Request;
using Webet333.models.Request.Account;
using Webet333.models.Request.Game;
using Webet333.models.Request.Payments;
using Webet333.models.Response;
using Webet333.models.Response.Account;

namespace Webet333.api.Helpers
{
    public class AccountHelpers : IDisposable
    {
        #region Local Variables
        private string Connection = string.Empty;

        public AccountHelpers(string Connection = null)
        {
            this.Connection = Connection;
        }
        #endregion

        #region User Management
        public async Task<ProfileResponse> AddUser(string Connection, RegisterRequest request, string Role)
        {
            if (new SystemHelpers().IsValidMobile(request.Mobile))
            {
                using (var repository = new DapperRepository<dynamic>(Connection))
                {
                    await repository.AddOrUpdateAsync(StoredProcConsts.Account.SetUsers, new { request.Name, UserName = request.Username, MobileNo = request.Mobile, Password = SecurityHelpers.EncryptPassword(request.Password), Role, request.ReferenceKeyword });
                }
            }
            return await FindUser(mobileNo: request.Mobile);
        }

        public async Task<ProfileResponse> FindUser(string email = null, string password = null, string password918 = null, string userId = null, string userName = null, string uniqueId = null, string grantType = null, string mobileNo = null, string userName918 = null)
        {
            using (var GetProfileRepository = new DapperRepository<ProfileResponse>(Connection))
            {
                ProfileResponse user = await GetProfileRepository.FindAsync(StoredProcConsts.Account.GetProfile, new { email, Password = SecurityHelpers.EncryptPassword(password), userId, userName, uniqueId, Role = grantType, mobileNo, userName918, Password918 = password918 });
                return user;
            }
        }

        public async Task<int> Logout(string UniqueId)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                await repository.AddOrUpdateAsync(StoredProcConsts.Account.EditRefreshToken, new { UniqueId });
            }
            return 0;
        }
        #endregion

        #region Confirm Email

        public async Task<string> ConfirmEmail(string token)
        {
            using (var token_help = new TokenHelpers(Connection))
            {
                var data = token_help.ValidateToken(token, EmailTypeConst.ConfirmEmail);
                using (var repository = new DapperRepository<dynamic>(Connection))
                {
                    await repository.AddOrUpdateAsync(StoredProcConsts.Account.EmailConfirmation, new { UserId = data.Result.userId.ToString() });
                }
                token_help.ExpireToken(data.Result.uniqueId.ToString(), data.Result.userId.ToString());
                return data.Result.userId.ToString();
            }
        }

        #endregion Confirm Email

        #region Password Helpers
        public async Task<string> UpdatePasswordToken(string token, string password)
        {
            return await UpdatePassword(token, password, EmailTypeConst.ResetPassword);
        }

        public async Task<string> GetDataFromPasswordToken(string token)
        {
            using (var token_help = new TokenHelpers(Connection))
            {
                var data = await token_help.ValidateToken(token, EmailTypeConst.ResetPassword);
                return data.userId.ToString();
            }
        }

        public async Task<string> AdminInviteUpdate(string token, string password)
        {
            return await UpdatePassword(token, password, EmailTypeConst.AdminInvite);
        }

        public async Task<int> ChangePassword(string userId, string Password)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                await repository.AddOrUpdateAsync(StoredProcConsts.Account.SetPassword, new { userId, password = SecurityHelpers.EncryptPassword(Password) });
            }
            return 0;
        }

        private async Task<string> UpdatePassword(string token, string password, string purpose)
        {
            using (var token_help = new TokenHelpers(Connection))
            {
                var data = await token_help.ValidateToken(token, purpose);
                await ChangePassword(data.userId.ToString(), password);
                token_help.ExpireToken(data.uniqueId.ToString(), data.userId.ToString());
                return data.userId.ToString();
            }
        }
        #endregion

        #region Dashboard stats

        public async Task<dynamic> DashboardStats()
        {
            using (var GetDashboardStatsRepository = new DapperRepository<dynamic>(Connection))
            {
                var result = await GetDashboardStatsRepository.GetDataAsync(StoredProcConsts.Account.DashboardStats, new { });
                return result;
            }
        }

        #endregion

        #region Analytics

        public async Task<dynamic> Analytics(AnalyticsRequest request)
        {
            using (var GetDashboardStatsRepository = new DapperRepository<WebAnalyticsResponse>(Connection))
            {
                var res = await GetDashboardStatsRepository.GetDataAsync(StoredProcConsts.Account.Analytics, new { request.FromDate, request.ToDate });
                var result = res.ToList();
                List<WebAnalyticsResponse> refkeyword = result.Where(el => el.RefKeyword != "DESKTOP" && el.RefKeyword != "PHONE" && el.RefKeyword != "TotalUser").ToList();
                List<WebAnalyticsResponse> Withoutrefkeyword = result.Where(el => el.RefKeyword == "DESKTOP" || el.RefKeyword == "PHONE").ToList();
                var TotalNewUser = result.SingleOrDefault(x => x.RefKeyword == "TotalUser").TotalUsers;
                var TotalVerfiedUser = result.SingleOrDefault(x => x.RefKeyword == "TotalVerfiedUser").TotalUsers;
                var TotalNotVerfiedUser = result.SingleOrDefault(x => x.RefKeyword == "TotalNotVerfiedUser").TotalUsers;
                refkeyword.ForEach(x => x.TotalWinLose = x.TotalDepoist - x.TotalWithdraw - x.TotalBonus);
                return new { refkeyword, Withoutrefkeyword, TotalNewUser, TotalVerfiedUser, TotalNotVerfiedUser };
            }
        }

        #endregion

        #region Get User's By Mobile Number and update password 
        public async Task<ProfileResponseByMobile> GetUsersByMobile(EmailRequest request)
        {
            using (var repository = new DapperRepository<ProfileResponseByMobile>(Connection))
            {
                ProfileResponseByMobile users = await repository.FindAsync(StoredProcConsts.Account.GetUsersByMobile, new { request.MobileNumber });

                if (users != null) users.Password = SecurityHelpers.DecryptPassword(users.Password);

                return users;
            }
        }


        public async Task<ProfileResponseByMobile> updatePasswordByMobielNumber(EmailRequest request)
        {
            using (var repository = new DapperRepository<ProfileResponseByMobile>(Connection))
            {
                ProfileResponseByMobile users = await repository.FindAsync(StoredProcConsts.Account.updatePasswordBymobile, new { request.MobileNumber, NewPassword = SecurityHelpers.EncryptPassword(request.NewPassword) });

                users.Password = SecurityHelpers.DecryptPassword(users.Password);
                return users;
            }
        }
        #endregion

        #region Wallet Maintenance Update
        public async Task<dynamic> WalletMainteanceUpdate(WalletMaintenanceUpdateRequest request)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                var WalletUpdate = await repository.GetDataAsync(StoredProcConsts.Account.walletMaintenanceUpdate, new { request.Id, request.Maintenance });
                return WalletUpdate;
            }
        }
        #endregion

        #region Wallet Select
        public async Task<dynamic> WalletList()
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                var walletList = await repository.GetDataAsync(StoredProcConsts.Account.walletList, new { });
                return walletList;
            }
        }
        #endregion

        #region Social Media Statics and Reference keyword insert and update
        public async Task<dynamic> SocialMediaStatics(string keyword)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                var users = await repository.GetDataAsync(StoredProcConsts.Account.SocialMediaStaticsInsert, new { keyword });
                return users;
            }
        }

        public async Task<dynamic> ReferenceKeywordList()
        {
            using (var referenceKeyword = new DapperRepository<dynamic>(Connection))
            {
                var result = await referenceKeyword.GetDataAsync(StoredProcConsts.Account.ReferenceKeywordList, new { });
                return result;
            }
        }

        public async Task<dynamic> ReferenceKeywordInsert(string keyword)
        {
            using (var referenceKeyword = new DapperRepository<dynamic>(Connection))
            {
                var result = await referenceKeyword.GetDataAsync(StoredProcConsts.Account.ReferenceKeywordInsert, new { keyword });
                return result;
            }
        }

        public async Task<dynamic> ReferenceKeywordDelete(string Id)
        {
            using (var referenceKeyword = new DapperRepository<dynamic>(Connection))
            {
                var result = await referenceKeyword.AddOrUpdateAsync(StoredProcConsts.Account.ReferenceKeywordDelete, new { Id });
                return result;
            }
        }

        #endregion

        #region Get Language list

        public async Task<dynamic> GetLanguage()
        {
            using (var Repository = new DapperRepository<dynamic>(Connection))
            {
                return await Repository.GetDataAsync(StoredProcConsts.Account.SelectLanguage, new { });
            }
        }

        #endregion

        #region User Info Get for GetBalance 

        public async Task<GetBalanceUserResponse> UserGetBalanceInfo(string UserId, string ToWalletName = null)
        {
            using (var Repository = new DapperRepository<GetBalanceUserResponse>(Connection))
            {
                return await Repository.FindAsync(StoredProcConsts.Account.GameBalanceInfo, new { UserId, ToWalletName });
            }
        }

        #endregion User Info Get for GetBalance 

        #region User Game Password Update

        public async Task UserGamePasswordChange(string UserId, string Password, IHostingEnvironment _hostingEnvironment)
        {
            var info = await UserGetBalanceInfo(UserId);

            DateTime UnixEpoch = new DateTime(1970, 1, 1, 0, 0, 0, 0, DateTimeKind.Local);
            var temp = (long)DateTime.UtcNow.Subtract(UnixEpoch).TotalSeconds;
            var perameter = $"Method={GameConst.Joker.SetPassword}&Password={Password}&Timestamp={temp}&Username={info.JokerGamePrefix}{info.Username}";
            var stringContent = new StringContent(perameter, Encoding.UTF8, "application/x-www-form-urlencoded");
            var jokerURL = $"{GameConst.Joker.jokerBaseUrl}?" +
                            $"AppID={GameConst.Joker.AppID}&" +
                            $"Signature={GameHelpers.GenerateHas(perameter)}";

            var jokerPasswordUpdate = JsonConvert.DeserializeObject(await GameHelpers.CallThirdPartyApi(jokerURL, stringContent));

            var PlaytechURL = $"{GameConst.Playtech.playtechBaseUrl}" +
                                $"update?playername={info.PlaytechGamePrefix.ToUpper()}{info.Username.ToUpper()}&password={Password}";

            DefaultHelper defaultHelper = new DefaultHelper(_hostingEnvironment);
            dynamic resultPlaytech = JsonConvert.DeserializeObject(await defaultHelper.PlaytechAPICertificate(PlaytechURL, true, true));

            await DGGameHelpers.CallUpdateuserAPI(info.DGGamePrefix + info.Username, Password);

            await AllBetGameHelpers.ChangePasswordCallAPI(info.AllBetGamePrefix + info.UserId, Password);

            await WMGameHelpers.ChangePasswordCallAPI(info.WMGamePrefix + info.UserId, Password);
        }

        #endregion User Game Password Update

        public async Task<GlobalParameterResponse> GlobalSelect(string Name)
        {
            using (var dapperRepository = new DapperRepository<GlobalParameterResponse>(Connection))
            {
                return await dapperRepository.FindAsync(StoredProcConsts.Global.GetGlobalParamters, new { Name });
            }
        }

        public async Task<dynamic> RebateSettingUpdate(int Datetime)
        {
            using (var dapperRepository = new DapperRepository<dynamic>(Connection))
            {
                return await dapperRepository.FindAsync(StoredProcConsts.Account.RebateSettingUpdate, new { Datetime });
            }
        }

        public async Task<dynamic> GetgameUsername(string UserId)
        {
            using (var dapperRepository = new DapperRepository<dynamic>(Connection))
            {
                return await dapperRepository.FindAsync(StoredProcConsts.Account.GameUsernameSelect, new { UserId });
            }
        }

        public async Task TrackingInsert(TrackingInsertRequest request)
        {
            using (var dapperRepository = new DapperRepository<dynamic>(Connection))
            {
                await dapperRepository.AddOrUpdateAsync(StoredProcConsts.Account.TrackingInsert, new { request.UserNames, request.Process });
            }
        }

        public async Task TrackingLoginRegisterUpdate()
        {
            using (var dapperRepository = new DapperRepository<dynamic>(Connection))
            {
                await dapperRepository.AddOrUpdateAsync(StoredProcConsts.Account.TranckingLoginRegister_Update, new { });
            }
        }

        public async Task<dynamic> TrackingSelect(TrackingSelectRequest request)
        {
            using (var dapperRepository = new DapperRepository<dynamic>(Connection))
            {
                return await dapperRepository.GetDataAsync(StoredProcConsts.Account.TrackingSelect, request);
            }
        }

        public async Task<dynamic> BettingDetailsLastUpdateSelect(RebateListRequest request)
        {
            using (var dapperRepository = new DapperRepository<dynamic>(Connection))
            {
                return await dapperRepository.GetDataAsync(StoredProcConsts.Account.BettingDetailsLastUpdateSelect, new { request.FromDate, request.ToDate, request.GameName });
            }
        }

        public async Task<dynamic> ManagerInsert(ManagerOperationInsertRequest request, string Id)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                var result = await repository.AddOrUpdateAsync(StoredProcConsts.Account.ManagerOperationInsert, new { request.New, request.Old, request.OperationType, request.UserId, request.IdentityProof, Id });
                return result;
            }
        }

        public async Task<List<ManagerOperationSelectResponse>> ManagerSelect(GlobalGetRequest request, BaseUrlConfigs baseUrl)
        {
            using (var repository = new DapperRepository<ManagerOperationSelectResponse>(Connection))
            {
                var result = await repository.GetDataAsync(StoredProcConsts.Account.ManagerOperationSelect, new { request.ToDate, request.FromDate, request.Status });
                var res = result.ToList();
                res.ForEach(response =>
                       response.IdentityProof = (response.IdentityProof != null && !string.IsNullOrEmpty(response.IdentityProof)) ? $"{baseUrl.ImageBase}{baseUrl.ManagerProof}/{response.Id}{response.IdentityProof}" : "");
                return res;
            }
        }

        public async Task<dynamic> AdminRegisterReportSelect(AdminResigterReportRequest request)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                var result = await repository.GetDataAsync(StoredProcConsts.Account.AdminUsersRegisterSelect, new { request.ToDate, request.FromDate, request.OTPVerified });
                return result;
            }
        }

        public async Task<dynamic> AdminBehaviourReportSelect(AdminBehaviourReportRequest request)
        {
            using (var repository = new DapperRepository<AdminBehaviourReportResponse>(Connection))
            {
                var result = await repository.GetDataAsync(StoredProcConsts.Account.AdminUsersBehaviourSelect, new { request.ToDate, request.FromDate, request.DepositAmount, request.WinAmount, request.DepositTimes, request.PromotionApply, request.LoseAmount, request.PlayLiveCasino, request.PlaySlot, request.PlaySports });
                var res = result.ToList();
                var totalUser = res.Count();
                var totalDeposit = res.Sum(x => x.TotalDeposit);
                var totalWithdraw = res.Sum(x => x.TotalWithdraw);
                var totalBonus = res.Sum(x => x.TotalBonus);

                return new
                {
                    totalUser,
                    totalDeposit,
                    totalWithdraw,
                    totalBonus,
                    res
                };
            }
        }

        public async Task<List<SmsUsersList>> SmsUserList(SmsListRequest request)
        {
            using (var repository = new DapperRepository<SmsUsersList>(Connection))
            {
                var result = await repository.GetDataAsync(StoredProcConsts.Account.SMSUserList, request);
                var res = result.ToList();
                return res;
            }
        }

        public async Task ManagerUpdate(ManagerOperationUpdateRequest request)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                await repository.AddOrUpdateAsync(StoredProcConsts.Account.ManagerOperationUpdate, request);
            }
        }

        public async Task<dynamic> ManagerApprovalGamePasswordSelect(ManagerApprovalGamePasswordRequest request)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                return await repository.GetDataAsync(StoredProcConsts.Account.ManagerApprovalPasswordSelect, request);
            }
        }

        public async Task<dynamic> GameResetPasswordSelect(SearchGlobalRequest request)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                return await repository.GetDataAsync(StoredProcConsts.Account.GameResetPasswordSelect, new { request.Keyword, request.FromDate, request.ToDate });
            }
        }

        public async Task UserLastLoginTime(string UserId)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                await repository.AddOrUpdateAsync(StoredProcConsts.Account.LastLoginTimeUpdate, new { UserId });
            }
        }

        public async Task<dynamic> GlobalParameterUpdate(string Value, string Name)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                return await repository.AddOrUpdateAsync(StoredProcConsts.Global.UpdateGlobalParamters, new { Name, Value });
            }
        }

        public async Task<OtpResponse> SendOtp(string UserId, string MobileNo)
        {
            OtpResponse response;
            using (var dapperRepository = new DapperRepository<OtpResponse>(Connection))
            {
                response = await dapperRepository.FindAsync(StoredProcConsts.Account.GenrateOtp, new { UserId });
            }

            if (response.ErrorCode == 0 && response.OTP != null)
            {
                var Message = response.OTP + " is your OTP and it is vaild for next 5 mins. Please do not share this OTP with anyone. Thank you";


                await SendSMSAPI(MobileNo, Message);
            }
            return response;
        }

        public async Task<OtpResponse> VerifiedOtp(string UserId, string OTP)
        {
            OtpResponse response;
            using (var dapperRepository = new DapperRepository<OtpResponse>(Connection))
            {
                response = await dapperRepository.FindAsync(StoredProcConsts.Account.VerifiedOtp, new { UserId, OTP });
            }
            return response;
        }

        public async Task<dynamic> ICNumberAdd(string UserId, string ICNumber)
        {
            using (var dapperRepository = new DapperRepository<dynamic>(Connection))
            {
                return await dapperRepository.AddOrUpdateAsync(StoredProcConsts.Account.UserICNumberInsert, new { UserId, ICNumber });
            }

        }

        public async Task<dynamic> ICImageAdd(List<IcImageRequestList> requestLists)
        {
            using (var dapperRepository = new DapperRepository<dynamic>(Connection))
            {
                return await dapperRepository.AddOrUpdateAsync(StoredProcConsts.Account.UserICImageInsert, requestLists);
            }

        }

        public async Task<List<IcImageList>> ICImageSelect(string UserId, BaseUrlConfigs baseUrl)
        {
            using (var dapperRepository = new DapperRepository<IcImageList>(Connection))
            {
                var result = await dapperRepository.GetDataAsync(StoredProcConsts.Account.UserICImageSelect, new { UserId });
                var icImageResponse = result.ToList();
                icImageResponse.ForEach(icImage =>
                {
                    icImage.ICImageBanner = (!string.IsNullOrEmpty(icImage.ICImageBanner)) ? $"{baseUrl.ImageBase}{baseUrl.UserICImage}/{icImage.ICImageBanner}" : "";
                });
                return icImageResponse;
            }

        }

        public static async Task SaveExcelFile(string fileName, string Path, dynamic json)
        {
            if (!Directory.Exists(Path))
                Directory.CreateDirectory(Path);
            string fullpath = Path + fileName;
            DataTable table = (DataTable)JsonConvert.DeserializeObject(JsonConvert.SerializeObject(json), (typeof(DataTable)));
            using (SpreadsheetDocument document = SpreadsheetDocument.Create(fullpath, SpreadsheetDocumentType.Workbook))
            {
                WorkbookPart workbookPart = document.AddWorkbookPart();
                workbookPart.Workbook = new Workbook();

                WorksheetPart worksheetPart = workbookPart.AddNewPart<WorksheetPart>();
                var sheetData = new SheetData();
                worksheetPart.Worksheet = new Worksheet(sheetData);

                Sheets sheets = workbookPart.Workbook.AppendChild(new Sheets());
                Sheet sheet = new Sheet() { Id = workbookPart.GetIdOfPart(worksheetPart), SheetId = 1, Name = "Sheet1" };

                sheets.Append(sheet);

                Row headerRow = new Row();

                List<String> columns = new List<string>();
                foreach (System.Data.DataColumn column in table.Columns)
                {

                    columns.Add(column.ColumnName);
                    Cell cell = new Cell();
                    cell.DataType = CellValues.String;
                    cell.CellValue = new CellValue(column.ColumnName);
                    headerRow.AppendChild(cell);
                }

                sheetData.AppendChild(headerRow);

                foreach (DataRow dsrow in table.Rows)
                {
                    Row newRow = new Row();
                    foreach (String col in columns)
                    {
                        Cell cell = new Cell();
                        cell.DataType = CellValues.String;
                        cell.CellValue = new CellValue(dsrow[col].ToString());
                        newRow.AppendChild(cell);
                    }

                    sheetData.AppendChild(newRow);
                }

                workbookPart.Workbook.Save();
            }
        }

        #region Send SMS API

        public async Task<string> SendSMSAPI(string MobileNo, string Message)
        {

            MobileNo = MobileNo.Trim().Replace("+", "").Replace("-", "");
            if (MobileNo.Substring(0, 1) != "6")
                MobileNo = "6" + MobileNo;

            List<GlobalParameterResponse> response;
            using (var dapperRepository = new DapperRepository<GlobalParameterResponse>(Connection))
            {
                var res = await dapperRepository.GetDataAsync(StoredProcConsts.Account.SMSServiceSelect, new { });
                response = res.ToList();
            }

            bool Etracker = Convert.ToBoolean(response.Single(x => x.Name == "Etracker").Value);
            bool Trio = Convert.ToBoolean(response.Single(x => x.Name == "Trio").Value);

            if (Etracker)
            {
                var URL = $"{GameConst.SMSConst.Url}user={GameConst.SMSConst.User}&pass={GameConst.SMSConst.Password}&type={GameConst.SMSConst.Type}&to={MobileNo}&from={GameConst.SMSConst.From}&text={Message}&servid={GameConst.SMSConst.ServId}&title={GameConst.SMSConst.Title}";
                return await GameHelpers.CallThirdPartyApi(URL);
            }

            if (Trio)
            {
                var URL = $"{GameConst.SMSConst.TrioUrl}api_key={GameConst.SMSConst.TrioApiKey}&action=send&to={MobileNo}&msg={Message}&sender_id={GameConst.SMSConst.TrioSenderId}&content_type=1&mode=shortcode&campaign=";
                var apiResponse = await GameHelpers.CallThirdPartyApi(URL);
                if (apiResponse.Length > 3)
                    return MobileNo + "," + apiResponse.Replace("\n\n", "") + "," + "200";

                return apiResponse;
            }

            return string.Empty;
        }

        #endregion Send SMS API

        #region Check Active SMS Services



        #endregion

        #region House Keeping
        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        public void Dispose(bool dispose)
        {
            if (dispose)
            {
                Connection = string.Empty;
            }
        }
        #endregion
    }
}
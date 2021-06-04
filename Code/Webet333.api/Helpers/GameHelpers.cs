using Microsoft.AspNetCore.Hosting;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Xml.Linq;
using Webet333.api.Helpers.SexyBaccarat;
using Webet333.dapper;
using Webet333.models.Configs;
using Webet333.models.Constants;
using Webet333.models.Mapping.Game;
using Webet333.models.Request;
using Webet333.models.Request.Game;
using Webet333.models.Request.Game.M8;
using Webet333.models.Request.Payments;
using Webet333.models.Response;
using Webet333.models.Response.Account;
using Webet333.models.Response.Game;
using Webet333.models.Response.Game.AG;
using Webet333.models.Response.Game.DG;
using Webet333.models.Response.Game.Joker;
using Webet333.models.Response.Game.Kiss918;
using Webet333.models.Response.Game.Pussy888;
using Webet333.models.Response.Game.SexyBaccarat;
using Webet333.models.Response.TransferMoney;

namespace Webet333.api.Helpers
{
    public class GameHelpers : IDisposable
    {
        #region Local Variables

        private string Connection = string.Empty;

        private static readonly HttpClient client = new HttpClient();

        public GameHelpers(string Connection = null)
        {
            this.Connection = Connection;
        }

        #endregion Local Variables

        #region GameJoker

        internal async Task<dynamic> GameJokerRegister(GameJokerRegisterRequest request)
        {
            string response = request.APIResponse.ToString(Newtonsoft.Json.Formatting.None);
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                await repository.AddOrUpdateAsync(StoredProcConsts.Game.GameJokerRegister, new { request.UserId, request.JokerUserName, APIResponse = response });
            }
            return await FindUsersGame(gameName: "Joker", userId: request.UserId);
        }

        #endregion GameJoker

        #region GamePlaytech

        internal async Task<dynamic> GamePlaytechRegister(GamePlaytechRegisterRequest request)
        {
            string response = request.APIResponse.ToString(Newtonsoft.Json.Formatting.None);
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                await repository.AddOrUpdateAsync(StoredProcConsts.Game.GamePlaytechRegister, new { request.UserId, request.PlaytechUserName, APIResponse = response });
            }
            return await FindUsersGame(gameName: "Playtech", userId: request.UserId);
        }

        #endregion GamePlaytech

        #region Game918Kiss

        internal async Task<dynamic> Game918KissRegister(Game918KissRegisterRequest request)
        {
            string response = request.APIResponse.ToString(Newtonsoft.Json.Formatting.None);
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                await repository.AddOrUpdateAsync(StoredProcConsts.Game.Game918KissRegister, new { request.UserId, request._918KissUserName, APIResponse = response });
            }
            return await FindUsersGame(gameName: "918Kiss", userId: request.UserId);
        }

        #endregion Game918Kiss

        #region GameAG

        internal async Task<dynamic> GameAGRegister(GameAGRegisterRequest request)
        {
            string response = request.APIResponse.ToString(Newtonsoft.Json.Formatting.None);
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                await repository.AddOrUpdateAsync(StoredProcConsts.Game.GameAGRegister, new { request.UserId, request.AGUserName, APIResponse = response });
            }
            return await FindUsersGame(gameName: "AG", userId: request.UserId);
        }

        #endregion GameAG

        #region GameM8

        internal async Task<dynamic> GameM8Register(GameM8RegisterRequest request)
        {
            string response = request.APIResponse.ToString(Newtonsoft.Json.Formatting.None);
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                await repository.AddOrUpdateAsync(StoredProcConsts.Game.GameM8Register, new { request.UserId, request.M8UserName, APIResponse = response });
            }
            return await FindUsersGame(gameName: "M8", userId: request.UserId);
        }

        #endregion GameM8

        #region Find Users From Game

        public async Task<dynamic> FindUsersGame(string gameName = null, string userId = null)
        {
            using (var GetProfileRepository = new DapperRepository<dynamic>(Connection))
            {
                dynamic users = await GetProfileRepository.FindAsync(StoredProcConsts.Game.GameGetProfile, new { GameName = gameName, UserId = userId });
                return users;
            }
        }

        #endregion Find Users From Game

        #region Select User Present In Game Or Not

        internal async Task<dynamic> SelectFromGame(GetByIdRequest request)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                var res = await repository.FindAsync(StoredProcConsts.Game.UsersSelectFromGame, new { UserId = request.Id });
                return res;
            }
        }

        #endregion Select User Present In Game Or Not

        #region Betting Details Insert

        #region AG Services

        internal async Task<int> AgServicesInsert(AGServicesResponse request)
        {
            if (request.trans != null)
            {
                for (int i = 0; i <= request.trans.Count(); i += 999)
                {
                    var response = JsonConvert.SerializeObject(request.trans.OrderBy(x => x.trans_id).Skip(i).Take(999).ToList());
                    using (var repository = new DapperRepository<dynamic>(Connection))
                    {
                        var res = await repository.AddOrUpdateAsync(StoredProcConsts.Game.AGBettingDetailsInsert, new { jsonString = response });
                    }
                }
            }
            return 0;
        }

        #endregion AG Services

        #region Mega888 Services

        internal async Task Mega888ServicesInsert(Mega888ServicesResponse request)
        {
            var result = request.result.OrderBy(x => x.userId).ToList();

            for (int i = 0; i <= result.Count(); i += 200)
            {
                var response = result.OrderBy(x => x.userId).Skip(i).Take(200);
                using (var repository = new DapperRepository<dynamic>(Connection))
                {
                    var res = await repository.AddOrUpdateAsync(StoredProcConsts.Game.Mega88BettingDetailsInsert, response);
                }
            }
        }

        #endregion Mega888 Services

        #region Kiss918 Services

        internal async Task Kiss918ServicesInsert(Kiss918ServicesResponse request)
        {
            var result = request.results.OrderBy(x => x.idx).ToList();
            for (int i = 0; i <= result.Count(); i += 200)
            {
                var response = result.Skip(i).Take(200);
                using (var repository = new DapperRepository<dynamic>(Connection))
                {
                    var res = await repository.AddOrUpdateAsync(StoredProcConsts.Game.Kiss918BettingDetailsInsert, response);
                }
            }
        }

        #endregion Kiss918 Services

        #region Pussy888 Services

        internal async Task Pussy888ServicesInsert(List<Pussy888Result> request)
        {
            var result = request.OrderBy(x => x.Account).ToList();
            for (int i = 0; i <= result.Count(); i += 200)
            {
                var response = result.Skip(i).Take(200);
                using (var repository = new DapperRepository<dynamic>(Connection))
                {
                    var res = await repository.AddOrUpdateAsync(StoredProcConsts.Game.Pussy888BettingDetailsInsert, response);
                }
            }
        }

        #endregion Pussy888 Services

        #region M8 Services

        internal async Task<int> M8ServicesInsert(List<M8ServicesResponse> request)
        {
            for (int i = 0; i <= request.Count(); i += 10000)
            {
                var response = JsonConvert.SerializeObject(request.OrderBy(x => x.fid).Skip(i).Take(10000).ToList());
                using (var repository = new DapperRepository<dynamic>(Connection))
                {
                    await repository.AddOrUpdateAsync(StoredProcConsts.Game.M8BettingDetailsInsert, new { jsonString = response });
                }
            }
            return 0;
        }

        #endregion M8 Services

        #region Joker Services

        internal async Task<int> JokerServicesInsert(JokerServicesResponse request)
        {
            JokerServicesMapping jokerServicesMapping = new JokerServicesMapping();
            List<Winloss> result = jokerServicesMapping.Map(request.Winloss).OrderBy(x => x.OCode).ToList();
            for (int i = 0; i <= result.Count(); i += 200)
            {
                var response = result.Skip(i).Take(200);
                using (var repository = new DapperRepository<dynamic>(Connection))
                {
                    var res = await repository.AddOrUpdateAsync(StoredProcConsts.Game.JokerBettingDetailsInsertUpdate, response);
                }
            }
            return 0;
        }

        #endregion Joker Services

        #region Playtech Services

        internal async Task<int> PlaytechServicesInsert(List<Result> request)
        {
            request = request.OrderBy(x => x.PLAYERNAME).ToList();
            for (int i = 0; i <= request.Count(); i += 1000)
            {
                var response = request.Skip(i).Take(1000).ToList();
                var JsonString = JsonConvert.SerializeObject(response);
                using (var repository = new DapperRepository<dynamic>(Connection))
                {
                    var res = await repository.AddOrUpdateAsync(StoredProcConsts.Game.PlaytechBettingDetailsInsertUpdate, new { JsonString = JsonString });
                }
            }
            return 0;
        }

        #endregion Playtech Services

        #region Max Bet Services

        internal async Task<dynamic> MaxBetServicesInsert(List<BetDetail> response, List<BetNumberDetails> responseNumber, long versionKey = 0, string adminId = null)
        {
            var resultNumber = JsonConvert.SerializeObject(responseNumber.OrderBy(x => x.TransId).ToList());
            for (int i = 0; i <= response.Count(); i += 10000)
            {
                var result = JsonConvert.SerializeObject(response.OrderBy(x => x.TransId).Skip(i).Take(10000).ToList());
                using (var repository = new DapperRepository<dynamic>(Connection))
                {
                    return await repository.FindAsync(
                        StoredProcConsts.Game.MaxBetBettingDetailsInsertUpdate,
                        new
                        {
                            jsonBettingDetails = result,
                            jsonBettingNumberDetails = resultNumber,
                            versionKey = versionKey,
                            adminId
                        });
                }
            }
            return null;
        }

        #endregion Max Bet Services

        #region DG Services

        internal async Task<dynamic> DGServicesInsert(List<Lists> request)
        {
            var result = request.OrderBy(x => x.id).ToList();
            for (int i = 0; i <= result.Count(); i += 1000)
            {
                var response = result.OrderBy(x => x.id).Skip(i).Take(1000);
                using (var repository = new DapperRepository<dynamic>(Connection))
                {
                    await repository.AddOrUpdateAsync(StoredProcConsts.Game.DGBettingDetailsInsertUpdate, response);
                }
            }
            return result;
        }

        #endregion DG Services

        #region Sexy Baccarat Services

        internal async Task<dynamic> SexyServicesInsert(List<Transaction> request)
        {
            SexyBaccaratServicesMapping sexyServicesMapping = new SexyBaccaratServicesMapping();
            var result = sexyServicesMapping.Map(request).OrderBy(x => x.Id).ToList();
            for (int i = 0; i <= result.Count(); i += 1000)
            {
                var response = result.Skip(i).Take(1000);
                using (var repository = new DapperRepository<dynamic>(Connection))
                {
                    await repository.AddOrUpdateAsync(StoredProcConsts.Game.SexyBettingDetailsInsert, response);
                }
            }
            return result;
        }

        #endregion Sexy Baccarat Services

        #region SA Services

        internal async Task SAServicesInsert(string request)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                var res = await repository.AddOrUpdateAsync(StoredProcConsts.Game.SABettingDetailsInsert, new { jsonString = request });
            }
        }

        #endregion SA Services

        #region AllBet Services

        internal async Task AllBetServicesInsert(string request)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                var res = await repository.AddOrUpdateAsync(StoredProcConsts.Game.AllBetBettingDetailsInsert, new { jsonString = request });
            }
        }

        #endregion AllBet Services

        #region WM Services

        internal async Task WMServicesInsert(string request)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                var res = await repository.AddOrUpdateAsync(StoredProcConsts.Game.WMBettingDetailsInsert, new { jsonString = request });
            }
        }

        #endregion WM Services

        #region Pragmatic Services

        internal async Task PragmaticServicesInsert(string request)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                var res = await repository.AddOrUpdateAsync(StoredProcConsts.Game.PragmaticBettingDetailsInsert, new { jsonString = request });
            }
        }

        #endregion Pragmatic Services

        #region YEEBET Services

        internal async Task YEEBETServicesInsert(string request)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                var res = await repository.AddOrUpdateAsync(
                    StoredProcConsts.Game.YEEBETBettingDetailsInsert,
                    new
                    {
                        jsonString = request
                    });
            }
        }

        #endregion YEEBET Services

        #region Kiss 918 Player Log Insert

        internal async Task<int> Kiss918PlayerLogInsert(List<PlayerGameLogResult> request, string Username)
        {
            if (request.Count > 0)
            {
                var response = JsonConvert.SerializeObject(request);
                using (var repository = new DapperRepository<dynamic>(Connection))
                {
                    var res = await repository.AddOrUpdateAsync(StoredProcConsts.Game.Kiss918PlayerLogInsert, new { jsonString = response, username = Username });
                }
            }
            return 0;
        }

        #endregion Kiss 918 Player Log Insert

        #region Pussy Player Log Insert

        internal async Task<int> PussyPlayerLogInsert(List<PlayerGameLogResult> request, string Username)
        {
            if (request.Count > 0)
            {
                var response = JsonConvert.SerializeObject(request);
                using (var repository = new DapperRepository<dynamic>(Connection))
                {
                    var res = await repository.AddOrUpdateAsync(StoredProcConsts.Game.PussyPlayerLogInsert, new { jsonString = response, username = Username });
                }
            }
            return 0;
        }

        #endregion Pussy Player Log Insert

        #region Joker Player Log Insert

        internal async Task<int> JokerPlayerLogInsert(JokerPlayerLogResponse request)
        {
            string jackpotResponse = request.Data.Jackpot != null ? JsonConvert.SerializeObject(request.Data.Jackpot) : "[]";
            string gameResponse = request.Data.Game != null ? JsonConvert.SerializeObject(request.Data.Game) : "[]";
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                var res = await repository.AddOrUpdateAsync(StoredProcConsts.Game.JokerPlayerLogInsert, new { JackpotJsonString = jackpotResponse, GameJsonString = gameResponse });
            }
            return 0;
        }

        #endregion Joker Player Log Insert

        #endregion Betting Details Insert

        #region Joker Betting Details Save

        internal async Task<int> JokerBettingDetailsSave(List<Winloss> request)
        {
            for (int i = 0; i <= request.Count(); i += 200)
            {
                var response = request.Skip(i).Take(200);
                using (var repository = new DapperRepository<dynamic>(Connection))
                {
                    await repository.AddOrUpdateAsync(StoredProcConsts.Game.JokerBettingDetailsInsertUpdate, response);
                }
            }
            return 0;
        }

        #endregion Joker Betting Details Save

        #region Joker Hash Genrate

        internal static string GenerateHas(string plantext)
        {
            var byteData = Encoding.UTF8.GetBytes(plantext);
            var byteKey = Encoding.UTF8.GetBytes(GameConst.Joker.Secret);
            HMACSHA1 hmac = new HMACSHA1(byteKey);
            var res = Convert.ToBase64String(hmac.ComputeHash(byteData));
            string resencode = HttpUtility.UrlEncode(res);
            return resencode;
        }

        #endregion Joker Hash Genrate

        #region 918 kiss game genrate random password

        public static string RandomPassword(int size = 0)
        {
            Random random = new Random();
            StringBuilder builder = new StringBuilder();
            builder.Append(RandomString(3, false));
            builder.Append(RandomString(2, true));
            builder.Append("@");
            builder.Append(random.Next(100, 999));
            return builder.ToString();
        }

        public static string RandomString(int size, bool lowerCase)
        {
            StringBuilder builder = new StringBuilder();
            Random random = new Random();
            char ch;
            for (int i = 0; i < size; i++)
            {
                ch = Convert.ToChar(Convert.ToInt32(Math.Floor(26 * random.NextDouble() + 65)));
                builder.Append(ch);
            }
            if (lowerCase)
                return builder.ToString().ToLower();
            return builder.ToString();
        }

        #endregion 918 kiss game genrate random password

        #region Get Calculate Rebate

        public async Task<List<RebateCalculateResponse>> GetCalculateData(RebateCalculateRequest request)
        {
            using (var GetProfileRepository = new DapperRepository<RebateCalculateResponse>(Connection))
            {
                var calculateData = await GetProfileRepository.GetDataAsync(StoredProcConsts.Game.GameRebateCalculate, new { request.FromDate, request.ToDate, request.Rebate, request.GameType });
                return calculateData.ToList();
            }
        }

        #endregion Get Calculate Rebate

        #region Main Wallet Deposit & Withdraw

        public async Task<MainWalletTransferResponse> RebateMainWalletDepositWithdraw(string Username, decimal Amount, string Method, string GameType = null, string AdminId = null)
        {
            using (var repository = new DapperRepository<MainWalletTransferResponse>(Connection))
            {
                var response = await repository.FindAsync(
                    StoredProcConsts.Game.RebateMainWalletDepositWithdraw,
                    new
                    {
                        Username,
                        Amount,
                        Method,
                        GameType,
                        AdminId
                    });
                return response;
            }
        }

        #endregion Main Wallet Deposit & Withdraw

        #region Get Game Category

        public async Task<dynamic> GetCategory()
        {
            using (var GetProfileRepository = new DapperRepository<dynamic>(Connection))
            {
                dynamic getCategory = await GetProfileRepository.GetDataAsync(StoredProcConsts.Game.GetGameCategory, new { });
                return getCategory;
            }
        }

        #endregion Get Game Category

        #region Game Rebate

        internal async Task<dynamic> GameRebate(string FromDate, string ToDate, string gameType, decimal totalUser, decimal betAmount, decimal rolling, decimal commAmount, string jsonData, string adminId = null)
        {
            using (var GetRepository = new DapperRepository<dynamic>(Connection))
            {
                dynamic users = await GetRepository.FindAsync(
                    StoredProcConsts.Game.GameRebate,
                    new
                    {
                        FromDate,
                        ToDate,
                        gameType,
                        totalUser,
                        betAmount,
                        rolling,
                        commAmount,
                        jsonData,
                        adminId
                    });

                return users;
            }
        }

        #endregion Game Rebate

        #region Funtionality of Rebate

        public async Task<List<RebateCalculateResponse>> RebateOperation(RebateCalculateRequest request, string adminId = null)
        {
            var data = await GetCalculateData(request);

            if (data.Count == 0 || data.Count < 0)
                return data;

            var CommTotal = data.Select(x => x.CommAmount).Sum(x => x);
            var BetTotal = data.Select(x => x.Bet).Sum(x => x);
            var Rollingtotal = data.Select(x => x.Rolling).Sum(x => x);

            var responseList = new List<RebateCalculateResponse>();

            using (var account_help = new AccountHelpers(Connection))
            {
                foreach (var d in data)
                {
                    var result = await RebateMainWalletDepositWithdraw(Username: d.Username, Amount: d.CommAmount, Method: "Deposit", GameType: request.GameType, AdminId: adminId);
                    if (result.ErrorCode == 0)
                    {
                        responseList.Add(d);
                        try
                        {
                            var Message = "Hi MR/MS {0}, %0aWe are from WB333 Customer Service, Kindly inform :%0aWe had credited DAILY REBATE RM{1} in your Main wallet.";
                            await account_help.SendSMSAPI(d.MobileNo, string.Format(Message, d.Username, Math.Round(d.CommAmount, 2)));
                        }
                        catch (Exception ex)
                        {
                        }
                    }
                }
            }

            data = data.Where(s => responseList.Any(l => (l.GameName == s.GameName && s.APIUsername == l.APIUsername))).ToList();

            var jsonData = JsonConvert.SerializeObject(data);
            await GameRebate(request.FromDate, request.ToDate, request.GameType, data.Count, BetTotal, Rollingtotal, CommTotal, jsonData, adminId: adminId);

            return responseList;
        }

        #endregion Funtionality of Rebate

        #region Rebate Delete

        internal async Task<dynamic> GameRebateDelete(string RebateId, string adminId = null)
        {
            using (var GetRepository = new DapperRepository<dynamic>(Connection))
            {
                dynamic users = await GetRepository.FindAsync(
                    StoredProcConsts.Game.GameRebateDelete,
                    new
                    {
                        RebateId,
                        adminId
                    });
                return users;
            }
        }

        #endregion Rebate Delete

        #region rebate List

        internal async Task<dynamic> getRebateList(string FromDate, string ToDate, string gameName)
        {
            using (var GetRepository = new DapperRepository<dynamic>(Connection))
            {
                dynamic users = await GetRepository.GetDataAsync(StoredProcConsts.Game.GetRebateList, new { FromDate, ToDate, gameName });
                return users;
            }
        }

        #endregion rebate List

        #region rebate Details List

        internal async Task<List<RebateCalculateResponse>> getRebateDetailsList(string RebateId)
        {
            using (var GetRepository = new DapperRepository<RebateCalculateResponse>(Connection))
            {
                var users = await GetRepository.GetDataAsync(StoredProcConsts.Game.GetRebateDetailsList, new { RebateId });
                return users.ToList();
            }
        }

        #endregion rebate Details List

        #region User Rebate History

        internal async Task<List<UserRebateHistoryResponse>> getUserRebateHistory(GlobalGetWithPaginationRequest request)
        {
            using (var GetRepository = new DapperRepository<UserRebateHistoryResponse>(Connection))
            {
                var users = await GetRepository.GetDataAsync(StoredProcConsts.Game.UsersRebateHistory, new { request.UserId, request.FromDate, request.ToDate, request.PageNo, request.PageSize });
                return users.ToList();
            }
        }

        #endregion User Rebate History

        #region All Game rebate Deposit Method

        public static string genrate()
        {
            DateTime UnixEpoch = new DateTime(1970, 1, 1, 0, 0, 0, 0, DateTimeKind.Local);
            string temp = ((long)DateTime.UtcNow.Subtract(UnixEpoch).TotalMilliseconds).ToString();
            return temp.Substring(1);
        }

        #region Joker Game Deposit

        public async Task<List<RebateCalculateResponse>> JokerDeposit(List<RebateCalculateResponse> response)
        {
            var responseList = new List<RebateCalculateResponse>();
            foreach (var res in response)
            {
                dynamic apiResponse = JObject.Parse(await JokerDepsoitWithdrawMethod(res.APIUsername, res.CommAmount));
                if (apiResponse.Message == null)
                    responseList.Add(res);
            }
            return responseList;
        }

        #endregion Joker Game Deposit

        #region Playtech Game Deposit

        public async Task<List<RebateCalculateResponse>> PlaytechDeposit(List<RebateCalculateResponse> response, IHostingEnvironment environment)
        {
            var responseList = new List<RebateCalculateResponse>();
            foreach (var res in response)
            {
                dynamic apiResponse = JObject.Parse(await PlaytechDepsoitMehtod(res.APIUsername, res.CommAmount, environment));
                if (apiResponse.result == "Deposit OK")
                    responseList.Add(res);
            }
            return responseList;
        }

        #endregion Playtech Game Deposit

        #region AG Game Deposit

        public async Task<List<RebateCalculateResponse>> AGDeposit(List<RebateCalculateResponse> response)
        {
            var responseList = new List<RebateCalculateResponse>();
            foreach (var res in response)
            {
                var apiResponse = await AGDepositWithdrawMethod(res.APIUsername, res.CommAmount, GameConst.AG.Deposit);
                if (apiResponse.error_code == 0)
                    responseList.Add(res);
            }
            return responseList;
        }

        #endregion AG Game Deposit

        #region Kiss918 Game Deposit

        public async Task<List<RebateCalculateResponse>> Kiss918Deposit(List<RebateCalculateResponse> response)
        {
            var responseList = new List<RebateCalculateResponse>();
            foreach (var res in response)
            {
                dynamic apiResponse = JObject.Parse(await Kiss918DepsoitWithdrawMehtod(res.AnotherId, res.CommAmount));
                if (apiResponse.success == true)
                    responseList.Add(res);
            }
            return responseList;
        }

        #endregion Kiss918 Game Deposit

        #region Kiss918 Game Deposit

        public async Task<List<RebateCalculateResponse>> Pussy888Deposit(List<RebateCalculateResponse> response)
        {
            var responseList = new List<RebateCalculateResponse>();
            foreach (var res in response)
            {
                var apiResponse = await Pussy888GameHelpers.CallTransferAPI(res.AnotherId, res.CommAmount);
                if (apiResponse.code == 0)
                    responseList.Add(res);
            }
            return responseList;
        }

        #endregion Kiss918 Game Deposit

        #region M8 Game Deposit

        public async Task<List<RebateCalculateResponse>> M8Deposit(List<RebateCalculateResponse> response)
        {
            var responseList = new List<RebateCalculateResponse>();

            foreach (var res in response)
            {
                var apiResponse = XDocument.Parse(await M8DepsoitWithdrawMethod(res.APIUsername, res.CommAmount, GameConst.M8.Deposit));
                if (apiResponse.Descendants("errcode").Single().Value == "0")
                    responseList.Add(res);
            }

            return responseList;
        }

        #endregion M8 Game Deposit

        #region MaxBet Game Deposit

        public async Task<List<RebateCalculateResponse>> MaxBetDeposit(List<RebateCalculateResponse> response)
        {
            var responseList = new List<RebateCalculateResponse>();
            foreach (var res in response)
            {
                var apiResponse = await MaxBetGameHelper.CallMaxbetDepsoitWithdrawAPI(res.AnotherId, res.CommAmount, 1);
                if (apiResponse.ErrorCode == 0)
                    responseList.Add(res);
            }
            return responseList;
        }

        #endregion MaxBet Game Deposit

        #region Mega888 Game Deposit and Withdraw

        public async Task<List<RebateCalculateResponse>> MegaDepositWithdraw(List<RebateCalculateResponse> response, int method = 0)
        {
            var responseList = new List<RebateCalculateResponse>();
            foreach (var res in response)
            {
                if (method == 1)
                {
                    //withdow
                    var apiResponse = await Mega888GameHelpers.CallWithdrawDepositAPI(res.AnotherId, -Math.Abs(res.CommAmount));
                    if (apiResponse.error == null)
                        responseList.Add(res);
                }

                if (method == 0)
                {
                    //deposit
                    var apiResponse = await Mega888GameHelpers.CallWithdrawDepositAPI(res.AnotherId, res.CommAmount);
                    if (apiResponse.error == null)
                        responseList.Add(res);
                }
            }
            return responseList;
        }

        #endregion Mega888 Game Deposit and Withdraw

        #region DG Game Deposit and Withdraw

        public async Task<List<RebateCalculateResponse>> DGDepositWithdraw(List<RebateCalculateResponse> response, int method = 0)
        {
            var responseList = new List<RebateCalculateResponse>();
            foreach (var res in response)
            {
                if (method == 1)
                {
                    var apiResponse = await DGGameHelpers.CallWithdrawDepsoitAPI(res.APIUsername, "-" + res.CommAmount);
                    if (apiResponse.codeId == 0)
                        responseList.Add(res);
                }

                if (method == 0)
                {
                    var apiResponse = await DGGameHelpers.CallWithdrawDepsoitAPI(res.APIUsername, res.CommAmount.ToString());
                    if (apiResponse.codeId == 0)
                        responseList.Add(res);
                }
            }
            return responseList;
        }

        #endregion DG Game Deposit and Withdraw

        #region SA Game Deposit and Withdraw

        public async Task<List<RebateCalculateResponse>> SADepositWithdraw(List<RebateCalculateResponse> response, int method = 0)
        {
            var responseList = new List<RebateCalculateResponse>();
            foreach (var res in response)
            {
                if (method == 1)
                {
                    var apiResponse = await SAGameHelpers.CallAPIWithdraw(res.APIUsername, res.CommAmount);
                    if (apiResponse.Descendants("ErrorMsgId").Single().Value == "0")
                        responseList.Add(res);
                }

                if (method == 0)
                {
                    var apiResponse = await SAGameHelpers.CallAPIDeposit(res.APIUsername, res.CommAmount);
                    if (apiResponse.Descendants("ErrorMsgId").Single().Value == "0")
                        responseList.Add(res);
                }
            }
            return responseList;
        }

        #endregion SA Game Deposit and Withdraw

        #region Sexy Game Deposit and Withdraw

        public async Task<List<RebateCalculateResponse>> SexyDepositWithdraw(List<RebateCalculateResponse> response, int method = 0)
        {
            var responseList = new List<RebateCalculateResponse>();
            foreach (var res in response)
            {
                if (method == 1)
                {
                    var apiResponse = await SexyBaccaratGameHelpers.CallWithdrawAPI(res.APIUsername, res.CommAmount);
                    if (apiResponse.status == "0000")
                        responseList.Add(res);
                }

                if (method == 0)
                {
                    var apiResponse = await SexyBaccaratGameHelpers.CallDepositAPI(res.APIUsername, res.CommAmount);
                    if (apiResponse.status == "0000")
                        responseList.Add(res);
                }
            }
            return responseList;
        }

        #endregion Sexy Game Deposit and Withdraw

        #endregion All Game rebate Deposit Method

        #region All game rebate Withdraw Mehtods

        #region Joker game Withdraw

        public async Task JokerWithdraw(List<RebateCalculateResponse> response)
        {
            foreach (var res in response)
            {
                await JokerDepsoitWithdrawMethod(res.APIUsername, -Math.Abs(res.CommAmount));
            }
        }

        #endregion Joker game Withdraw

        #region 918Kiss game Withdraw

        public async Task Kiss918Withdraw(List<RebateCalculateResponse> response)
        {
            foreach (var res in response)
            {
                await Kiss918DepsoitWithdrawMehtod(res.AnotherId, -Math.Abs(res.CommAmount));
            }
        }

        #endregion 918Kiss game Withdraw

        #region Pussy888 game Withdraw

        public async Task Pussy888Withdraw(List<RebateCalculateResponse> response)
        {
            foreach (var res in response)
            {
                await Pussy888GameHelpers.CallTransferAPI(res.AnotherId, -Math.Abs(res.CommAmount));
            }
        }

        #endregion Pussy888 game Withdraw

        #region AG game Withdraw

        public async Task AGWithdraw(List<RebateCalculateResponse> response)
        {
            foreach (var res in response)
            {
                await AGDepositWithdrawMethod(res.APIUsername, res.CommAmount, GameConst.AG.Withdraw);
            }
        }

        #endregion AG game Withdraw

        #region Playtech game Withdraw

        public async Task PlaytechWithdraw(List<RebateCalculateResponse> response, IHostingEnvironment environment)
        {
            foreach (var res in response)
            {
                await PlaytechWithdrawMehtod(res.APIUsername, res.CommAmount, environment);
            }
        }

        #endregion Playtech game Withdraw

        #region M8 game Withdraw

        public async Task<int> M8Withdraw(List<RebateCalculateResponse> response)
        {
            foreach (var res in response)
            {
                await M8DepsoitWithdrawMethod(res.APIUsername, res.CommAmount, GameConst.M8.Withdraw);
            }
            return 0;
        }

        #endregion M8 game Withdraw

        #region MaxBet game Withdraw

        public async Task<int> MaxBetWithdraw(List<RebateCalculateResponse> response)
        {
            foreach (var res in response)
            {
                MaxBetGameHelper.CallMaxbetDepsoitWithdrawAPI(res.AnotherId, res.CommAmount, 0);
            }
            return 0;
        }

        #endregion MaxBet game Withdraw

        #endregion All game rebate Withdraw Mehtods

        #region Call Third Party API's

        public static async Task<string> CallThirdPartyApi(string url, StringContent stringContent = null)
        {
            try
            {
                var httpResponseMessage = await client.PostAsync(url, stringContent);
                var response = await httpResponseMessage.Content.ReadAsStringAsync();
                return response;
            }
            catch (Exception ex)
            {
                return String.Empty;
            }
        }

        #endregion Call Third Party API's

        #region Call Get Third Party API's

        public static async Task<string> CallGetMethodThirdPartyApi(string url)
        {
            try
            {
                var httpResponseMessage = await client.GetAsync(url);
                var response = await httpResponseMessage.Content.ReadAsStringAsync();
                return response;
            }
            catch (Exception ex)
            {
                return String.Empty;
            }
        }

        #endregion Call Get Third Party API's

        #region User wallet Balance Update

        public async Task<GameWalletBalanceResponse> GetWaletUserBalance(string sp_name, string m8wallet = null, string playtechwallet = null, string agwallet = null, string _918kisswalet = null, string jokerwallet = null, string m8walletName = null, string playtechwalletName = null, string agwalletName = null, string _918kisswaletName = null, string jokerwalletName = null, string maxbetWaletName = null, string maxbetAmount = null, string mega888WaletName = null, string mega888Amount = null, string userid = null)
        {
            using (var repository = new DapperRepository<GameWalletBalanceResponse>(Connection))
            {
                var result = await repository.FindAsync(sp_name, new { UserId = userid, M8WalletName = m8walletName, M8Amount = m8wallet, PlaytechWalletName = playtechwalletName, PlaytechAmount = playtechwallet, AGWalletName = agwalletName, AGAmount = agwallet, _918WalletName = _918kisswaletName, _918Amount = _918kisswalet, JokerWalletName = jokerwalletName, JokerAmount = jokerwallet, MaxBetWalletName = maxbetWaletName, MaxBetAmount = maxbetAmount, Mega888WalletName = mega888WaletName, Mega888Amount = mega888Amount });
                return result;
            }
        }

        #endregion User wallet Balance Update

        #region Game Deposit Withdraw Method

        #region Joker game Withdraw & Deposit

        public async Task<dynamic> JokerDepsoitWithdrawMethod(string userName, decimal amount)
        {
            DateTime UnixEpoch = new DateTime(1970, 1, 1, 0, 0, 0, 0, DateTimeKind.Local);
            var temp = (long)DateTime.UtcNow.Subtract(UnixEpoch).TotalSeconds;

            string bodyParameter = $"Amount={amount}&Method=TC&Timestamp={temp}&Username={userName}";

            var url = $"{GameConst.Joker.jokerBaseUrl}?AppID={GameConst.Joker.AppID}&Signature={GenerateHas(bodyParameter)}";

            var stringContent = new StringContent(bodyParameter, Encoding.UTF8, "application/x-www-form-urlencoded");

            return await CallThirdPartyApi(url, stringContent);
        }

        #endregion Joker game Withdraw & Deposit

        #region 918Kiss game Withdraw & Deposit

        public async Task<dynamic> Kiss918DepsoitWithdrawMehtod(string kiss918UserName, decimal amount)
        {
            var timestamp = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();

            var DisableUrl = $"{GameConst.Kiss918.baseURL}account.ashx?" +
                $"action={GameConst.Kiss918.disableAccount}" +
                $"&userName={kiss918UserName}" +
                $"&time={timestamp}" +
                $"&authcode={GameConst.Kiss918.authcode}" +
                $"&sign={SecurityHelpers.MD5EncrptText(GameConst.Kiss918.authcode.ToLower() + kiss918UserName + timestamp + GameConst.Kiss918.SecretKey.ToLower()).ToUpper()}";
            await CallThirdPartyApi(DisableUrl, null);

            var url = $"{GameConst.Kiss918.baseURL}setScore.ashx?" +
                            $"action={GameConst.Kiss918.WidthdrawDeposit}" +
                             $"&scoreNum={amount}" +
                            $"&userName={kiss918UserName}" +
                            $"&ActionUser={kiss918UserName}" +
                            $"&ActionIp=192.0.1" +
                            $"&time={timestamp}" +
                            $"&authcode={GameConst.Kiss918.authcode}" +
                            $"&sign={SecurityHelpers.MD5EncrptText(GameConst.Kiss918.authcode.ToLower() + kiss918UserName + timestamp + GameConst.Kiss918.SecretKey.ToLower()).ToUpper()}";

            return await CallThirdPartyApi(url, null);
        }

        #endregion 918Kiss game Withdraw & Deposit

        #region AG game Withdraw & Deposit

        public async Task<AgWithdrawDepsoitResponse> AGDepositWithdrawMethod(string userName, decimal amount, string Type)
        {
            var url = $"{GameConst.AG.baseURL}{GameConst.AG.Action}" +
                $"?vendor_id={GameConst.AG.VendorId}" +
                $"&operator_id={GameConst.AG.OperatorId}" +
                $"&user_id={userName}" +
                $"&currency={GameConst.AG.Currency}" +
                $"&credit={amount}" +
                $"&billno={genrate()}" +
                $"&type={Type}";

            return JsonConvert.DeserializeObject<AgWithdrawDepsoitResponse>(await CallThirdPartyApi(url, null));
        }

        #endregion AG game Withdraw & Deposit

        #region Playtech game Withdraw

        public async Task<dynamic> PlaytechWithdrawMehtod(string userName, decimal amount, IHostingEnvironment environment)
        {
            var logoutUrl = $"{GameConst.Playtech.playtechBaseUrl}logout" +
                $"?playername={userName.ToUpper()}";

            var url = $"{GameConst.Playtech.playtechBaseUrl}withdraw" +
                $"?playername={userName.ToUpper()}" +
                $"&amount={Math.Round(amount, 2)}" +
                $"&adminname={GameConst.Playtech.adminName}";

            DefaultHelper defaultHelper = new DefaultHelper(environment);
            await defaultHelper.PlaytechAPICertificate(logoutUrl, false);
            return await defaultHelper.PlaytechAPICertificate(url, false);
        }

        #endregion Playtech game Withdraw

        #region M8 game Withdraw & Deposit

        public async Task<string> M8DepsoitWithdrawMethod(string userName, decimal amount, string Method)
        {
            var url = $"{GameConst.M8.baseURL}" +
                $"?secret={GameConst.M8.Secret}" +
                $"&agent={GameConst.M8.agent}" +
                $"&username={userName}" +
                $"&action={Method}" +
                $"&serial={Guid.NewGuid().ToString()}" +
                $"&amount={amount}";

            return await CallThirdPartyApi(url, null);
        }

        #endregion M8 game Withdraw & Deposit

        #region Playtech game Depsoit

        public async Task<dynamic> PlaytechDepsoitMehtod(string userName, decimal amount, IHostingEnvironment environment)
        {
            var logoutUrl = $"{GameConst.Playtech.playtechBaseUrl}logout" +
                $"?playername={userName.ToUpper()}";

            var url = $"{GameConst.Playtech.playtechBaseUrl}deposit" +
                $"?playername={userName.ToUpper()}" +
                $"&amount={Math.Round(amount, 2)}" +
                $"&adminname={GameConst.Playtech.adminName}";

            DefaultHelper defaultHelper = new DefaultHelper(environment);
            await defaultHelper.PlaytechAPICertificate(logoutUrl, false);
            return await defaultHelper.PlaytechAPICertificate(url, false);
        }

        #endregion Playtech game Depsoit

        #endregion Game Deposit Withdraw Method

        #region User Balance Restore

        public async Task BalanceRestore(
                    string userId,
                    string Addedby,
                    decimal mainBalance,
                    decimal AGBalance,
                    decimal DGBalance,
                    decimal PlaytechBalance,
                    decimal Kiss918Balance,
                    decimal MaxbetBalance,
                    decimal M8Balance,
                    decimal JokerBalance,
                    decimal Mega888Balance,
                    decimal SexyBaccaratBalance,
                    decimal SABalance,
                    decimal PussyBalance,
                    decimal AllbetBalance,
                    decimal WMBalance,
                    decimal PragmaticBalance
            )
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                await repository.AddOrUpdateAsync(StoredProcConsts.Game.UsersBalanceRestore, new { userId, Addedby, mainBalance, Mega888Balance, JokerBalance, M8Balance, MaxbetBalance, Kiss918Balance, DGBalance, AGBalance, PlaytechBalance, SexyBaccaratBalance, SABalance, PussyBalance, AllbetBalance, WMBalance, PragmaticBalance });
            }
        }

        #endregion User Balance Restore

        #region Global Parameter Select

        public async Task<GlobalValuesResponse> UserGetBalanceInfo()
        {
            using (var Repository = new DapperRepository<GlobalValuesResponse>(Connection))
            {
                return await Repository.FindAsync(StoredProcConsts.Account.GameBalanceInfo, new { });
            }
        }

        #endregion Global Parameter Select

        internal async Task ManuallyExpieryPromotion(PromotionExpieryManuallyRequest request)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                await repository.AddOrUpdateAsync(StoredProcConsts.Game.ManuallyPromotionExpiery, new { request.UserId, request.PromotionId });
            }
        }

        internal async Task<dynamic> LastUpdatedList()
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                var result = await repository.GetDataAsync(StoredProcConsts.Game.GameLastBettingUpdate, new { });
                return result;
            }
        }

        internal async Task<dynamic> RestoreHistory(string userId)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                var result = await repository.GetDataAsync(StoredProcConsts.Game.RestoreList, new { userId });
                return result;
            }
        }

        internal async Task<List<DailyTurnoverResponse>> DailyTurnover(string userId)
        {
            using (var repository = new DapperRepository<DailyTurnoverResponse>(Connection))
            {
                var result = await repository.GetDataAsync(StoredProcConsts.Game.DailyTurnover, new { userId });
                return result.ToList();
            }
        }

        internal async Task<dynamic> GetSupportGameOfUser(string userId)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                var result = await repository.GetDataAsync(StoredProcConsts.Game.UserPromotionGameSupportDetails, new { userId });
                return result.ToList();
            }
        }

        internal async Task<List<UsersResponseGameRegisterResponse>> PragmaticNotRegisterUsers()
        {
            using (var repository = new DapperRepository<UsersResponseGameRegisterResponse>(Connection))
            {
                var result = await repository.GetDataAsync(StoredProcConsts.Game.PragmaticGameNotRegistredUsers, new { });
                return result.ToList();
            }
        }

        #region update download link

        internal async Task<dynamic> UpdateLink(AppDownloadLinkUpdateRequest request)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                dynamic link = await repository.AddOrUpdateAsync(StoredProcConsts.Game.DownloadLink_Update, new { request.Id, request.Link, request.AdminId });
                return link;
            }
        }

        #endregion update download link

        #region Download Link List

        internal async Task<List<AppDownloadLinkResponse>> GetDownloadLinkList(BaseUrlConfigs baseUrl)
        {
            using (var repository = new DapperRepository<AppDownloadLinkResponse>(Connection))
            {
                var linkList = await repository.GetDataAsync(StoredProcConsts.Game.DownloadLink_Select, new { });
                var result = linkList.Where(x => x.Comment == "Applink").ToList();
                result.ForEach(list =>
                                list.BarcodeImage = $"{baseUrl.ImageBase}{baseUrl.AppDownloadImage}/{list.Id}.jpg"
                    );
                return result;
            }
        }

        #endregion Download Link List

        #region Check game Register or not in game

        public async Task<dynamic> CheckGameRegister(string gameName = null, string userId = null)
        {
            using (var GetProfileRepository = new DapperRepository<dynamic>(Connection))
            {
                var result = await GetProfileRepository.GetDataAsync(StoredProcConsts.Game.GameRegister, new { });
                return result;
            }
        }

        #endregion Check game Register or not in game

        #region Global Variable Update

        internal async Task M8DefaultLimitUpdate(M8SetLimitRequest request)
        {
            var m8Mapping = new M8LimitMapping();
            var response = m8Mapping.Map(request).ToList();
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                await repository.AddOrUpdateAsync(StoredProcConsts.Global.UpdateGlobalParamters, response);
            }
        }

        #endregion Global Variable Update

        #region Global Variable Select

        //internal async Task<M8SetLimitRequest> M8DefaultLimitSelect()
        //{
        //    using (var repository = new DapperRepository<M8SetLimitRequest>(Connection))
        //    {
        //        return await repository.FindAsync(StoredProcConsts.Game.M8GetLimit, new { });
        //    }
        //}

        #endregion Global Variable Select

        #region M8 User reset limit

        internal async Task M8LimitReset(bool SetLimit, string adminId = null)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                await repository.GetDataAsync(
                    StoredProcConsts.M8.M8SetLimit,
                    new
                    {
                        SetLimit,
                        adminId
                    });
            }
        }

        #endregion M8 User reset limit

        #region set setlimit true of M8 User

        internal async Task M8LimitSet(List<M8UsersSetBettingLimitsRequest> request)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                await repository.AddOrUpdateAsync(StoredProcConsts.M8.M8SetLimit, request);
            }
        }

        #endregion set setlimit true of M8 User

        #region Get All Users for M8 Limits

        internal async Task<List<M8UsersLimitResponse>> GetAllM8UsersSetLimit()
        {
            using (var repository = new DapperRepository<M8UsersLimitResponse>(Connection))
            {
                var result = await repository.GetDataAsync(StoredProcConsts.M8.M8UsesSetLimit, new { });
                return result.ToList();
            }
        }

        #endregion Get All Users for M8 Limits

        #region Get Main Wallet Balance

        public async Task<List<UserWalletResponse>> GetAllWalletBalance(string sp_name, string UserId, string WalletName = null)
        {
            using (var repository = new DapperRepository<UserWalletResponse>(Connection))
            {
                var result = await repository.GetDataAsync(sp_name, new { UserId, WalletName });
                return result.ToList(); ;
            }
        }

        #endregion Get Main Wallet Balance

        #region GET ALL GAME USERS

        public async Task<List<AllGameUsernameResponse>> GetAllGameUser(string GameName)
        {
            using (var repository = new DapperRepository<AllGameUsernameResponse>(Connection))
            {
                var result = await repository.GetDataAsync(StoredProcConsts.Game.GetAllGameUsers, new { GameName });
                return result.ToList(); ;
            }
        }

        #endregion GET ALL GAME USERS

        #region GET ALL 918 Kiss GAME USERS

        public async Task<List<Kiss918GamePasswordResetResponse>> GetAllKiss918Usersname()
        {
            using (var repository = new DapperRepository<Kiss918GamePasswordResetResponse>(Connection))
            {
                var result = await repository.GetDataAsync(StoredProcConsts.Game.Kiss918UserPasswordResetSelect, new { });
                return result.ToList(); ;
            }
        }

        #endregion GET ALL 918 Kiss GAME USERS

        #region Get users List of Promotion Expiery

        internal async Task<List<ExpieryPromotionResponse>> GetListPromotionExpiery()
        {
            using (var repository = new DapperRepository<ExpieryPromotionResponse>(Connection))
            {
                var result = await repository.GetDataAsync(StoredProcConsts.Game.ExpieryPromotionList, new { });
                return result.ToList();
            }
        }

        #endregion Get users List of Promotion Expiery

        #region Get Betting List by Username

        internal async Task<dynamic> GetListBettingDetails(GameBettingDetailsRequest request)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                dynamic result;
                switch (request.GameName)
                {
                    case "AG":
                        result = await repository.GetDataAsync(StoredProcConsts.Game.BettingDetails_AG, new { request.UserId, request.FromDate, request.ToDate });
                        break;

                    case "DG":
                        result = await repository.GetDataAsync(StoredProcConsts.Game.BettingDetails_DG, new { request.UserId, request.FromDate, request.ToDate });
                        break;

                    case "JOKER":
                        result = await repository.GetDataAsync(StoredProcConsts.Game.BettingDetails_Joker, new { request.UserId, request.FromDate, request.ToDate });
                        break;

                    case "M8":
                        result = await repository.GetDataAsync(StoredProcConsts.Game.BettingDetails_M8, new { request.UserId, request.FromDate, request.ToDate });
                        break;

                    case "MAXBET":
                        result = await repository.GetDataAsync(StoredProcConsts.Game.BettingDetails_Maxbet, new { request.UserId, request.FromDate, request.ToDate });
                        break;

                    case "MEGA888":
                        result = await repository.GetDataAsync(StoredProcConsts.Game.BettingDetails_Mega888, new { request.UserId, request.FromDate, request.ToDate });
                        break;

                    case "918KISS":
                        result = await repository.GetDataAsync(StoredProcConsts.Game.BettingDetails_Kiss918, new { request.UserId, request.FromDate, request.ToDate });
                        break;

                    case "SA":
                        result = await repository.GetDataAsync(StoredProcConsts.Game.BettingDetails_SA, new { request.UserId, request.FromDate, request.ToDate });
                        break;

                    case "SEXYBACCARAT":
                        result = await repository.GetDataAsync(StoredProcConsts.Game.BettingDetails_Sexy, new { request.UserId, request.FromDate, request.ToDate });
                        break;

                    case "PUSSY":
                        result = await repository.GetDataAsync(StoredProcConsts.Game.BettingDetails_Pussy, new { request.UserId, request.FromDate, request.ToDate });
                        break;

                    case "PLAYTECH":
                        result = await repository.GetDataAsync(StoredProcConsts.Game.BettingDetails_Playtech, new { request.UserId, request.FromDate, request.ToDate });
                        break;

                    case "ALLBET":
                        result = await repository.GetDataAsync(StoredProcConsts.Game.BettingDetails_AllBet, new { request.UserId, request.FromDate, request.ToDate });
                        break;

                    case "WM":
                        result = await repository.GetDataAsync(StoredProcConsts.Game.BettingDetails_WM, new { request.UserId, request.FromDate, request.ToDate });
                        break;

                    default:
                        result = null;
                        break;
                }

                return result;
            }
        }

        #endregion Get Betting List by Username

        #region 918 Kiss game password reset

        internal async Task<Kiss918PasswordResetResponse> Kiss918GamePasswordReset(ProfileResponse request, string NewPassword)
        {
            var timestamp = DateTimeOffset.UtcNow.ToUnixTimeMilliseconds();
            var url = $"{GameConst.Kiss918.baseURL}account.ashx?action=editUser" +
                   $"&userName={request.UserName918}" +
                   $"&OldPassWd={request.Password918}" +
                   $"&PassWd={NewPassword}" +
                   $"&Name={request.UserName}" +
                   $"&time={timestamp}" +
                   $"&authcode={GameConst.Kiss918.authcode}" +
                   $"&sign={SecurityHelpers.MD5EncrptText(GameConst.Kiss918.authcode.ToLower() + request.UserName918 + timestamp + GameConst.Kiss918.SecretKey.ToLower()).ToUpper()}" +
                   $"&pwdtype=1";
            var response = JsonConvert.DeserializeObject<Kiss918PasswordResetResponse>(await GameHelpers.CallThirdPartyApi(url));
            return response;
        }

        #endregion 918 Kiss game password reset

        #region KISS918 game Password Status Update

        internal async Task ResetPasswordStatusUpdate(bool ResetPassword, string RowId)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                await repository.AddOrUpdateAsync(StoredProcConsts.Global.ResetPasswordStatusUpdate, new { ResetPassword, RowId });
            }
        }

        #endregion KISS918 game Password Status Update

        public async Task<List<BettingSummerySelectResponse>> BettingSummerySelect(GlobalGetWithPaginationRequest request)
        {
            using (var repository = new DapperRepository<BettingSummerySelectResponse>(Connection))
            {
                var result = await repository.GetDataAsync(StoredProcConsts.Game.BettingSummerySelect, new { request.UserId, request.FromDate, request.ToDate, request.PageNo, request.PageSize });
                return result.ToList();
            }
        }

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

        #endregion House Keeping
    }
}
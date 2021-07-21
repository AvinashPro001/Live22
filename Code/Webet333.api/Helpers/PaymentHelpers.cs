using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Webet333.dapper;
using Webet333.models.Configs;
using Webet333.models.Constants;
using Webet333.models.Request.Payments;
using Webet333.models.Response.Payments;
using Webet333.models.Response.TransferMoney;

namespace Webet333.api.Helpers
{
    public class PaymentHelpers : IDisposable
    {
        #region variable

        private string Connection = string.Empty;

        public PaymentHelpers(string Connection)
        {
            this.Connection = Connection;
        }

        #endregion variable

        #region Get Wallet Type

        public async Task<dynamic> DropdownDeposit(BaseUrlConfigs baseUrl, string UniqueId, string Role, bool Restricted = false)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                var result = await repository.GetMultiDataAsync(StoredProcConsts.Payments.WalletTypes, new { Restricted, UniqueId, Role });
                List<dynamic> bankDetails = result.Read<dynamic>();
                if (bankDetails != null && bankDetails.Count > 0)
                {
                    bankDetails.ForEach(bank => bank.bankLogo = (bank.bankLogo != null && !string.IsNullOrEmpty(bank.bankLogo)) ? $"{baseUrl.ImageBase}{baseUrl.BankImage}/{bank.id}{bank.bankLogo}" : "");
                    bankDetails.ForEach(bank => bank.bankIconLogo = (bank.bankIconLogo != null && !string.IsNullOrEmpty(bank.bankIconLogo)) ? $"{baseUrl.ImageBase}{baseUrl.AdminBankIconImage}/{bank.id}{bank.bankIconLogo}" : "");
                }
                List<DepositMethod> depositMethods = result.Read<DepositMethod>();
                depositMethods = depositMethods.Where(x => x.Restricted == false).ToList();
                var walletTypes = result.Read<dynamic>();
                //List<dynamic> promotions = result.Read<dynamic>();
                //if (promotions != null && promotions.Count > 0)
                //    promotions.ForEach(promotion => promotion.bannerImage = (promotion.bannerImage != null && !string.IsNullOrEmpty(promotion.bannerImage)) ? $"{baseUrl.ImageBase}{baseUrl.PromotionImage}/{promotion.id}{promotion.bannerImage}" : "");
                return new { bankDetails, depositMethods, walletTypes };
            }
        }

        public async Task<dynamic> DropdownBonus(BaseUrlConfigs baseUrl, string UniqueId, string Role, bool Restricted = false)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                var result = await repository.GetMultiDataAsync(StoredProcConsts.Payments.WalletTypes, new { Restricted, UniqueId, Role });
                List<dynamic> bankDetails = result.Read<dynamic>();
                if (bankDetails != null && bankDetails.Count > 0)
                    bankDetails.ForEach(bank => bank.bankLogo = (bank.bankLogo != null && !string.IsNullOrEmpty(bank.bankLogo)) ? $"{baseUrl.ImageBase}{baseUrl.BankImage}/{bank.id}{bank.bankLogo}" : "");
                List<DepositMethod> depositMethods = result.Read<DepositMethod>();
                depositMethods = depositMethods.Where(x => x.Restricted == true).ToList();
                var walletTypes = result.Read<dynamic>();
                //List<dynamic> promotions = result.Read<dynamic>();
                //if (promotions != null && promotions.Count > 0)
                //    promotions.ForEach(promotion => promotion.bannerImage = (promotion.bannerImage != null && !string.IsNullOrEmpty(promotion.bannerImage)) ? $"{baseUrl.ImageBase}{baseUrl.PromotionImage}/{promotion.id}{promotion.bannerImage}" : "");
                return new { bankDetails, depositMethods, walletTypes };
            }
        }

        #endregion Get Wallet Type

        #region Deposit

        public async Task<Guid> Deposit(DepositInsertRequest request, string UserId, string AddedBy, string VerifiedBy = null, string Verified = StatusConsts.Pending)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                var result = await repository.FindAsync(
                    StoredProcConsts.Payments.Deposit,
                    new
                    {
                        UserId,
                        request.BankId,
                        request.DepositMethodId,
                        request.Amount,
                        request.ReferenceNo,
                        request.DepositeTime,
                        request.PromotionApplyEligible,
                        request.AdminRemarks,
                        AddedBy,
                        PromotionId = request.PromotionId ?? null,
                        VerifiedBy,
                        Verified
                    });

                if (result != null)
                    return Guid.Parse(result.Id.ToString());
                return Guid.Empty;
            }
        }

        public async Task<int> DepositVerify(string sp_name, string Id, string VerifiedBy = null, string Verified = StatusConsts.Rejected, string AdminRemarks = null)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                await repository.AddOrUpdateAsync(
                    sp_name,
                    new
                    {
                        Id,
                        VerifiedBy,
                        Verified,
                        AdminRemarks
                    });
            }
            return 0;
        }

        public async Task<int> DepositImageUpdate(Guid UsersDepositId, string ImageName)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                await repository.AddOrUpdateAsync(StoredProcConsts.Payments.DepositImage, new { UsersDepositId, ImageName });
            }
            return 0;
        }

        public async Task<List<DepositResponse>> GetDeposit(BaseUrlConfigs baseUrl, string UserId = null, string Id = null, string Verified = null, bool Restricted = false, string Keyword = null, string FromDate = null, string ToDate = null, int? PageSize = null, int? PageNo = null)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                var result = await repository.GetMultiDataAsync(StoredProcConsts.Payments.DepositList, new { Id, UserId, Verified, Restricted, Keyword, FromDate, ToDate, PageSize, PageNo });
                List<DepositResponse> deposits = result.Read<DepositResponse>();
                if (!Restricted)
                {
                    List<DepositReceipts> deposits_images = result.Read<DepositReceipts>();
                    foreach (var image in deposits_images)
                        image.Receipt = (image.Receipt != null && !string.IsNullOrEmpty(image.Receipt)) ? $"{baseUrl.ImageBase}{baseUrl.DepositImage}/{image.Receipt}" : "";
                    foreach (var deposit in deposits)
                        deposit.Receipts = deposits_images.ToList().Where(x => x.UsersDepositId == deposit.Id).ToList();
                }
                return deposits;
            }
        }

        #endregion Deposit

        #region Withdrawal

        public async Task<int> Withdrawal(WithdrawalRequest request, Guid AddedBy, Guid UserId, string VerifiedBy = null, string Verified = StatusConsts.Pending)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                await repository.AddOrUpdateAsync(
                    StoredProcConsts.Payments.Withdrawal,
                    new
                    {
                        request.BankId,
                        request.AdminRemarks,
                        request.AccountNumber,
                        request.AccountName,
                        request.Amount,
                        UserId,
                        AddedBy,
                        VerifiedBy,
                        Verified,
                    });
            }
            return 0;
        }

        public async Task<List<dynamic>> GetDynamicData(string sp_name, string UserId = null, string Id = null, string Verified = null, string Keyword = null, string FromDate = null, string ToDate = null)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                var result = await repository.GetDataAsync(sp_name, new { UserId, Id, Verified, Keyword, FromDate, ToDate });
                return result.ToList();
            }
        }

        #endregion Withdrawal

        #region Transfer

        public async Task<int> Transfer(TransferInsertRequest request, string UserId, string AddedBy, string VerifiedBy, string Verified = StatusConsts.Approved)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                await repository.AddOrUpdateAsync(StoredProcConsts.Payments.Transfer, new { request.FromWalletId, request.ToWalletId, request.Amount, UserId, AddedBy, VerifiedBy, Verified });
            }
            return 0;
        }

        #endregion Transfer

        #region Main Wallet Deposit & Withdraw

        public async Task<MainWalletTransferResponse> MainWalletDepositWithdraw(string UserId, decimal Amount, string Method)
        {
            using (var repository = new DapperRepository<MainWalletTransferResponse>(Connection))
            {
                var response = await repository.FindAsync(StoredProcConsts.TransferMoney.MainWalletTransfer, new { UserId, Amount, Method });
                return response;
            }
        }

        #endregion Main Wallet Deposit & Withdraw

        #region Adjust Users Balance

        public async Task<int> AdjustUserBalance(AdjustUserBalanceRequest request)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                await repository.AddOrUpdateAsync(
                    StoredProcConsts.Payments.AdjustUserBalance,
                    new
                    {
                        request.UserId,
                        request.WalletId,
                        request.Amount,
                        request.AdminRemarks,
                        request.AdminId
                    });
            }
            return 0;
        }

        public async Task<List<dynamic>> GetAdjustUserBalance(string sp_name, string Keyword = null, string FromDate = null, string ToDate = null)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                var result = await repository.GetDataAsync(sp_name, new { Keyword, FromDate, ToDate });
                return result.ToList();
            }
        }

        #endregion Adjust Users Balance

        #region User wallet Balance Update

        public async Task<List<dynamic>> GetWaletUserBalance(string sp_name, string m8wallet = null, string playtechwallet = null, string agwallet = null, string _918kisswalet = null, string jokerwallet = null, string m8walletName = null, string playtechwalletName = null, string agwalletName = null, string _918kisswaletName = null, string jokerwalletName = null, string userid = null)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                var result = await repository.GetDataAsync(sp_name, new { UserId = userid, M8WalletName = m8walletName, M8Amount = m8wallet, PlaytechWalletName = playtechwalletName, PlaytechAmount = playtechwallet, AGWalletName = agwalletName, AGAmount = agwallet, _918WalletName = _918kisswaletName, _918Amount = _918kisswalet, JokerWalletName = jokerwalletName, JokerAmount = jokerwallet });
                return result.ToList();
            }
        }

        #endregion User wallet Balance Update

        internal async Task<MobileNumberResponse> GetMobileNumberByWithdrawId(string Id)
        {
            using (var repository = new DapperRepository<MobileNumberResponse>(Connection))
            {
                var result = await repository.FindAsync(StoredProcConsts.Payments.GetMobileNumber_ByWithdrawID, new { Id });
                return result;
            }
        }

        internal async Task<int> ApprovalTimeInsert(string userId, string adminId, string username, string type, string Id)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                await repository.AddOrUpdateAsync(StoredProcConsts.Payments.ApprovalDurationInsert, new { userId, adminId, username, type, Id });
            }
            return 0;
        }

        internal async Task<dynamic> ApprovalTimeSelect(string fromDate, string toDate, string type, long second)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                var result = await repository.GetDataAsync(StoredProcConsts.Payments.ApprovalDurationSelect, new { fromDate, toDate, type, second });
                return result.ToList(); ;
            }
        }

        internal async Task<List<SimilarNameListResponse>> SimilarNameList(string Id)
        {
            using (var repository = new DapperRepository<SimilarNameListResponse>(Connection))
            {
                var result = await repository.GetDataAsync(StoredProcConsts.Payments.WithdrawSimilarNameSelect, new { Id });
                return result.ToList();
            }
        }

        #region Payment Statics

        internal async Task<dynamic> Statics(PaymentStaticsRequest request)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                var result = await repository.GetMultiDataAsync(StoredProcConsts.Payments.DepsoitWithdrawStatics, new { request.FromDate, request.ToDate, request.Method });

                List<PaymentStaticsResponse> responses = result.Read<PaymentStaticsResponse>();
                List<TotalUniqueCountResponse> totalUniques = result.Read<TotalUniqueCountResponse>();

                var Total = responses.Sum(x => x.TotalDeposit) + responses.Sum(x => x.TotalWithdraw);
                var depositTotalAmount = responses.Sum(x => x.TotalDepositAmount);
                var withdrawTotalAmount = responses.Sum(x => x.TotalWithdrawAmount);
                return new { responses, totalUniques.FirstOrDefault().TotalUniqueUser, depositTotalAmount, withdrawTotalAmount, Total };
            }
        }

        #endregion Payment Statics

        #region Payment Statics

        internal async Task<dynamic> StaticsDeatils(PaymentStaticsRequestDetails request)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                var result = await repository.GetDataAsync(StoredProcConsts.Payments.DepsoitWithdrawStaticsDetails, new { request.FromDate, request.ToDate, request.Method, request.BankName });
                return result.ToList();
            }
        }

        #endregion Payment Statics

        #region Check Deposit Without Promotion

        internal async Task<dynamic> CheckDeposit(string UserId)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                return await repository.FindAsync(StoredProcConsts.Payments.DepositCheckWithoutPromotion, new { UserId });
            }
        }

        #endregion Check Deposit Without Promotion

        #region Check Withdraw Amount List

        internal async Task<List<WithdrawAmountList>> CheckWithdrawAmountList(string UserId)
        {
            using (var repository = new DapperRepository<WithdrawAmountList>(Connection))
            {
                var list = await repository.GetDataAsync(StoredProcConsts.Payments.WithdrawAmountList, new { UserId });
                return list.ToList();
            }
        }

        #endregion Check Withdraw Amount List

        internal async Task UpdateTurnoverTarget_WinTarget(string UserId, decimal Amount)
        {
            using (var repository = new DapperRepository<dynamic>(Connection))
            {
                await repository.AddOrUpdateAsync(StoredProcConsts.Payments.TurnoverTargetWinturnUpdate, new { UserId, Amount });
            }
        }

        public async Task<List<WithdrawDepositSelectResponse>> WithdrawDepositRetrive(GlobalGetWithPaginationRequest request)
        {
            using (var repository = new DapperRepository<WithdrawDepositSelectResponse>(Connection))
            {
                var result = await repository.GetDataAsync(StoredProcConsts.Payments.UsersDepositWithdrawSelect, new { request.UserId, request.FromDate, request.ToDate, request.PageNo, request.PageSize });
                return result.ToList();
            }
        }

        public async Task<List<TransferRetriveResponse>> TransferRetriver(GlobalGetWithPaginationRequest request)
        {
            using (var repository = new DapperRepository<TransferRetriveResponse>(Connection))
            {
                var result = await repository.GetDataAsync(StoredProcConsts.Payments.TransferList, new { request.UserId,request.Keyword, request.FromDate, request.ToDate, request.PageNo, request.PageSize });
                return result.ToList();
            }
        }

        public async Task<List<TransactionResponse>> StatementRetriver(GlobalGetWithPaginationRequest request)
        {
            using (var repository = new DapperRepository<TransactionResponse>(Connection))
            {
                var result = await repository.GetDataAsync(StoredProcConsts.Payments.Transaction, new { request.UserId, request.Keyword, request.FromDate, request.ToDate, request.PageNo, request.PageSize });
                return result.ToList();
            }
        }

        #region House Keeping

        public void Dispose()
        {
            GC.SuppressFinalize(this);
        }

        private void Dispose(bool disposing)
        {
            if (disposing)
            {
                Connection = string.Empty;
            }
        }

        #endregion House Keeping
    }
}
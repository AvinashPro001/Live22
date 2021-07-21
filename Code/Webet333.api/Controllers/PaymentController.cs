using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Localization;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Webet333.api.Controllers.Base;
using Webet333.api.Filters;
using Webet333.api.Helpers;
using Webet333.files.interfaces;
using Webet333.models.Configs;
using Webet333.models.Constants;
using Webet333.models.Request;
using Webet333.models.Request.Payments;
using Webet333.models.Response.Payments;
using RequestSizeLimitAttribute = Webet333.api.Filters.RequestSizeLimitAttribute;

namespace Webet333.api.Controllers
{
    [Authorize]
    [Route(ActionsConst.ApiVersion)]
    public class PaymentController : BaseController
    {
        #region Variable

        private IHubContext<SignalRHub> _hubContext;

        public PaymentController(IStringLocalizer<BaseController> Localizer, IOptions<ConnectionConfigs> ConnectionStringsOptions, IHubContext<SignalRHub> hubContext, IOptions<BaseUrlConfigs> BaseUrlConfigsOption) : base(ConnectionStringsOptions.Value, Localizer, BaseUrlConfigsOption.Value)
        {
            this.Localizer = Localizer;
            _hubContext = hubContext;
        }

        #endregion Variable

        #region Dropdowns for the Deposit Page

        [HttpGet(ActionsConst.Payments.DropdownDeposit)]
        public async Task<IActionResult> DropdownDeposit([FromServices] IOptions<BaseUrlConfigs> BaseUrlConfigsOptions)
        {
            using (var payment_help = new PaymentHelpers(Connection))
            {
                var walletTypes = await payment_help.DropdownDeposit(BaseUrlConfigsOptions.Value, GetUniqueId(User), GetUserRole(User));
                return OkResponse(walletTypes);
            }
        }

        [HttpGet(ActionsConst.Payments.DropdownBonus)]
        public async Task<IActionResult> DropdownBonus([FromServices] IOptions<BaseUrlConfigs> BaseUrlConfigsOptions)
        {
            using (var payment_help = new PaymentHelpers(Connection))
            {
                var walletTypes = await payment_help.DropdownBonus(BaseUrlConfigsOptions.Value, GetUniqueId(User), GetUserRole(User));
                return OkResponse(walletTypes);
            }
        }

        #endregion Dropdowns for the Deposit Page

        #region User's transaction retrieve

        [HttpPost(ActionsConst.Payments.Transaction)]
        public async Task<IActionResult> Transaction([FromBody] GlobalGetWithPaginationRequest request)
        {
            await CheckUserRole();

            if(string.IsNullOrWhiteSpace(request.UserId))return BadResponse("error_empty_request");

            using (var payment_help = new PaymentHelpers(Connection))
            {
                var list=await payment_help.StatementRetriver(request);
                if (list.Count != 0)
                {
                    var total = list.FirstOrDefault().Total;
                    var totalPages = GenericHelpers.CalculateTotalPages(total, request.PageSize == null ? list.Count : request.PageSize);

                    return OkResponse(new
                    {
                        result = list,
                        total = total,
                        totalPages = totalPages,
                        pageSize = request.PageSize ?? 10,
                        offset = list.FirstOrDefault().OffSet,
                    });
                }
                return OkResponse(new
                {
                    result = list,
                    total = 0,
                    totalPages = 0,
                    pageSize = 0,
                    offset = 0,
                });
            }
        }

        #endregion User's transaction retrieve

        #region User's Deposit Add and Upload Image

        [HttpPost(ActionsConst.Payments.Deposit)]
        public async Task<IActionResult> Deposite([FromBody] DepositInsertRequest request)
        {
            if (request == null) return BadResponse("error_empty_request");
            if (!ModelState.IsValid) return BadResponse(ModelState);

            var Role = GetUserRole(User);

            using (var payment_help = new PaymentHelpers(Connection))
            {
                await payment_help.UpdateTurnoverTarget_WinTarget(request.UserId.ToString(), Convert.ToDecimal(request.Amount));

                var DepositId = Guid.Empty;

                if (string.IsNullOrEmpty(request.PromotionId))
                    request.PromotionId = null;

                if (Role != RoleConst.Admin)
                {
                    if (GetUserId(User) != request.UserId && request.UserId != Guid.Empty)
                        throw new ApiException("error_invalid_userid", 400);
                    DepositId = await payment_help.Deposit(request, GetUserId(User).ToString(), GetUserId(User).ToString());
                    await _hubContext.Clients.All.SendAsync("DepositApprovalList");
                }
                else
                {
                    if (request.UserId == Guid.Empty)
                        throw new ApiException("error_invalid_userid", 400);
                    DepositId = await payment_help.Deposit(request, request.UserId.ToString(), GetUserId(User).ToString(), GetUserId(User).ToString(), "approved");
                }
                return OkResponse(new { Id = DepositId });
            }
        }

        [HttpPost(ActionsConst.Payments.DepositImage)]
        [RequestSizeLimit(valueCountLimit: 2)]
        public async Task<IActionResult> DepositImage([FromBody] DepositImageRequest request, [FromServices] IUploadManager uploadManager, [FromServices] IOptions<BaseUrlConfigs> BaseUrlConfigsOptions)
        {
            if (request == null) return BadResponse("error_empty_request");
            if (!ModelState.IsValid) return BadResponse(ModelState);
            //await ValidateUser();

            foreach (var req in request.Images)
            {
                var extension = "." + req.Images.Split("base64,")[0].Split("/")[1].Replace(";", "");
                var filename = request.Id.Replace("-", "") + "_" + (long)(DateTime.UtcNow - new DateTime(1970, 1, 1)).TotalMilliseconds;
                req.Images = req.Images.Split("base64,")[1] ?? req.Images;
                using (var generic_help = new GenericHelpers(Connection))
                    generic_help.GetImageWithExtension(uploadManager, req.Images, BaseUrlConfigsOptions.Value.DepositImage, filename, extension);
                using (var payment_help = new PaymentHelpers(Connection))
                    await payment_help.DepositImageUpdate(Guid.Parse(request.Id), filename + extension);
            }
            return OkResponse();
        }

        [HttpPost(ActionsConst.Payments.DepositList)]
        public async Task<IActionResult> DepositList([FromBody] GlobalGetWithPaginationRequest request, [FromServices] IOptions<BaseUrlConfigs> BaseUrlConfigsOptions)
        {
            var Role = GetUserRole(User);
            using (var payment_help = new PaymentHelpers(Connection))
            {
                if (request == null) request = new GlobalGetWithPaginationRequest();
                if (Role == RoleConst.Admin)
                {
                    var list = await payment_help.GetDeposit(BaseUrlConfigsOptions.Value, request?.UserId, request?.Id, request?.Status, Keyword: request?.Keyword, FromDate: request.FromDate, ToDate: request.ToDate, PageSize: request.PageSize, PageNo: request.PageNo);
                    if (list.Count != 0)
                    {
                        var total = list.FirstOrDefault().Total;
                        var totalPages = GenericHelpers.CalculateTotalPages(total, request.PageSize == null ? list.Count : request.PageSize);

                        return OkResponse(new
                        {
                            result = list,
                            total = total,
                            totalPages = totalPages,
                            pageSize = request.PageSize ?? 10,
                            offset = list.FirstOrDefault().OffSet,
                        });
                    }
                    return OkResponse(new
                    {
                        result = list,
                        total = 0,
                        totalPages = 0,
                        pageSize = 0,
                        offset = 0,
                    });
                }
                else
                {
                    if (request?.UserId != null && GetUserId(User).ToString() != request?.UserId)
                        throw new ApiException("error_invalid_userid", 400);

                    var list = await payment_help.GetDeposit(BaseUrlConfigsOptions.Value, GetUserId(User).ToString(), request?.Id, request?.Status, Keyword: request?.Keyword, PageSize: request.PageSize, PageNo: request.PageNo);
                    if (list.Count != 0)
                    {
                        var total = list.FirstOrDefault().Total;
                        var totalPages = GenericHelpers.CalculateTotalPages(total, request.PageSize == null ? list.Count : request.PageSize);

                        return OkResponse(new
                        {
                            result = list,
                            total = total,
                            totalPages = totalPages,
                            pageSize = request.PageSize ?? 10,
                            offset = list.FirstOrDefault().OffSet,
                        });
                    }

                    return OkResponse(new
                    {
                        result = list,
                        total = 0,
                        totalPages = 0,
                        pageSize = 0,
                        offset = 0,
                    });
                }
            }
        }

        [HttpPost(ActionsConst.Payments.BonusList)]
        public async Task<IActionResult> BonusList([FromBody] GlobalGetRequest request, [FromServices] IOptions<BaseUrlConfigs> BaseUrlConfigsOptions)
        {
            //await ValidateUser();
            using (var payment_help = new PaymentHelpers(Connection))
            {
                if (request == null) request = new GlobalGetRequest();
                request.Status = StatusConsts.Approved;
                var Role = GetUserRole(User);
                if (Role == RoleConst.Admin)
                {
                    double total = 0;
                    var bonus = await payment_help.GetDeposit(BaseUrlConfigsOptions.Value, request?.UserId, request?.Id, request?.Status, Restricted: true, Keyword: request?.Keyword, FromDate: request.FromDate, ToDate: request.ToDate);
                    bonus.ForEach(b => total += b.Amount);
                    return OkResponse(new { bonus, total });
                }
                else
                {
                    if (request?.UserId != null && GetUserId(User).ToString() != request?.UserId)
                        throw new ApiException("error_invalid_userid", 400);
                    return OkResponse(await payment_help.GetDeposit(BaseUrlConfigsOptions.Value, GetUserId(User).ToString(), request?.Id, request?.Status, Restricted: true, Keyword: request?.Keyword));
                }
            }
        }

        [HttpPost(ActionsConst.Payments.DepositVerify)]
        public async Task<IActionResult> DepositVerify([FromBody] VerifyRequest request)
        {
            if (request == null) return BadResponse("error_empty_request");
            if (!ModelState.IsValid) return BadResponse(ModelState);
            if (request.Approved != StatusConsts.Approved && request.Approved != StatusConsts.Rejected)
                return BadResponse("error_invalid_value");

            await CheckUserRole();

            using (var payment_help = new PaymentHelpers(Connection))
                await payment_help.DepositVerify(StoredProcConsts.Payments.Deposit, request.Id.ToString(), GetUserId(User).ToString(), request.Approved, request.AdminRemarks);
            return OkResponse();
        }

        #endregion User's Deposit Add and Upload Image

        #region User's Withdrawal Add request

        [HttpPost(ActionsConst.Payments.Withdraw)]
        public async Task<IActionResult> Withdrawal([FromBody] WithdrawalRequest request)
        {
            if (request == null) return BadResponse("error_empty_request");
            if (!ModelState.IsValid) return BadResponse(ModelState);
            //await ValidateUser();
            var Role = GetUserRole(User);
            using (var payment_help = new PaymentHelpers(Connection))
            {
                if (Role != RoleConst.Admin)
                {
                    if (GetUserId(User) != request.UserId && request.UserId != Guid.Empty)
                        throw new ApiException("error_invalid_userid", 400);
                    await payment_help.Withdrawal(request, GetUserId(User), GetUserId(User));
                    await _hubContext.Clients.All.SendAsync("WithdrawApprovalList");
                }
                else
                {
                    if (request.UserId == Guid.Empty)
                        throw new ApiException("error_invalid_userid", 400);
                    await payment_help.Withdrawal(request, GetUserId(User), request.UserId, GetUserId(User).ToString(), "Approved");
                }
            }
            return OkResponse();
        }

        [HttpPost(ActionsConst.Payments.WithdrawList)]
        public async Task<IActionResult> WithdrawList([FromBody] GlobalGetRequest request)
        {
            // await ValidateUser();
            var Role = GetUserRole(User);

            using (var payment_help = new PaymentHelpers(Connection))
            {
                if (Role == RoleConst.Admin)
                    return OkResponse(await payment_help.GetDynamicData(StoredProcConsts.Payments.WithdrawalList, request?.UserId, request?.Id, request?.Status, Keyword: request?.Keyword, FromDate: request.FromDate, ToDate: request.ToDate));
                else
                    return OkResponse(await payment_help.GetDynamicData(StoredProcConsts.Payments.WithdrawalList, GetUserId(User).ToString(), request?.Id, request?.Status, Keyword: request?.Keyword));
            }
        }

        [HttpPost(ActionsConst.Payments.WithdrawVerify)]
        public async Task<IActionResult> WithdrawVerify([FromBody] VerifyRequest request)
        {
            if (request == null) return BadResponse("error_empty_request");
            if (!ModelState.IsValid) return BadResponse(ModelState);

            if (request.Approved != StatusConsts.Approved && request.Approved != StatusConsts.Rejected)
                return BadResponse("error_invalid_value");

            await CheckUserRole();

            using (var payment_help = new PaymentHelpers(Connection))
            {
                await payment_help.DepositVerify(StoredProcConsts.Payments.Withdrawal, request.Id.ToString(), GetUserId(User).ToString(), request.Approved, request.AdminRemarks);
                if (request.Approved == "approved")
                {
                    var res = await payment_help.GetMobileNumberByWithdrawId(request.Id.ToString());
                    using (var account_help = new AccountHelpers(Connection))
                    {
                        account_help.SendSMSAPI(res.MobileNo, $"Hello {res.Username},%0aSUCCESSFULLY WITHDRAWAL RM{res.Amount} from your Account,%0aPlease check your bank account balance.%0aBest Regards,%0aWEBET333 ");
                    }
                }
            }

            return OkResponse();
        }

        #endregion User's Withdrawal Add request

        #region User's Transfer Add request

        [HttpPost(ActionsConst.Payments.Transfer)]
        public async Task<IActionResult> Transfer([FromBody] TransferInsertRequest request)
        {
            if (request == null) return BadResponse("error_empty_request");
            if (!ModelState.IsValid) return BadResponse(ModelState);

            if (request.FromWalletId == request.ToWalletId) return BadResponse("error_transfer_same_wallet");

            var Role = GetUserRole(User);

            if (Role != RoleConst.Admin)
            {
                if (GetUserId(User) != request.UserId && request.UserId != Guid.Empty)
                    throw new ApiException("error_invalid_userid", 400);
                request.UserId = GetUserId(User);
            }
            else
            {
                if (request.UserId == Guid.Empty)
                    throw new ApiException("error_invalid_userid", 400);
            }

            using (var payment_help = new PaymentHelpers(Connection))
                await payment_help.Transfer(request, request.UserId.ToString(), GetUserId(User).ToString(), GetUserId(User).ToString());
            return OkResponse();
        }

        [HttpPost(ActionsConst.Payments.TransferList)]
        public async Task<IActionResult> TransferList([FromBody] GlobalGetWithPaginationRequest request)
        {
            request.UserId = GetUserRole(User) == RoleConst.Users ? GetUserId(User).ToString() : request.UserId;
            using (var payment_help = new PaymentHelpers(Connection))
            {
                var list = await payment_help.TransferRetriver(request);
                if (list.Count != 0)
                {
                    var total = list.FirstOrDefault().Total;
                    var totalPages = GenericHelpers.CalculateTotalPages(total, request.PageSize == null ? list.Count : request.PageSize);

                    return OkResponse(new
                    {
                        result = list,
                        total = total,
                        totalPages = totalPages,
                        pageSize = request.PageSize ?? 10,
                        offset = list.FirstOrDefault().OffSet,
                    });
                }
                return OkResponse(new
                {
                    result = list,
                    total = 0,
                    totalPages = 0,
                    pageSize = 0,
                    offset = 0,
                });


            }
        }

        #endregion User's Transfer Add request

        #region User's Statement Request

        [HttpPost(ActionsConst.Payments.Statement)]
        public async Task<IActionResult> Statement([FromBody] GlobalGetRequest request)
        {
            //await ValidateUser();
            using (var payment_help = new PaymentHelpers(Connection))
            {
                var Role = GetUserRole(User);
                if (Role == RoleConst.Admin)
                    return OkResponse(await payment_help.GetDynamicData(StoredProcConsts.Payments.Statement, request?.UserId, request?.Id, request?.Status));
                else
                    return OkResponse(await payment_help.GetDynamicData(StoredProcConsts.Payments.Statement, GetUserId(User).ToString(), request?.Id, request?.Status));
            }
        }

        #endregion User's Statement Request

        #region Adjust Users Balance

        [HttpPost(ActionsConst.Payments.UserBalanceAdjust)]
        public async Task<IActionResult> AdjustUsersBalance([FromBody] AdjustUserBalanceRequest request)
        {
            if (request == null) return BadResponse("error_empty_request");
            if (!ModelState.IsValid) return BadResponse(ModelState);
            await CheckUserRole();

            request.AdminId = GetUserId(User);

            using (var payment_help = new PaymentHelpers(Connection))
            {
                await payment_help.AdjustUserBalance(request);
            }
            return OkResponse();
        }

        [HttpPost(ActionsConst.Payments.UserBalanceAdjustRetrive)]
        public async Task<IActionResult> AdjustUsersBalanceRetrive([FromBody] GlobalGetRequest request)
        {
            await CheckUserRole();
            using (var payment_help = new PaymentHelpers(Connection))
            {
                return OkResponse(await payment_help.GetAdjustUserBalance(StoredProcConsts.Payments.AdjustUserBalanceRetrive,
                    FromDate: request.FromDate,
                    ToDate: request.ToDate,
                    Keyword: request?.Keyword));
            }
        }

        #endregion Adjust Users Balance

        #region Update User Wallet Balance

        [HttpPost(ActionsConst.Payments.UserWalletBalanceUpdate)]
        public async Task<IActionResult> UserWalletBalanceUpdate([FromBody] UserWalletBalanceUpdateRequest request)
        {
            await ValidateUser();

            using (var payment_help = new PaymentHelpers(Connection))
            {
                return OkResponse(await payment_help.GetWaletUserBalance(StoredProcConsts.Payments.UserWalletBalanceReset, userid: request.UserId, m8walletName: request.M8WalletName, m8wallet: request.M8Amount, playtechwalletName: request.PlaytechWalletName, playtechwallet: request.PlaytechAmount, agwalletName: request.AGWalletName, agwallet: request.AgAmount, jokerwalletName: request.JokerWalletName, jokerwallet: request.JokerAmount, _918kisswaletName: request._918WalletName, _918kisswalet: request._918Amount));
            }
        }

        #endregion Update User Wallet Balance

        #region Approval Time

        #region Approval Time Insert

        [HttpPost(ActionsConst.Payments.ApprovalTimeInsert)]
        public async Task<IActionResult> ApprovalTimeInser([FromBody] ApprovalDurationRequest request)
        {
            await CheckUserRole();
            if (!ModelState.IsValid) return BadResponse(ModelState);
            using (var payment_helper = new PaymentHelpers(Connection))
            {
                await payment_helper.ApprovalTimeInsert(request.UserId, GetUserId(User).ToString(), request.Username, request.Type, request.Id);
                return OkResponse();
            }
        }

        #endregion Approval Time Insert

        #region Approval Time Select

        [HttpPost(ActionsConst.Payments.ApprovalTimeRetrive)]
        public async Task<IActionResult> ApprovalTimeRetrive([FromBody] ApprovalDurationRetriveRequest request)
        {
            await CheckUserRole();
            if (!ModelState.IsValid) return BadResponse(ModelState);

            using (var payment_helper = new PaymentHelpers(Connection))
            {
                var result = await payment_helper.ApprovalTimeSelect(request.FromDate, request.ToDate, request.Type, request.Duration);
                if (result.Count == 0)
                    return NotFoundResponse();
                return OkResponse(result);
            }
        }

        #endregion Approval Time Select

        #endregion Approval Time

        #region Withdraw Similar Name

        [HttpPost(ActionsConst.Payments.SimilarnameList)]
        public async Task<IActionResult> SimilarNameList([FromBody] GetByIdRequestWithRequired request)
        {
            await CheckUserRole();

            using (var payment_help = new PaymentHelpers(Connection))
            {
                var list = await payment_help.SimilarNameList(request.Id);
                if (list.Count == 0)
                    return OkResponse("List Only Show when Percentage is Grater then 30%");
                return OkResponse(list);
            }
        }

        #endregion Withdraw Similar Name

        #region Deposit Withdraw Statics

        [HttpPost(ActionsConst.Payments.PaymentStatics)]
        public async Task<IActionResult> Statics([FromBody] PaymentStaticsRequest request)
        {
            await CheckUserRole();
            if (!ModelState.IsValid) return BadResponse(ModelState);

            if (string.IsNullOrEmpty(request.FromDate)) request.FromDate = null;
            if (string.IsNullOrEmpty(request.ToDate)) request.ToDate = null;

            using (var payment_help = new PaymentHelpers(Connection))
            {
                var list = await payment_help.Statics(request);
                return OkResponse(list);
            }
        }

        #endregion Deposit Withdraw Statics

        #region Deposit Withdraw Statics details

        [HttpPost(ActionsConst.Payments.PaymentStaticsDetails)]
        public async Task<IActionResult> StaticsDetails([FromBody] PaymentStaticsRequestDetails request)
        {
            await CheckUserRole();
            if (!ModelState.IsValid) return BadResponse(ModelState);

            if (string.IsNullOrEmpty(request.FromDate)) request.FromDate = null;
            if (string.IsNullOrEmpty(request.ToDate)) request.ToDate = null;

            using (var payment_help = new PaymentHelpers(Connection))
            {
                var list = await payment_help.StaticsDeatils(request);
                return OkResponse(list);
            }
        }

        #endregion Deposit Withdraw Statics details

        #region Deposit Check Without Promotion

        [Authorize]
        [HttpPost(ActionsConst.Payments.DepositCheckWithoutPromotion)]
        public async Task<IActionResult> CheckDepositWithoutPromotion([FromBody] GetByIdRequest request)
        {
            var Role = GetUserRole(User);

            if (Role == RoleConst.Users)
                request.Id = GetUserId(User).ToString();

            if (Role == RoleConst.Admin)
                if (string.IsNullOrEmpty(request.Id))
                    return BadResponse("error_invalid_modelstate");

            using (var payment_help = new PaymentHelpers(Connection))
            {
                var list = await payment_help.CheckDeposit(request.Id);
                return OkResponse(list);
            }
        }

        #endregion Deposit Check Without Promotion

        #region User Withdraw Amount

        [Authorize]
        [HttpPost(ActionsConst.Payments.WithdrawCheckAmountList)]
        public async Task<IActionResult> WithdrawCheckAmountList([FromBody] GetByIdRequest request)
        {
            var Role = GetUserRole(User);

            if (Role == RoleConst.Users)
                request.Id = GetUserId(User).ToString();

            if (Role == RoleConst.Admin)
                if (string.IsNullOrEmpty(request.Id))
                    return BadResponse("error_invalid_modelstate");

            using (var payment_help = new PaymentHelpers(Connection))
            {
                var list = await payment_help.CheckWithdrawAmountList(request.Id);
                var totalAmount = list == null ? 0 : list.Sum(x => x.WithdrawAmount);
                return OkResponse(new { list, totalAmount });
            }
        }

        #endregion User Withdraw Amount

        #region Withdraw Deposit Retrive

        [HttpPost(ActionsConst.Payments.WithdrawDepositRetrive)]
        public async Task<IActionResult> WithdrawDepositRetrive([FromBody] GlobalGetWithPaginationRequest request)
        {
            var Role = GetUserRole(User);

            request.UserId = Role == RoleConst.Users ? GetUserId(User).ToString() : request.UserId;
            using (var payment_helper = new PaymentHelpers(Connection))
            {
                var list = await payment_helper.WithdrawDepositRetrive(request);

                if (list.Count != 0)
                {
                    var total = list.FirstOrDefault().Total;
                    var totalPages = GenericHelpers.CalculateTotalPages(total, request.PageSize == null ? list.Count : request.PageSize);

                    return OkResponse(new
                    {
                        result = list,
                        total = total,
                        totalPages = totalPages,
                        pageSize = request.PageSize ?? 10,
                        offset = list.FirstOrDefault().OffSet,
                    });
                }
                return OkResponse(new
                {
                    result = list,
                    total = 0,
                    totalPages = 0,
                    pageSize = 0,
                    offset = 0,
                });
            }
        }


        #endregion Withdraw Deposit Retrive
    }
}
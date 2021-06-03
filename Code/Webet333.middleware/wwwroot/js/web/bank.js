var WithdrawBankId, UserBank;
$(document).ready(function () {
    UsersBankDetails();
});

//#region Set Html In From Wallet in Transfer page

function SetHtmlInFromWallet() {
    var data = JSON.parse(Decryption(GetSessionStorage("siteData")));

    if (data != null) {
        if (data.WalletData !== null && data.WalletData !== undefined) {
            var fromWalletData = data.WalletData.filter(x => x.isMaintenance == false);
            $.each(fromWalletData, function () {
                $("#from_wallet").append($("<option />").val(this.id).text(this.walletType));
            });
        }
    }
}

//#endregion

//#region "ASYNC" Set Html in To Wallet On Changes of From Wallet

async function SetHtmlInToWallet() {
    var data = JSON.parse(Decryption(GetSessionStorage("siteData")));

    if (data != null) {
        if (data.WalletData !== null && data.WalletData !== undefined) {
            var fromWallet = $("#from_wallet").val();
            var toWalletData = data.WalletData.filter(x => x.id != fromWallet && x.isMaintenance == false);
            var fromWalletData = data.WalletData.filter(x => x.id == fromWallet && x.isMaintenance == false);

            SetAllValueInElement("to_wallet", "");
            SetAllValueInElement("to_wallet", '<option value="">-- Select --</option>');
            $.each(toWalletData, function () {
                $("#to_wallet").append($("<option />").val(this.id).text(this.walletType));
            });
            SetLoadingImageBaseOnWalletName(fromWalletData[0].walletType);
            await LoadBalanceBasedOnWalletNameAsync(fromWalletData[0].walletType);
            var balance = await ReturnBalanceBasedOnWalletName(fromWalletData[0].walletType);
            if (fromWalletData[0].walletType == "Main Wallet")
                $('#txt_transfer_amount').val(balance);
            else {
                $('#txt_transfer_amount').val("");
                $('#txt_transfer_amount').attr("placeholder", "Max Limit: " + balance);
            }
        }
    }
}

//#endregion

//#region "ASYNC" Max Balance transfer Set in Text Box 

async function MaxTransfer() {
    var fromWallet = $("#from_wallet").val();
    if (fromWallet != undefined && fromWallet != "" && fromWallet != null) {
        var data = JSON.parse(Decryption(GetSessionStorage("siteData")));
        if (data != null) {
            if (data.WalletData !== null && data.WalletData !== undefined) {
                var fromWalletData = data.WalletData.filter(x => x.id == fromWallet && x.isMaintenance == false);
                await LoadBalanceBasedOnWalletNameAsync(fromWalletData[0].walletType);
                var balance = await ReturnBalanceBasedOnWalletName(fromWalletData[0].walletType);
                $('#txt_transfer_amount').val(balance);
            }
        }
    }
    else {
        ShowError("select_from_wallet_error");
    }
}

//#endregion

async function CallAPIForBankPages() {
    var data = JSON.parse(Decryption(GetSessionStorage("siteData")));

    if (data.AdminBankPageData == null || data.AdminBankPageData == undefined) {

        let res = await GetMethodWithoutToken(settingEndPoints.admin_page_bank);

        if (res.status == 200) {
            SiteData.AdminBankPageData = res.response.data;
            SetSessionStorage("siteData", Encryption(JSON.stringify(SiteData)))
        }
    }
}

function SetAdminBankPage() {
    var data = JSON.parse(Decryption(GetSessionStorage("siteData")));

    if (data != null) {
        if (data.AdminBankPageData !== null && data.AdminBankPageData !== undefined) {
            var result = data.AdminBankPageData.bankDetails;

            $("#bankdetail").find("tr:gt(0)").remove();
            var bankDetailsData = ""
            for (i = 0; i < result.length; i++) {
                bankDetailsData += '<tr><td><img src="' + result[i].bankLogo + '" width="150px" /></td><td>' + result[i].accountName + '</td><td>' + result[i].accountNo + '</td></tr>';
            }

            $("#bankdetail").find('thead').append(bankDetailsData);


            var bankPageHTML = ""
            transactionLimit = data.AdminBankPageData.trancationLimit;
            for (i = 0; i < transactionLimit.length; i++) {
                bankPageHTML += '<tr><td class="no-border pad-ten grey-bg" colspan="4" classname="no-border pad-ten grey-bg">' + transactionLimit[i].transactionType + '</td ></tr >';
                var Limits = transactionLimit[i].details;

                for (j = 0; j < Limits.length; j++) {
                    bankPageHTML += '<tr><td class="pad-ten white-bg" classname="pad-ten white-bg">' + Limits[j].options + '</td ><td class="text-center pad-ten white-bg" classname="text-center pad-ten white-bg">' + Limits[j].minimum + '</td><td class="text-center pad-ten white-bg" classname="text-center pad-ten white-bg">' + Limits[j].maximum + '</td><td class="text-center pad-ten white-bg" classname="text-center pad-ten white-bg">' + Limits[j].processingTime + '</td></tr>';
                }
            }
            $("#limits_table").find('thead').append(bankPageHTML);

            var impNotesHTML = "";
            var impNotesData = data.AdminBankPageData.notes;
            for (i = 0; i < impNotesData.length; i++) impNotesHTML += '<li class="mar-btm-ten">' + impNotesData[i].note + '</li>'
            SetAllValueInElement("imp_notes", impNotesHTML);

            SetAllValueInElement("UpdateTime", DisplayCurrentTime());
        }
    }
}

async function CallAllBankAPI() {
    var data = JSON.parse(Decryption(GetSessionStorage("siteData")));

    if (data.AllBankPageData == null || data.AllBankPageData == undefined) {

        let res = await GetMethodWithoutToken(settingEndPoints.allbank);

        if (res.status == 200) {
            SiteData.AllBankPageData = res.response.data;
            SetSessionStorage("siteData", Encryption(JSON.stringify(SiteData)));
            SetWithdrawPageBank();
        }
    }
    else {
        SetWithdrawPageBank();
    }
}

function SetWithdrawPageBank() {
    var data = JSON.parse(Decryption(GetSessionStorage("siteData")));
    allbankHTML = ""
    if (data.AllBankPageData !== null && data.AllBankPageData !== undefined) {
        for (i = 0; i < data.AllBankPageData.length; i++) {
            allbankHTML += '<li class="tablinks"><a class="thm-txt" href="#" data-toggle="tab" ><figure  data-bankname="' + data.AllBankPageData[i].bankName + '" onclick="SetWithdrawBankIdInVariable(\'' + data.AllBankPageData[i].id + '\',\'' + data.AllBankPageData[i].bankName + '\')"><img style="object-position:center !important" class="tab-bankicon" src="' + data.AllBankPageData[i].Logo + '" alt=""></figure></a><p>' + data.AllBankPageData[i].bankName + '</p></li>';
        }
        SetAllValueInElement("withdraw_bank_list", allbankHTML);
        SetUserDefaultBank();
    }
    else {
        setTimeout(function () { SetWithdrawPageBank() }, 2000)
    }
}

function SetWithdrawBankIdInVariable(Id, BankName) {
    WithdrawBankId = Id;

    var banks = UserBank.filter(x => x.bankName == BankName);

    if (banks.length > 0) {
        $('#withdraw_account_number').val(banks[0].accountNo);
        $("#withdraw_account_number").attr("disabled", "disabled");
    }
    else {
        $('#withdraw_account_number').val("");
        $("#withdraw_account_number").removeAttr("disabled");
    }
}

function SetUserDefaultBank() {
    try {
        var banklist = $('[data-bankname]')
        $.each(banklist, function () {
            if (this.dataset.bankname == UserBank[0].bankName) {
                $(this).click();
            }
        });
    }
    catch (e) {
        setTimeout(function () { SetUserDefaultBank(); }, 2000)
    }
}

async function UsersBankDetails() {
    if (GetLocalStorage('currentUser') !== null) {
        var model = {
        };
        var res = await PostMethod(accountEndPoints.userBankDetail, model);
        if (res.status == 200) {
            UserBank = res.response.data;
        }
    }
}

async function SetWithdrawLimit() {
    var res = await GetMethod(accountEndPoints.getProfile);
    if (res.status == 200) {
        SetSessionStorage('userDetails', Encryption(JSON.stringify(res.response.data)));
        $("#txt_withdraw_amount").attr("placeholder", "Min/Max Limit: 10.00/ " + parseFloat(res.response.data.withdrawLimit).toFixed(2));
    }
    var model = {}
    var WithdrawPromotionListRes = await PostMethod(accountEndPoints.withdrawPromotionList, model);
    if (WithdrawPromotionListRes.status == 200) {
        WithdrawPromotionListRes = WithdrawPromotionListRes.response.data;
        SetAllValueInElement("WithdrawAmount", "MYR " + WithdrawPromotionListRes.totalAmount);
        SetAllValueInElement("total_withdraw_amount", "Total Available Withdraw Amount : " + WithdrawPromotionListRes.totalAmount + " MYR");

        if (WithdrawPromotionListRes.totalAmount > 0) {
            $("#unlock_icon").addClass("fa fa-unlock");
            $("#unlock_icon").attr("data-toggle", "modal");
            $("#WithdrawAmount").attr("data-toggle", "modal");
            $("#WithdrawAmount").attr("data-target", "#withdraw_availabe_amount_list");
            $("#unlock_icon").attr("data-target", "#withdraw_availabe_amount_list");
        } else {
            $("#unlock_icon").addClass("fa fa-lock");
            $("#unlock_icon").removeAttr("data-toggle");
            $("#WithdrawAmount").removeAttr("data-toggle");
            $("#unlock_icon").removeAttr("data-target");
            $("#WithdrawAmount").removeAttr("data-target");
        }

        if (WithdrawPromotionListRes.list.length > 0) {
            var withdrawAvailabeAmountListHTML = "";
            var rowCount = 0;
            $.each(WithdrawPromotionListRes.list, function () {
                withdrawAvailabeAmountListHTML += '<tr><td>' + ++rowCount + '</td ><td>' + this.title + '</td><td>' + this.withdrawAmount + '</td><td>' + this.created + '</td><td class="' + this.status.replace(" ", "").toLowerCase() + "_color" + '">' + this.status + '</td></tr>';
            });
            SetAllValueInElement("tbl_withdraw_availabe_amount_list", withdrawAvailabeAmountListHTML);
        }
    }
}

function ResetTransactionField(i) {
    if (i == 2) {
        $('#txt_withdraw_amount').val("");
    }
    if (i == 3) {
        $('#txt_transfer_amount').val("");
        $('#txt_transfer_amount').attr("placeholder", "Max Limit: From Wallet");
    }
}

async function Withdraw() {
    var amount = Number($("#txt_withdraw_amount").val());

    if (amount <= 0)
        return ShowError("amount_greater_zero_error");

    var profile = JSON.parse(Decryption(GetSessionStorage("userDetails")));

    if (amount < 10 || amount > Number(profile.withdrawLimit))
        return ShowError("min_max_amount_error_parameter");

    if (WithdrawBankId === "" || WithdrawBankId === null || WithdrawBankId === undefined)
        return ShowError("bnk_name_required_error");

    if (WithdrawBankId == undefined)
        return ShowError("Select bank");

    var model = {
        bankId: WithdrawBankId,
        amount: amount,
        accountNumber: $('#withdraw_account_number').val(),
        accountName: profile.name
    };

    if (model.accountNumber === "" || model.accountNumber === null || model.accountNumber === undefined)
        return ShowError("acc_no_req_error");
    LoaderShow();
    try {
        var res = await PostMethod(transactionEndPoints.addwithdraw, model);
        if (res.status == 200) {
            ShowSuccess(res.response.message);
            ResetTransactionField(2);
            SetWithdrawLimit();
            RefreshBalance();
        }
        LoaderHide();
    }
    catch (e) {
        LoaderHide();
    }
}

async function Transfer() {
    var amount = Number($("#txt_transfer_amount").val());
    var fromWallet = $("#from_wallet").val();
    var toWallet = $("#to_wallet").val();

    if (amount <= 0)
        return ShowError("amount_greater_zero_error");

    if (fromWallet == "")
        return ShowError("Please Select From Wallet");

    if (toWallet == "")
        return ShowError("Please Select To Wallet");

    var data = JSON.parse(Decryption(GetSessionStorage("siteData")));
    var fromWalletData = data.WalletData.filter(x => x.id == fromWallet && x.isMaintenance == false);
    await LoadBalanceBasedOnWalletNameAsync(fromWalletData[0].walletType);
    var balance = await ReturnBalanceBasedOnWalletName(fromWalletData[0].walletType);

    if (amount > Number(balance))
        return ShowError("Insufficient_balance_wallet");

    let model = {
        fromWalletId: fromWallet,
        toWalletId: toWallet,
        amount: amount
    }

    try {
        LoaderShow()
        var res = await PostMethod(transactionEndPoints.addtransfer, model);
        if (res.status == 200) {
            ShowSuccess(res.response.message)
            ResetTransactionField(3);
            RefreshBalance();
        }
        LoaderHide()
    }
    catch (e) {
        LoaderHide()
    }

}

var HistorySectionName = "Transfer"
function SetHistorySectionName(name) {
    HistorySectionName = name;
    fromDate = null;
    toDate = null;
    pageNumber = 0;
    GetTodayDate();
}

var fromDate = null, toDate = null, pageSize = 8; pageNumber = 0;

function APIDateFormate(date) {
    return date.replace(/T/, " ").substring(0, 16);
}

function CreatePagination(Id, TotalPages, CurrentPage) {
    if (TotalPages > 5) {
        if (CurrentPage < 5) {
            var html = '';
            $('#' + Id).html(html);
            for (i = 1; i <= 5; i++)
                if (i == CurrentPage)
                    html += '<a class="active" onclick="ClickOnPageNumber(\'' + i + '\')">' + i + '</a>';
                else
                    html += '<a  onclick="ClickOnPageNumber(\'' + i + '\')">' + i + '</a>';
            html += '<a onclick="ClickOnPageNumber(\'' + (CurrentPage + 1) + '\')">&raquo;</a>'
            $('#' + Id).html(html);
        }
        else {
            if (CurrentPage == TotalPages) {
                var html = '<a>&laquo;</a>';
                $('#' + Id).html(html);
                for (i = TotalPages - 4; i <= TotalPages; i++)
                    if (i == CurrentPage)
                        html += '<a class="active" onclick="ClickOnPageNumber(\'' + i + '\')">' + i + '</a>';
                    else
                        html += '<a  onclick="ClickOnPageNumber(\'' + i + '\')">' + i + '</a>';
                $('#' + Id).html(html);
            }
            else {
                if (TotalPages > CurrentPage + 2) {
                    var html = '<a onclick="ClickOnPageNumber(\'' + (CurrentPage - 1) + '\')">&laquo;</a>';
                    $('#' + Id).html(html);
                    for (i = CurrentPage - 2; i <= CurrentPage + 2; i++)
                        if (i == CurrentPage)
                            html += '<a class="active" onclick="ClickOnPageNumber(\'' + i + '\')">' + i + '</a>';
                        else
                            html += '<a  onclick="ClickOnPageNumber(\'' + i + '\')">' + i + '</a>';
                    html += '<a onclick="ClickOnPageNumber(\'' + (CurrentPage + 1) + '\')">&raquo;</a>'
                    $('#' + Id).html(html);
                }
                else {
                    var html = '<a onclick="ClickOnPageNumber(\'' + (CurrentPage - 1) + '\')">&laquo;</a>';
                    $('#' + Id).html(html);
                    for (i = TotalPages - 4; i <= TotalPages; i++)
                        if (i == CurrentPage)
                            html += '<a class="active" onclick="ClickOnPageNumber(\'' + i + '\')">' + i + '</a>';
                        else
                            html += '<a  onclick="ClickOnPageNumber(\'' + i + '\')">' + i + '</a>';
                    $('#' + Id).html(html);
                }
            }
        }

    }
    else {
        var html = "";
        $('#' + Id).html(html);
        for (i = 1; i <= TotalPages; i++)
            if (i == CurrentPage)
                html += '<a class="active" onclick="ClickOnPageNumber(\'' + i + '\')">' + i + '</a>';
            else
                html += '<a onclick="ClickOnPageNumber(\'' + i + '\')">' + i + '</a>';
        $('#' + Id).html(html);
    }
}

function ClickOnPageNumber(PageNumber) {
    pageNumber = PageNumber - 1;
    TransferHistory();
}


Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

function GetDateFormate(Date1,Date2) {
    var day1 = Date1.getDate();
    var Month1 = Date1.getMonth() + 1;
    var Year1 = Date1.getFullYear();
    Month1 = Month1 < 10 ? "0" + Month1 : Month1;
    day1 = day1 < 10 ? "0" + day1 : day1;


    var day2 = Date2.getDate();
    var Month2 = Date2.getMonth() + 1;
    var Year2 = Date2.getFullYear();
    Month2 = Month2 < 10 ? "0" + Month2 : Month2;
    day2 = day2 < 10 ? "0" + day2 : day2;


    fromDate = Year1 + "-" + Month1 + "-" + day1 + " 00:00:00";
    toDate = Year2 + "-" + Month2 + "-" + day2 + " 23:59:59";
}

//GetTodayDate();
function GetTodayDate() {
    var date = new Date();
    GetDateFormate(date, date);
    CallFunctionAccordingToTab();
};


function Get3DayDate() {
    var fdate = new Date().addDays(-3);
    var tdate = new Date();
    GetDateFormate(fdate,tdate)
    CallFunctionAccordingToTab();
};

function GetInWeekDate() {
    var curr = new Date(); // get current date
    var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
    var last = first + 6;
    var firstday = new Date(curr.setDate(first))
    var lastday = new Date(curr.setDate(last))
    console.log(curr);
    console.log(firstday);
    console.log(lastday);;
}


function CallFunctionAccordingToTab() {
    switch (HistorySectionName) {
        case "Transfer": TransferHistory(); break;
        case "BettingSummery": break;
        case "WithdrawDeposit": break;
        case "Promotion": break;
        case "Rebate": break;
        case "Reward": break;
    }
}

TransferHistory();
async function TransferHistory(FromDate = null, ToDate = null, PageSize = null, PageNumber = null) {
    let model = {
        pageNo: PageNumber == null ? pageNumber : PageNumber,
        pageSize: PageSize == null ? pageSize : PageSize,
        fromDate: FromDate == null ? fromDate : FromDate,
        toDate: ToDate == null ? toDate : ToDate
    }
    var res = await PostMethod(transactionEndPoints.transferHistroy, model);

    if (res.status == 200) {
        if (res.response.data.result.length > 0) {
            var data = res.response.data.result;
            $("#tbl_transferHistory").find("tr:gt(0)").remove();
            var html = ""
            for (i = 0; i < data.length; i++) {
                html += '<tr><td>' + APIDateFormate(data[i].created) + '</td ><td><span class="blue_color_text">' + parseFloat(data[i].amount).toFixed(2) + '</span></td><td>' + data[i].fromWallet + '</td><td>' + data[i].toWallet + '</td><td><span class="' + data[i].verified + '_color">' + data[i].verified + '</span></td></tr>';
            }
            $("#tbl_transferHistory").find('tbody').html(html);

            if (res.response.data.total > 8) {
                CreatePagination('tbl_transferHistory_pagination', res.response.data.totalPages, res.response.data.offset + 1);
            }
            else {
                $("#tbl_transferHistory_pagination").html("");
            }

        }
    }
}
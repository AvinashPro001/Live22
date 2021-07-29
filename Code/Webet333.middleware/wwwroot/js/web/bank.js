var WithdrawBankId, DepositBankId, DepositPromotionId, UserBank;
var fromDate = null, toDate = null, pageSize = 8; pageNumber = 0;
var HistorySectionName = "Transfer";

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
        ShowError(ChangeErroMessage("select_from_wallet_error"));
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

function SetDepositPageBank() {
    var data = JSON.parse(Decryption(GetSessionStorage("siteData")));
    if (data != null) {
        if (data.AdminBankPageData !== null && data.AdminBankPageData !== undefined) {
            bankdata = data.AdminBankPageData.bankDetails;
            var html = "";
            for (i = 0; i < bankdata.length; i++) {
                if (i == 0) {
                    html += '<li class="active tablinks"><a onclick="SetBankDetails(\'' + bankdata[i].accountName + '\',\'' + bankdata[i].accountNo + '\',\'' + bankdata[i].id + '\')" class="thm-txt" href="#" data-toggle="tab"><figure ><img style="object-position:center !important" class="tab-bankicon" src="' + bankdata[i].bankIconLogo + '" alt=""></figure><p>' + bankdata[i].bankName + '</p></a></li >';
                    SetBankDetails(bankdata[i].accountName, bankdata[i].accountNo, bankdata[i].id);
                }
                else
                    html += '<li class=" tablinks"><a onclick="SetBankDetails(\'' + bankdata[i].accountName + '\',\'' + bankdata[i].accountNo + '\',\'' + bankdata[i].id + '\')" class="thm-txt" href="#" data-toggle="tab"><figure ><img style="object-position:center !important" class="tab-bankicon" src="' + bankdata[i].bankIconLogo + '" alt=""></figure><p>' + bankdata[i].bankName + '</p></a></li >';
            }
            SetAllValueInElement("Depsoit_bank_list", html);
        }
        else {
            setTimeout(function () {
                SetDepositPageBank();
            }, 5000)
        }
    }
    else {
        setTimeout(function () {
            SetDepositPageBank();
        }, 5000)
    }
}

function CopyToClipboard(id) {
    if (document.selection) { // IE
        var range = document.body.createTextRange();
        range.moveToElementText(document.getElementById(id));
        range.select();
    } else if (window.getSelection) {
        var range1 = document.createRange();
        range1.selectNode(document.getElementById(id));
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range1);
    }
    var copyText = document.getElementById(id);
    document.execCommand("Copy");
}

function SetBankDetails(AccountName, AccountNumber, Id) {
    var accountNumberHtml = '<span class="fa fa-copy hand-curson" onclick=CopyToClipboard("lbl_account_number")></span> &nbsp;&nbsp;' + AccountNumber;
    var accountNameHtml = '<span class="fa fa-copy hand-curson" onclick=CopyToClipboard("lbl_account_name")></span> &nbsp;&nbsp;' + AccountName;
    SetAllValueInElement("lbl_account_number", accountNumberHtml);
    SetAllValueInElement("lbl_account_name", accountNameHtml);
    DepositBankId = Id;
}

function SetAmountInTextBox(Amount, Online) {
    if (Online)
        $("#txt_deposit_amount_online").val(Amount);
    else
        $("#txt_deposit_amount").val(Amount);
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

function SetProfilePageBanks() {
    if (UserBank != undefined) {
        if (UserBank.length > 0) {
            html = "";
            for (i = 0; i < UserBank.length; i++) {
                html += '<div class="bank_details1"><div class="bank_details1_icon_box"><img src="' + UserBank[i].bankLogo + '" class="bank_details_icon"></div><div class="bank_details1-text"><h1>' + UserBank[i].accountNo + ' <span class="tickgray"><img src="/images/tickgray.png"></span></h1><p>' + UserBank[i].accountName + '</p></div></div>';
            }
            SetAllValueInElement("users_bank_details", html);
        }
        else {
            var html = '<div class="bank_details1"><div class="bank_details1_icon_box"><p class="big bank_details_icon">No Details</p></div></div>'
            SetAllValueInElement("users_bank_details", html);
        }

    }
    else {
        setTimeout(function () {
            SetProfilePageBanks();
        }, 1000)
    }
}

function SetProfilePageData() {
    if (GetLocalStorage('currentUser') !== null) {
        var res = JSON.parse(Decryption(GetSessionStorage("userDetails")))
        if (res !== null) {
            SetAllValueInElement("profile_username", res.username)
            SetAllValueInElement("profile_mobileNumber", res.mobileNo)
            SetAllValueInElement("profile_fullname", res.name)
            $('#mobile_number').val(res.mobileNo);
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
    if (i == 1) {
        document.getElementById("datepicker0").value = "";
        document.getElementById("txt_deposit_amount").value = "";
        document.getElementById("txt_deposit_amount_online").value = "";
        document.getElementById("txt_reference_number").value = "";
        var node = document.getElementById("selectedFiles");
        node.innerHTML = "";
        TableData = [];
        files.length = 0;
    }
    if (i == 2) {
        $('#txt_withdraw_amount').val("");
    }
    if (i == 3) {
        $('#txt_transfer_amount').val("");
        $('#txt_transfer_amount').attr("placeholder", "Max Limit: From Wallet");
    }
}

function OpenPaymentPage() {
    window.open("../Web/payment");
}

var DepositModel, OnlinePayment;
async function Deposit(IsOnlinePayment) {
    OnlinePayment = IsOnlinePayment;
    var amount = 0;
    if (IsOnlinePayment)
        amount = $("#txt_deposit_amount_online").val();
    else
        amount = $("#txt_deposit_amount").val();

    if (amount < 10) {
        return ShowError(ChangeErroMessage("min_amount_error"));
    }

    if (amount > 30000) {
        return ShowError(ChangeErroMessage("max_amount_error"));
    }


    model = {
        bankId: DepositBankId,
        amount: amount,
        depositMethodId: 'E14F22CF-686D-43CB-8DC0-669D7EBC23F5',
        referenceNo: $('#txt_reference_number').val(),
        depositeTime: Date.parse(document.getElementById("datepicker0").value.replace(" ", "T")).toString(),
        promotionId: DepositPromotionId,
        promotionApplyEligible: false
    };


    if (!IsOnlinePayment) {
        if (model.bankId === null || model.bankId === "" || model.bankId === undefined) {
            return ShowError(ChangeErroMessage("plz_selet_bnk_error"));
        }

        if (model.depositeTime === "NaN") {
            return ShowError(ChangeErroMessage("select_date_time_error"));
        }

        if (model.referenceNo === "") {
            return ShowError(ChangeErroMessage("refer_no_error"));
        }

        if (filter_array(TableData).length === 0) {
            return ShowError(("receipt_required_error"));
        }
    }

    LoaderShow();
    if (model.promotionId != undefined) {

        if (IsOnlinePayment) {
            SetLocalStorage("IsWindowClose", false)
            OpenPaymentPage();
        }

        await LoadAllBalance();
        var promotionModel = {
            userid: null,
            amount: Number(model.amount)
        };
        var walletData = await PostMethod(accountEndPoints.promotionApplyCheck, promotionModel);
        walletData = walletData.response;
        if (walletData.data.IsPending == true) {
            LoaderHide();
            if (IsOnlinePayment)
                SetLocalStorage("IsWindowClose", true);
            return ShowError(ChangeErroMessage("pending_sports_deposit_error"));
        }

        if (walletData.data.InMaintenance == true) {
            LoaderHide();
            if (IsOnlinePayment)
                SetLocalStorage("IsWindowClose", true);
            return ShowError(ChangeErroMessage("game_in_maintenance_new_promotion"));
        }

        if (walletData.data.CheckPromotionApply === true && walletData.data.TotalPromotionRow > 0) {
            if (IsOnlinePayment)
                SetLocalStorage("IsWindowClose", true);
            if (confirm(ChangeErroMessage("promo_apply_balance_error"))) {
                model.promotionApplyEligible = true;
                if (IsOnlinePayment) {
                    SetLocalStorage("IsWindowClose", false)
                    OpenPaymentPage();
                }
            }
            else {
                model.promotionId = "";
                if (IsOnlinePayment) {
                    SetLocalStorage("IsWindowClose", false)
                    OpenPaymentPage();
                }
            }
        }
        else {
            if (walletData.data.Staus != null && walletData.data.CheckPromotionRemind == true) {
                LoaderHide();
                if (IsOnlinePayment)
                    SetLocalStorage("IsWindowClose", true);
                return ShowError(ChangeErroMessage("promot_active_error"));
            }

            if (walletData.data.CheckPromotionRemind == true) {
                model.promotionApplyEligible = true;
                DepositModel = model;
            }

            if (walletData.data.Staus == null) {
                model.promotionApplyEligible = true;
            }
        }
    }
    else {
        if (OnlinePayment) {
            SetLocalStorage("IsWindowClose", false)
            OpenPaymentPage();
        }

        let data = {
        }
        var walletData = await PostMethod(accountEndPoints.depositCheckWithoutPromotion, data);
        walletData = walletData.response;
        if (walletData.data.CheckPopupWithoutPromotion == true) {
            LoaderHide();
            DepositModel = model;
        }
        else {
            LoaderHide();
            DepositModel = model;
            if (IsOnlinePayment)
                SetLocalStorage("IsWindowClose", true);
            $('#promotion_not_apply_confimation').modal('show');
            return 0;
        }
    }

    if (!IsOnlinePayment) {
        if (filter_array(TableData).length === 0) {
            LoaderHide();
            return ShowError(ChangeErroMessage("receipt_required_error"));
        } else {
            DepositModel = model;
            await DepositAfterPromotionCheck();
        }
    } else {
        DepositModel = model;
        await DepositAfterPromotionCheck();
    }
}

async function DepositAfterPromotionCheck() {
    LoaderShow();
    if (OnlinePayment) {

        if (model.promotionId == undefined || model.promotionId == null) {
            SetLocalStorage("IsWindowClose", false);
            OpenPaymentPage();
        }
        var res = await PostMethod(transactionEndPoints.onlinePayment, DepositModel);
        if (res.status == 200) {
            LoaderHide();
            SetLocalStorage("gameURL", res.response.data.redirect_to);
        }
        else {
            ShowError(res.response.message)
        }
    }
    else {
        var res = await PostMethod(transactionEndPoints.addDeposite, DepositModel);
        if (res.status == 200) {
            await handleFileSelect1(res.response.data.id);
            LoadAllBalance()
            ResetTransactionField(1);
            SetUserDepositPromotion();
        }
        else {
            ShowError(res.response.message)
        }
    }
    LoaderHide();
}

async function Withdraw() {
    var amount = $("#txt_withdraw_amount").val();

    if (amount === "" || amount === null || amount === undefined)
        return ShowError(ChangeErroMessage("amount_required_error"));
    else
        amount = Number($("#txt_withdraw_amount").val());

    var profile = JSON.parse(Decryption(GetSessionStorage("userDetails")));

    if (amount < 10 || amount > Number(profile.withdrawLimit))
        return ShowError(ChangeErroMessage("min_max_amount_error_parameter", profile.withdrawLimit));

    if (WithdrawBankId === "" || WithdrawBankId === null || WithdrawBankId === undefined)
        return ShowError(ChangeErroMessage("plz_selet_bnk_error"));

    var model = {
        bankId: WithdrawBankId,
        amount: amount,
        accountNumber: $('#withdraw_account_number').val(),
        accountName: profile.name
    };

    if (model.accountNumber === "" || model.accountNumber === null || model.accountNumber === undefined)
        return ShowError(ChangeErroMessage("acc_no_req_error"));
    LoaderShow();
    try {
        var res = await PostMethod(transactionEndPoints.addwithdraw, model);
        if (res.status == 200) {
            ShowSuccess(res.response.message);
            ResetTransactionField(2);
            SetWithdrawLimit();
            RefreshBalance();
        }
        else {
            ShowError(res.response.message);
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
        return ShowError(ChangeErroMessage("amount_greater_zero_error"));

    if (amount < 1)
        return ShowError(ChangeErroMessage("amount_greater_one_error"));

    if (fromWallet == "")
        return ShowError(ChangeErroMessage("select_from_wallet_error"));

    if (toWallet == "")
        return ShowError(ChangeErroMessage("select_to_wallet_error"));

    var data = JSON.parse(Decryption(GetSessionStorage("siteData")));
    var fromWalletData = data.WalletData.filter(x => x.id == fromWallet && x.isMaintenance == false);
    await LoadBalanceBasedOnWalletNameAsync(fromWalletData[0].walletType);
    var balance = await ReturnBalanceBasedOnWalletName(fromWalletData[0].walletType);

    if (amount > Number(balance))
        return ShowError(ChangeErroMessage("Insufficient_balance_wallet"));

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
        else {
            ShowError(res.response.message);
            ResetTransactionField(3);
        }
        LoaderHide()
    }
    catch (e) {
        LoaderHide()
    }

}

function SetHistorySectionName(name) {
    HistorySectionName = name;
    fromDate = null;
    toDate = null;
    pageNumber = 0;
    $(".remove-active-class>li.active").removeClass("active");
    $("#today-filter").addClass("active");
    GetTodayDate();
}

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
                    html += '<a class="active hand-curson" onclick="ClickOnPageNumber(\'' + i + '\')">' + i + '</a>';
                else
                    html += '<a class="hand-curson" onclick="ClickOnPageNumber(\'' + i + '\')">' + i + '</a>';
            html += '<a class="hand-curson" onclick="ClickOnPageNumber(\'' + (CurrentPage + 1) + '\')">&raquo;</a>'
            $('#' + Id).html(html);
        }
        else {
            if (CurrentPage == TotalPages) {
                var html = '<a class="hand-curson">&laquo;</a>';
                $('#' + Id).html(html);
                for (i = TotalPages - 4; i <= TotalPages; i++)
                    if (i == CurrentPage)
                        html += '<a class="active hand-curson" onclick="ClickOnPageNumber(\'' + i + '\')">' + i + '</a>';
                    else
                        html += '<a class="hand-curson" onclick="ClickOnPageNumber(\'' + i + '\')">' + i + '</a>';
                $('#' + Id).html(html);
            }
            else {
                if (TotalPages > CurrentPage + 2) {
                    var html = '<a class="hand-curson" onclick="ClickOnPageNumber(\'' + (CurrentPage - 1) + '\')">&laquo;</a>';
                    $('#' + Id).html(html);
                    for (i = CurrentPage - 2; i <= CurrentPage + 2; i++)
                        if (i == CurrentPage)
                            html += '<a class="active hand-curson" onclick="ClickOnPageNumber(\'' + i + '\')">' + i + '</a>';
                        else
                            html += '<a class="hand-curson" onclick="ClickOnPageNumber(\'' + i + '\')">' + i + '</a>';
                    html += '<a class="hand-curson" onclick="ClickOnPageNumber(\'' + (CurrentPage + 1) + '\')">&raquo;</a>'
                    $('#' + Id).html(html);
                }
                else {
                    var html = '<a class="hand-curson" onclick="ClickOnPageNumber(\'' + (CurrentPage - 1) + '\')">&laquo;</a>';
                    $('#' + Id).html(html);
                    for (i = TotalPages - 4; i <= TotalPages; i++)
                        if (i == CurrentPage)
                            html += '<a class="active hand-curson" onclick="ClickOnPageNumber(\'' + i + '\')">' + i + '</a>';
                        else
                            html += '<a class="hand-curson" onclick="ClickOnPageNumber(\'' + i + '\')">' + i + '</a>';
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
                html += '<a class="active hand-curson" onclick="ClickOnPageNumber(\'' + i + '\')">' + i + '</a>';
            else
                html += '<a class="hand-curson" onclick="ClickOnPageNumber(\'' + i + '\')">' + i + '</a>';
        $('#' + Id).html(html);
    }
}

function ClickOnPageNumber(PageNumber) {
    pageNumber = PageNumber - 1;
    CallFunctionAccordingToTab();
}

Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

function GetDateFormate(Date1, Date2) {
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

    $("#datepicker1").val(day1 + "/" + Month1 + "/" + Year1)
    $("#datepicker2").val(day2 + "/" + Month2 + "/" + Year2)

    fromDate = Year1 + "-" + Month1 + "-" + day1 + " 00:00:00";
    toDate = Year2 + "-" + Month2 + "-" + day2 + " 23:59:59";
}

function GetTodayDate() {
    $("#datepicker1").val("")
    $("#datepicker2").val("")
    pageNumber = 0;
    var date = new Date();
    GetDateFormate(date, date);
    CallFunctionAccordingToTab();
};

function Get3DayDate() {
    $("#datepicker1").val("")
    $("#datepicker2").val("")
    pageNumber = 0;
    var fdate = new Date().addDays(-3);
    var tdate = new Date();
    GetDateFormate(fdate, tdate)
    CallFunctionAccordingToTab();
};

function GetInWeekDate() {
    $("#datepicker1").val("")
    $("#datepicker2").val("")
    pageNumber = 0;
    var curr = new Date(); // get current date
    var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
    var firstday = new Date(curr.setDate(first + 1))
    var lastday = firstday.addDays(6)
    GetDateFormate(firstday, lastday);
    CallFunctionAccordingToTab();
}

function GetInMonthDate() {
    $("#datepicker1").val("")
    $("#datepicker2").val("")
    pageNumber = 0;
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    GetDateFormate(firstDay, lastDay);
    CallFunctionAccordingToTab();
}

function GetDateRange() {
    pageNumber = 0;
    var fdate = $("#datepicker1").val().split("/");
    var tdate = $("#datepicker2").val().split("/");
    fromDate = fdate[2] + "-" + fdate[1] + "-" + fdate[0] + " 00:00:00";
    toDate = tdate[2] + "-" + tdate[1] + "-" + tdate[0] + " 23:59:59";
    CallFunctionAccordingToTab();
}

function CallFunctionAccordingToTab() {
    if (GetLocalStorage('currentUser') !== null)
        switch (HistorySectionName) {
            case "Transfer": TransferHistory(); break;
            case "BettingSummery": BettingHistory(); break;
            case "WithdrawDeposit": WithdrawDepositHistory(); break;
            case "Promotion": PromotionHistory(); break;
            case "Rebate": RebateHistory(); break;
            case "Reward": RewardHistory(); break;
        }
}

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
        else {
            $("#tbl_transferHistory_pagination").html("");
            var html = '<tr><td colspan="5">No Transaction yet</td></tr>'
            $("#tbl_transferHistory").find('tbody').html(html);
        }
    }
}

async function WithdrawDepositHistory(FromDate = null, ToDate = null, PageSize = null, PageNumber = null) {
    let model = {
        pageNo: PageNumber == null ? pageNumber : PageNumber,
        pageSize: PageSize == null ? pageSize : PageSize,
        fromDate: FromDate == null ? fromDate : FromDate,
        toDate: ToDate == null ? toDate : ToDate
    }
    var res = await PostMethod(transactionEndPoints.withdrawDepositHistroy, model);
    if (res.status == 200) {
        if (res.response.data.result.length > 0) {
            var data = res.response.data.result;
            $("#tbl_withdrawdepositHistory").find("tr:gt(0)").remove();
            var html = ""
            for (i = 0; i < data.length; i++) {
                html += '<tr><td>' + APIDateFormate(data[i].Created) + '</td ><td><span class="blue_color_text">' + parseFloat(data[i].Amount).toFixed(2) + '</span></td><td>' + data[i].Method + '</td><td><span class="' + data[i].Status + '_color">' + data[i].Status + '</span></td><td>' + data[i].Type + '</td></tr>';
            }
            $("#tbl_withdrawdepositHistory").find('tbody').html(html);

            if (res.response.data.total > 8) {
                CreatePagination('tbl_withdrawdepositHistory_pagination', res.response.data.totalPages, res.response.data.offset + 1);
            }
            else {
                $("#tbl_withdrawdepositHistory_pagination").html("");
            }

        }
        else {
            $("#tbl_withdrawdepositHistory_pagination").html("");
            var html = '<tr><td colspan="5">No Transaction yet</td></tr>'
            $("#tbl_withdrawdepositHistory").find('tbody').html(html);
        }
    }
}

async function PromotionHistory(FromDate = null, ToDate = null, PageSize = null, PageNumber = null) {
    let model = {
        pageNo: PageNumber == null ? pageNumber : PageNumber,
        pageSize: PageSize == null ? pageSize : PageSize,
        fromDate: FromDate == null ? fromDate : FromDate,
        toDate: ToDate == null ? toDate : ToDate
    }
    var res = await PostMethod(transactionEndPoints.promotionHistroy, model);

    if (res.status == 200) {
        if (res.response.data.result.length > 0) {
            var data = res.response.data.result;
            $("#tbl_promotionHistory").find("tr:gt(0)").remove();
            var html = ""
            for (i = 0; i < data.length; i++) {
                html += '<tr><td>' + APIDateFormate(data[i].Created) + '</td><td>' + APIDateFormate(data[i].ExpiryDate) + '</td><td>' + data[i].Title + '</td><td><span class="blue_color_text">' + parseFloat(data[i].DepositAmount).toFixed(2) + '</span></td><td><span class="blue_color_text">' + parseFloat(data[i].BonusAmount).toFixed(2) + '</span></td><td><span class="blue_color_text">' + parseFloat(data[i].TurnoverTarget).toFixed(2) + '</span></td><td><span class="blue_color_text">' + parseFloat(data[i].UserTurnover).toFixed(2) + '</span></td><td><span class="' + data[i].Staus.replace(" ", "_").toLowerCase() + '_color">' + data[i].Staus + '</span></td></tr>';
            }
            $("#tbl_promotionHistory").find('tbody').html(html);

            if (res.response.data.total > 8) {
                CreatePagination('tbl_promotionHistory_pagination', res.response.data.totalPages, res.response.data.offset + 1);
            }
            else {
                $("#tbl_promotionHistory_pagination").html("");
            }

        }
        else {
            $("#tbl_promotionHistory_pagination").html("");
            var html = '<tr><td colspan="8">No Transaction yet</td></tr>'
            $("#tbl_promotionHistory").find('tbody').html(html);
        }
    }
}

async function RebateHistory(FromDate = null, ToDate = null, PageSize = null, PageNumber = null) {
    let model = {
        pageNo: PageNumber == null ? pageNumber : PageNumber,
        pageSize: PageSize == null ? pageSize : PageSize,
        fromDate: FromDate == null ? fromDate : FromDate,
        toDate: ToDate == null ? toDate : ToDate
    }
    var res = await PostMethod(transactionEndPoints.rebateHistroy, model);

    if (res.status == 200) {
        if (res.response.data.result.length > 0) {
            var data = res.response.data.result;
            $("#tbl_RebateHistory").find("tr:gt(0)").remove();
            var html = ""
            for (i = 0; i < data.length; i++) {
                html += '<tr><td>' + APIDateFormate(data[i].created) + '</td> <td>' + data[i].gameName + '</td><td><span class="blue_color_text">' + parseFloat(data[i].turnover).toFixed(2) + '</span></td><td><span class="blue_color_text">' + parseFloat(data[i].rolling).toFixed(2) + '</span></td><td><span class="blue_color_text">' + parseFloat(data[i].bet).toFixed(2) + '</span></td><td><span class="blue_color_text">' + parseFloat(data[i].winLose).toFixed(2) + '</span></td><td><span class="blue_color_text">' + parseFloat(data[i].commAmount).toFixed(2) + '</span></td></tr>';
            }
            $("#tbl_RebateHistory").find('tbody').html(html);

            if (res.response.data.total > 8) {
                CreatePagination('tbl_RebateHistory_pagination', res.response.data.totalPages, res.response.data.offset + 1);
            }
            else {
                $("#tbl_RebateHistory_pagination").html("");
            }

        }
        else {
            $("#tbl_promotionHistory_pagination").html("");
            var html = '<tr><td colspan="7">No Transaction yet</td></tr>'
            $("#tbl_RebateHistory").find('tbody').html(html);
        }
    }
}

async function RewardHistory(FromDate = null, ToDate = null, PageSize = null, PageNumber = null) {
    let model = {
        pageNo: PageNumber == null ? pageNumber : PageNumber,
        pageSize: PageSize == null ? pageSize : PageSize,
        fromDate: FromDate == null ? fromDate : FromDate,
        toDate: ToDate == null ? toDate : ToDate
    }
    var res = await PostMethod(transactionEndPoints.rewadHistroy, model);
    if (res.status == 200) {
        if (res.response.data.result.length > 0) {
            var data = res.response.data.result;
            $("#tbl_rewardHistory").find("tr:gt(0)").remove();
            var html = ""
            for (i = 0; i < data.length; i++) {
                html += '<tr><td>' + APIDateFormate(data[i].Created) + '</td> <td>' + data[i].TransactionType + '</td><td><span class="blue_color_text">' + data[i].Amount + '</span></td><td><span class="blue_color_text">' + parseFloat(data[i].CurrentBalance).toFixed(2) + '</span></td></tr>';
            }
            $("#tbl_rewardHistory").find('tbody').html(html);

            if (res.response.data.total > 8) {
                CreatePagination('tbl_rewardHistory_pagination', res.response.data.totalPages, res.response.data.offset + 1);
            }
            else {
                $("#tbl_rewardHistory_pagination").html("");
            }

        }
        else {
            $("#tbl_promotionHistory_pagination").html("");
            var html = '<tr><td colspan="4">No Transaction yet</td></tr>'
            $("#tbl_rewardHistory").find('tbody').html(html);
        }
    }
}

async function BettingHistory(FromDate = null, ToDate = null, PageSize = null, PageNumber = null) {
    let model = {
        pageNo: PageNumber == null ? pageNumber : PageNumber,
        pageSize: PageSize == null ? pageSize : PageSize,
        fromDate: FromDate == null ? fromDate : FromDate,
        toDate: ToDate == null ? toDate : ToDate
    }
    var res = await PostMethod(transactionEndPoints.bettingSummeryHistroy, model);

    if (res.status == 200) {
        if (res.response.data.result.length > 0) {
            var data = res.response.data.result;
            $("#tbl_bettingsummeryHistory").find("tr:gt(0)").remove();
            var html = ""
            for (i = 0; i < data.length; i++) {
                html += '<tr><td>' + data[i].GameName + '</td><td><span class="blue_color_text">' + data[i].BetCount + '</span></td><td><span class="blue_color_text">' + parseFloat(data[i].BetAmount).toFixed(2) + '</span></td><td><span class="blue_color_text">' + parseFloat(data[i].VaildBetAmount).toFixed(2) + '</span></td><td><span class="blue_color_text">' + parseFloat(data[i].TotalRebate).toFixed(2) + '</span></td></tr>';
            }
            $("#tbl_bettingsummeryHistory").find('tbody').html(html);

            if (res.response.data.total > 8) {
                CreatePagination('tbl_bettingsummeryHistory_pagination', res.response.data.totalPages, res.response.data.offset + 1);
            }
            else {
                $("#tbl_bettingsummeryHistory_pagination").html("");
            }

        }
        else {
            $("#tbl_promotionHistory_pagination").html("");
            var html = '<tr><td colspan="5">No Transaction yet</td></tr>'
            $("#tbl_bettingsummeryHistory").find('tbody').html(html);
        }
    }
}

//#region UploadReceipt
var selDiv = "";
TableData = new Array();
document.addEventListener("DOMContentLoaded", init, false);
function init() {
    if (document.querySelector('#receipt') !== null) {
        document.querySelector('#receipt').addEventListener('change', handleFileSelect, false);
        selDiv = document.querySelector("#selectedFiles");
    }
}

async function handleFileSelect1(id) {
    if (filter_array(TableData).length === 0) {
        ShowError(ChangeErroMessage("receipt_required_error"));
    } else {
        var model = {
            id: id,
            images: filter_array(TableData)
        };
        var res = await PostMethod(transactionEndPoints.uploadReceipt, model);
        if (res !== null && res !== undefined) {
            ShowSuccess(res.message);
        }
    }
}

var files = [];
async function handleFileSelect(e) {
    if (!e.target.files) return;
    if (!e.target.files[0].type.includes("image") && !e.target.files[0].type.includes("pdf")) return ShowError(ChangeErroMessage("file_format_error"));
    selDiv.innerHTML = "";
    var allFiles = e.target.files;

    for (var i = 0; i < allFiles.length; i++) {
        files.push(allFiles[i]);
    }
    loadImage();

    var list = document.getElementById('selectedFiles');
    list.addEventListener('click', function (e) {
        if (e.target && e.target.nodeName === "BUTTON") {
            e.target.parentNode.remove();
        }
    });
}

function functiontofindIndexByKeyValue(arraytosearch, key, valuetosearch) {
    for (var i = 0; i < arraytosearch.length; i++) {
        if (arraytosearch[i][key] === valuetosearch) {
            return i;
        }
    }
    return null;
}

function btn(j) {
    var index = functiontofindIndexByKeyValue(files, name, files[j].name);
    files.splice(j, 1);
    loadImage();
    TableData.splice(j, 1);
}

const readUploadedFileAsDataURL = (inputFile) => {
    const temporaryFileReader = new FileReader();
    return new Promise((resolve, reject) => {
        temporaryFileReader.onerror = () => {
            temporaryFileReader.abort();
            reject(new DOMException("Problem parsing input file."));
        };
        temporaryFileReader.onload = () => {
            resolve(temporaryFileReader.result);
        };
        temporaryFileReader.readAsDataURL(inputFile);
    });
};

async function loadImage() {
    selDiv.innerHTML = "";
    for (var j = 0; j < files.length; j++) {
        var base = await readUploadedFileAsDataURL(files[j]);
        TableData[j] = {
            base64images: base
        };
        selDiv.innerHTML += '<li id="li' + j + '" value=' + j + ' class="element">' + files[j].name + '<button onclick="btn(' + j + ')">X</button>' + '</li>';
    }
}

function filter_array(test_array) {
    var index = -1,
        arr_length = test_array ? test_array.length : 0,
        resIndex = -1,
        result = [];
    while (++index < arr_length) {
        var value = test_array[index];
        if (value) {
            result[++resIndex] = value;
        }
    }
    return result;
}

//#endregion

function SetDepositPromotionId(Id) {
    DepositPromotionId = Id;
}

function ResetPromotionId() {
    DepositPromotionId = undefined;
}

async function SetUserDepositPromotion() {
    let model = {}
    var res = await PostMethod(accountEndPoints.userDepositPromotion, model);
    if (res.status == 200) {
        if (res.response.data.length > 0) {
            var data = res.response.data;
            var html = "";
            var description = "";
            for (i = 0; i < data.length; i++) {
                html += '<li class="tablinks hand-curson"><a class="thm-txt" data-toggle="tab"><img onclick="SetDepositPromotionId(\'' + data[i].id + '\')" src="' + data[i].bannerImage + '"></a><p>' + data[i].promotionTitle + '&nbsp;&nbsp;<i href="#' + data[i].id + '" data-toggle="modal" class="fa fa-question-circle hand-curson" aria-hidden="true"></i></p></li>'
                description +=
                    '<div class="modal fade Reload_bonus_myModal" id="' + data[i].id + '" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">x</button><h4 class="modal-title"><span>' + data[i].promotionTitle + '</span></h4></div><div class="modal-body">' + data[i].description + '</div></div></div ></div >';
            }

            SetAllValueInElement("deposit_promotion_description_section", description);
            SetAllValueInElement("deposit_promotion", html);
        }
    }
}

async function AllInWallet(WalletName) {
    SetLoadingImageBaseOnWalletName(WalletName);
    let model = {
        walletName: WalletName
    }
    await PostMethod(transactionEndPoints.allInWallet, model);
    LoadBalanceBasedOnWalletNameAsync("Main Wallet");
    LoadBalanceBasedOnWalletNameAsync(WalletName);
}

async function UpdateAutoTransfer() {
    let model = {
        autoTransfer: $("#auto_transfer_checkbox").prop("checked")
    };
    await PostMethod(accountEndPoints.updateProfile, model);
    await GetProfileAndSetInSessionStorage()
}

async function CheckVaderPayMainteance() {
    var res = await GetMethod(settingEndPoints.VaderPayMainteanceSelect);
    if (res.status == 200) {
        if (res.response.data.vaderPay.value == "true") {
            $("#vader-pay-maintenance").css("display", "");
            $("#vader-pay-non-maintenance").css("display", "none");
        }
    }
}

function ButtonDisabled(btnId, Condtion) {
    if (Condtion)
        $("#" + btnId).attr("disabled", "disabled")
    else
        $("#" + btnId).removeAttr("disabled");
}

async function CheckSupportGame() {
    let model = {}
    var res = await PostMethod(accountEndPoints.GetGameSupport, model);
    if (res.response.data.length > 0) {
        ButtonDisabled("918kiss-wallet-allin", !res.response.data[0].Is918Kiss);
        ButtonDisabled("ag-wallet-allin", !res.response.data[0].IsAG);
        ButtonDisabled("allbet-wallet-allin", !res.response.data[0].IsAllBet);
        ButtonDisabled("dg-wallet-allin", !res.response.data[0].IsDG);
        ButtonDisabled("joker-wallet-allin", !res.response.data[0].IsJoker);
        ButtonDisabled("m8-wallet-allin", !res.response.data[0].IsM8);
        ButtonDisabled("maxbet-wallet-allin", !res.response.data[0].IsMaxbet);
        ButtonDisabled("mega888-wallet-allin", !res.response.data[0].IsMega888);
        ButtonDisabled("playtech-wallet-allin", !res.response.data[0].IsPlaytech);
        ButtonDisabled("pragmatic-wallet-allin", !res.response.data[0].IsPragmatic);
        ButtonDisabled("pussy888-wallet-allin", !res.response.data[0].IsPussy888);
        ButtonDisabled("sa-wallet-allin", !res.response.data[0].IsSA);
        ButtonDisabled("sexy-wallet-allin", !res.response.data[0].IsSexyBaccarat);
        ButtonDisabled("wm-wallet-allin", !res.response.data[0].IsWM);
        ButtonDisabled("yeebet-wallet-allin", !res.response.data[0].IsYEEBET);
    }
}
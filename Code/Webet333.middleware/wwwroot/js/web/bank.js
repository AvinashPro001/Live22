$(document).ready(function () {
    UsersBankDetails();
});

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

var WithdrawBankId;
function SetWithdrawBankIdInVariable(Id, BankName) {
    WithdrawBankId = Id;
    $.each(UserBank, function () {
        if (BankName == this.bankName) {
            $('#withdraw_account_number').val(this.accountNo);
            $("#withdraw_account_number").attr("disabled", "disabled");
        }
        else {
            $('#withdraw_account_number').val("");
            $("#withdraw_account_number").removeAttr("disabled");
        }
    });
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

var UserBank;
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


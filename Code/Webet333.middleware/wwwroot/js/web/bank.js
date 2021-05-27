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


async function SetWithdrawPageBank() {
    console.log("Inside");
    var data = JSON.parse(Decryption(GetSessionStorage("siteData")));
    allbankHTML = ""
    if (data.AllBankPageData !== null && data.AllBankPageData !== undefined) {
        for (i = 0; i < data.AllBankPageData.length; i++)
            allbankHTML += '<li class="tablinks"><a class="thm-txt" href="#" data-toggle="tab" ><figure onclick="SetWithdrawBankIdInVariable(\'' + data.AllBankPageData[i].id + '\')"><img style="object-position:center !important" class="tab-bankicon" src="' + data.AllBankPageData[i].Logo + '" alt=""></figure></a><p>' + data.AllBankPageData[i].bankName + '</p></li>';

        SetAllValueInElement("withdraw_bank_list", allbankHTML);
    }
}


var WithdrawBankId;
function SetWithdrawBankIdInVariable(Id) {
    WithdrawBankId = Id;
}
async function CallAPIForBankPages() {
    var data = JSON.parse(Decryption(GetSessionStorage("siteData")))
    
    if (data.AdminBankPageData == null || data.AdminBankPageData == undefined) {

        let res = await GetMethodWithoutToken(settingEndPoints.admin_page_bank);

        if (res.status == 200) {
            data.AdminBankPageData = res.response.data;
            SetSessionStorage("siteData", Encryption(JSON.stringify(data)))
        }
    }

    var result = data.AdminBankPageData.bankDetails;

    $("#bankdetail").find("tr:gt(0)").remove();
    var RowCount = 0;
    var table = document.getElementById("bankdetail");
    for (i = 0; i < result.length; i++) {
        var row = table.insertRow(RowCount + 1);
        row.insertCell(0).innerHTML = "<img src='" + result[i].bankLogo + "' width='150px'/> ";
        row.insertCell(1).innerHTML = result[i].accountName;
        row.insertCell(2).innerHTML = result[i].accountNo;
        RowCount++;
    }


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

    document.getElementById("UpdateTime").innerHTML = DisplayCurrentTime();
}
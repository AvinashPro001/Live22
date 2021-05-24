//#region OnLoad Function
$(document).ready(function () {
    CallAPIForBankPages();
});
//#endregion

async function CallAPIForBankPages() {
    var data = JSON.parse(Decryption(GetSessionStorage("siteData")))
    console.log(data);
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


}
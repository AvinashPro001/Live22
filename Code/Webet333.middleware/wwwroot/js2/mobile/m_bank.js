//#region Onload
$(document).ready(function () {
    //if (GetLocalStorage('currentUser') !== null) {
    //    BankList();
    //    UserBankDetails();
    GetProfile();
    //}
});
//#endregion

//#region Users Bank Details
async function UserBankDetails() {
    var model = {
    };
    var res = await PostMethod(apiEndPoints.userBankDetail, model);
    if (res !== null && res !== undefined) {
        result = res.data;
        userBank = res.data;
        for (var i = 0; i < userBank.length; i++) {
            UserBankName = userBank[i].bankName;
            UserAccountNumber = userBank[i].accountNo;
            UserAccountName = userBank[i].accountName;
        }
    }
    WithdrawUsernameSet();
}
//#endregion Users Bank Details

//#region Withdraw Username
async function WithdrawUsernameSet() {
    if (location.href.toLowerCase().includes("?p=withdraw"))
        if (UserAccountName != null && UserAccountName != undefined && UserAccountName != "") {
            //document.getElementById("lbl_accountHolder").disabled = true;
            //document.getElementById("lbl_accountHolder").value = UserAccountName;
        }
}
//#endregion Withdraw Username

//#region BankList
var depositMethodId, UserBankName, SelectBankWithdrawl, SelectBankDeposit, UserAccountNumber, UserAccountName, SelectPromotion = "";

TableData = new Array();

var allWalletList;

async function DepositBankList() {
    var res = await GetMethod(apiEndPoints.depositDdl);

    if (res !== null && res !== undefined) {
        var DepsoitBankList = document.getElementById("Deposit_bank_list");
        var name = res.data.bankDetails;
        depositMethodId = res.data.depositMethods.filter(x => x.method == 'Bank Transfer')[0].id;
        var firstSelect = true;
        if (DepsoitBankList != null)
            $.each(name, function () {
                if (firstSelect) {
                    DepsoitBankList.innerHTML += '<li onclick="LiSelectDepositFunction(\'' + this.id + '\',\'' + this.accountName + '\',\'' + this.accountNo + '\')" id="' + this.id + '" ><input type="radio" name="rtest" checked="" id="bankListId" values="' + this.id + '"/><label for="' + this.id + '" title="state" class="bank-list-deposit blk-text"><figure><img class="icon-bank-info" src="' + this.bankIconLogo + '" alt="Maybank" /></figure><p>' + this.bankName + '</p></label></li>';
                    firstSelect = false;
                    LiSelectDepositFunction(this.id, this.accountName, this.accountNo);
                }
                else {
                    DepsoitBankList.innerHTML += '<li onclick="LiSelectDepositFunction(\'' + this.id + '\',\'' + this.accountName + '\',\'' + this.accountNo + '\')" id="' + this.id + '" ><input type="radio" name="rtest" checked="" id="bankListId" values="' + this.id + '"/><label for="' + this.id + '" title="state" class="bank-list-deposit blk-text"><figure><img class="icon-bank-info" src="' + this.bankIconLogo + '" alt="Maybank" /></figure><p>' + this.bankName + '</p></label></li>';
                }
            });
    }
}

async function WithdrawBankList() {
    var withdrawBankList = document.getElementById('withdraw_bank_list');
    var BankList = await GetMethod(apiEndPoints.bank);
    bankList = BankList.data;
    if (withdrawBankList != null) {
        for (i = 0; i < BankList.data.length; i++) {
            if (UserBankName != BankList.data[i].bankName)
                withdrawBankList.innerHTML += '<li onclick="LISlectFunction(\'' + BankList.data[i].id + '\',\'' + BankList.data[i].bankName + '\')" id="' + BankList.data[i].id + '" ><input type="radio" name="rtest" checked="" id="bankListId" values="' + BankList.data[i].id + '"/><label for="' + BankList.data[i].id + '" title="state"><figure><img class="icon-bank-info" src="' + BankList.data[i].Logo + '" alt="Maybank" /></figure><p>' + BankList.data[i].bankName + '</p></label></li>';
            else {
                withdrawBankList.innerHTML += '<li class="active" onclick="LISlectFunction(\'' + BankList.data[i].id + '\',\'' + BankList.data[i].bankName + '\')" id="' + BankList.data[i].id + '" ><input type="radio" name="rtest" checked="" id="bankListId" values="' + BankList.data[i].id + '"/><label for="' + BankList.data[i].id + '" title="state"><figure><img class="icon-bank-info" src="' + BankList.data[i].Logo + '" alt="Maybank" /></figure><p>' + BankList.data[i].bankName + '</p></label></li>';
                LISlectFunction(BankList.data[i].id, BankList.data[i].bankName);
            }
        }
    }
}

async function TransferWalletList() {
    var res = await GetMethod(apiEndPoints.depositDdl);

    if (res !== null && res !== undefined) {
        var wallet = res.data.walletTypes;
        allWalletList = res.data.walletTypes;
        $.each(wallet, function () {
            $("#ddl_transferFromWallet").append($("<option />").val(this.id).text(this.walletType));
        });
    }
}

async function DepositPromotionList() {
    var x = screen.width;
    var model = {
        id: null,
        ismobile: true
    };
    var resPanel = await PostMethodWithParameter(apiEndPoints.promotionsDailyList, model);
    var promotion = resPanel.data;
    var promotionList = document.getElementById('promotion');
    var promotionInfo = document.getElementById('promotionInfo');
    var onlinePromotionList = document.getElementById('onlinePromotion');
    if (promotionList !== null) {
        for (l = 0; l < promotion.length; l++) {
            promotionList.innerHTML += '<li class="mar-btm-ten border" id=\'' + promotion[l].id + '\' onclick="LiSelectPromotion(\'' + promotion[l].id + '\')"><input type="radio" name="promotion" id="promotionId" value=\'' + promotion[l].id + '\'/><label><div class="promotion-content" for="rad1"><img class="full-img" src=\'' + promotion[l].bannerImage + '\' /><div class="deposit-promotion-details"><span class="fa fa-question-circle question-mark" data-toggle="modal" data-target="#promotionDetails" onclick="PromotionDetails(\'' + promotion[l].id + 'D' + '\')" style="margin-right:10px;"></span><p class="no-mar">' + promotion[l].promotionTitle + '</p></div></div></label></li>';
            promotionInfo.innerHTML += '<div id=\'' + promotion[l].id + 'D' + '\' style="display:none;">' + promotion[l].description + '</div>';
            onlinePromotionList.innerHTML += '<li class="mar-btm-ten border" id=\'online-' + promotion[l].id + '\' onclick="LiSelectPromotion(\'' + promotion[l].id + '\',true)"><input type="radio" name="promotion" id="promotionId" value=\'' + promotion[l].id + '\'/><label><div class="promotion-content" for="rad1"><img class="full-img" src=\'' + promotion[l].bannerImage + '\' /><div class="deposit-promotion-details"><span class="fa fa-question-circle question-mark" data-toggle="modal" data-target="#promotionDetails" onclick="PromotionDetails(\'' + promotion[l].id + 'D' + '\')" style="margin-right:10px;"></span><p class="no-mar">' + promotion[l].promotionTitle + '</p></div></div></label></li>';
        }
    }
}

async function BankList() {
}
//#endregion

function PromotionDetails(id) {
    var divsToHide = document.getElementById("promotionInfo");
    var child = divsToHide.childNodes[1];
    for (var i = 1; i < divsToHide.childNodes.length; i++) {
        divsToHide.childNodes[i].style.display = "none";
    }
    var promotionInfo = document.getElementById(id);
    promotionInfo.style.display = "block";
    promotionInfo.style.marginRight = "10px";
}

var WithdrawLimit;
async function CheckWithdrawAmountList() {
    var model = {}

    var resUserVIPlevel = await GetMethodWithReturn(apiEndPoints.UserVipDetails);
    sessionStorage.setItem("UserVipDetails", enc(JSON.stringify(resUserVIPlevel)));

    WithdrawLimit = parseFloat(resUserVIPlevel.data.WithdrawLimit).toFixed(2);
    document.getElementById("txt_withdrawalAmount").placeholder = "Min/Max Limit: 10.00/ " + WithdrawLimit;

    var WithdrawAmountList = await PostMethodWithParameter(apiEndPoints.withdrawListAmount, model);
    document.getElementById("WithdrawAmount").innerHTML = "MYR " + WithdrawAmountList.data.totalAmount;
    if (WithdrawAmountList.data.totalAmount > 0) {
        document.getElementById("lock_icon").style.display = "none";
        document.getElementById("WithdrawAmount").disabled = false;
    }
    else {
        document.getElementById("unlock_icon").style.display = "none";
        document.getElementById("WithdrawAmount").disabled = true;
    }

    var contentToRemove = document.querySelectorAll("#navWithdrawAmount");
    $(contentToRemove).remove();

    $("#tbl_WithdrawAmountList").find("tr:gt(0)").remove();
    var RowCount = 0;
    var table = document.getElementById("tbl_WithdrawAmountList");
    var result = WithdrawAmountList.data.list;
    for (i = 0; i < result.length; i++) {
        var row = table.insertRow(RowCount + 1);
        $("#tbl_WithdrawAmountList").addClass('white-bg');
        $("#tbl_WithdrawAmountList td").addClass('half-width text-center white-bg');
        row.insertCell(0).innerHTML = i + 1;
        row.insertCell(1).innerHTML = result[i].title;
        row.insertCell(2).innerHTML = result[i].withdrawAmount;
        row.insertCell(3).innerHTML = result[i].created;
        row.insertCell(4).innerHTML = result[i].status;
        RowCount++;
    }
    $('.total-available-withdraw-amount').remove();
    $('#tbl_WithdrawAmountList').after('<div class="total-available-withdraw-amount"><p>Total Available Withdraw Amount : ' + WithdrawAmountList.data.totalAmount + '<p></div>');
    var pageNum;
    $('#tbl_WithdrawAmountList').after('<div id="navWithdrawAmount"  class="pagination"></div>');
    var rowsShown = 11;
    var rowsTotal = $('#tbl_WithdrawAmountList thead tr').length;
    var numPages = rowsTotal / rowsShown;
    for (i = 0; i < numPages; i++) {
        pageNum = i + 1;
        $('#navWithdrawAmount').append('<a class="button" href="#History" rel="' + i + '">' + pageNum + '</a> ');
    }
    $('#tbl_WithdrawAmountList thead tr').hide();
    $('#tbl_WithdrawAmountList thead tr').slice(0, rowsShown).show();
    $('#navWithdrawAmount a:first').addClass('active');
    $('#navWithdrawAmount a').bind('click', function () {
        $('#navWithdrawAmount a').removeClass('active');
        $(this).addClass('active');
        var currPage = $(this).attr('rel');
        var startItem = currPage * rowsShown;
        var endItem = startItem + rowsShown;
        $('#tbl_WithdrawAmountList thead tr:gt(0)').css('opacity', '0.0').hide().slice(startItem, endItem).
            css('display', 'table-row').animate({ opacity: 1 }, 300);
    });
    if (pageNum > 10)
        $("#navWithdrawAmount").addClass("expand");
}

//#region GetProfile
var User_BankName;
async function GetProfile() {
    var res = await GetMethod(apiEndPoints.getProfile);
    User_BankName = res.data.name;;
    SetLocalStorage('918Username', res.data.username918);
}
//#endregion

//#region CopyText in Deposit
function copyText(id) {
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
//#endregion CopyText in Deposit

//#region Select Deposit Bank
function LiSelectDepositFunction(id, accountName, accountNumber) {
    $('#Deposit_bank_list li.active').removeClass('active');
    var d = document.getElementById(id);
    d.classList.add("active");
    SelectBankDeposit = id;
    document.getElementById('account_name').innerHTML = accountName;
    document.getElementById('account_number').innerHTML = accountNumber;
}
//#endregion Select Deposit Bank

//#region Select Withdraw Bank
function LISlectFunction(id, bankName) {
    $('#withdraw_bank_list li.active').removeClass('active');
    var w = document.getElementById(id);
    w.classList.add("active");
    SelectBankWithdrawl = id;

    var _userBank;
    $.each(userBank, function () {
        if (bankName == this.bankName) {
            _userBank = this.bankName
            UserAccountNumber = this.accountNo
        }
    });

    if (bankName != _userBank) {
        var AccountNumber = document.getElementById("txt_withdrawalAccountNumber");
        AccountNumber.value = "";
        AccountNumber.disabled = false;
    }
    else {
        var AccountNumber1 = document.getElementById("txt_withdrawalAccountNumber");
        AccountNumber1.value = UserAccountNumber;
        AccountNumber1.disabled = true;
    }
}
//#endregion select withdraw bank

//#region set Value in Deposit Amount
function setValue(i, online) {
    var Id;
    if (online)
        Id = "online_txt_amount";
    else
        Id = "txt_amount";

    switch (i) {
        case 50:
            document.getElementById(Id).value = 50;
            break;
        case 100:
            document.getElementById(Id).value = 100;
            break;
        case 300:
            document.getElementById(Id).value = 300;
            break;
        case 500:
            document.getElementById(Id).value = 500;
            break;
        case 1000:
            document.getElementById(Id).value = 1000;
            break;
    }
}
//#endregion set Value in Deposit Amount

//#region Promotion Select
function LiSelectPromotion(id, online) {
    if (online) {
        $('#onlinePromotion li.active').removeClass('active');
        if (id === SelectPromotion) {
            SelectPromotion = "";
        }
        else {
            if (id !== null) {
                var p = document.getElementById("online-" + id);
                p.classList.add("active");
                SelectPromotion = id;
            }
            else {
                SelectPromotion = "";
            }
        }
    }
    else {
        $('#promotion li.active').removeClass('active');
        if (id === SelectPromotion) {
            SelectPromotion = "";
        }
        else {
            if (id !== null) {
                var p = document.getElementById(id);
                p.classList.add("active");
                SelectPromotion = id;
            }
            else {
                SelectPromotion = "";
            }
        }
    }
}
//#endregion Promotion Select

//#region ResetForm
function reset(i) {
    if (i === 1) {
        document.getElementById("txt_datetime").value = "";
        document.getElementById("txt_amount").value = "";
        document.getElementById("txt_reference_number").value = "";
        var node = document.getElementById("selectedFiles");
        node.innerHTML = "";

        $('#Depsoit_bank_list li.active').removeClass('active');
        SelectBankDeposit = "";

        TableData = [];
        LiSelectPromotion(null);
        files.length = 0;   //Remove image file from array
    }
    if (i === 2) {
        $('#withdraw_bank_list li.active').removeClass('active');
        SelectBankWithdrawl = "";
        document.getElementById("txt_withdrawalAmount").value = "";
        document.getElementById("txt_withdrawalAccountNumber").value = "";
    }
    if (i === 3) {
        document.getElementById("walletBalance").innerHTML = "From Wallet";
        document.getElementById("txt_transferAmount").placeholder = "Max Limit: From Wallet";
        document.getElementById("txt_transferAmount").value = "";

        document.getElementById("formTransfer").reset();
        $('#ddl_transferToWallet option:not(:first)').remove();
    }
    if (i === 4) {
        $('#txt_currentPassword').val('');
        $('#txt_newPassword').val('');
    }
}
//#endregion

//#region UploadReceipt
async function handleFileSelect1(id) {
    if (filter_array(TableData).length === 0) {
        ShowError(ChangeErroMessage("receipt_required_error"));
    } else {
        var model = {
            id: id,
            images: filter_array(TableData)
        };
        var res = await PostMethod(apiEndPoints.uploadReceipt, model);
        if (res !== null && res !== undefined) {
            ShowSuccess(res.message);
        }
    }
}
readUploadedFileAsDataURL = (inputFile) => {
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

var selDiv = "";
document.addEventListener("DOMContentLoaded", init, false);
function init() {
    selDiv = "";
    if (document.querySelector('#receipt') !== null) {
        document.querySelector('#receipt').addEventListener('change', handleFileSelect, false);
        selDiv = document.querySelector("#selectedFiles");
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

//#endregion UploadReceipt

//#region Filter Array
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
//#endregion Filter Array

//#region Deposit

function OpenPaymentPage() {
    window.open("../Mobile/payment");
}

var depositModel;
var onlinePayment;
var IsDepositExecute = false;
async function Deposit(online) {
    LoaderShow();
    try {
        if (!IsDepositExecute) {
            IsDepositExecute = true;
            var amountId;
            if (online)
                amountId = "#online_txt_amount";
            else
                amountId = "#txt_amount";
            onlinePayment = online;
            if ($(amountId).val() === null || $(amountId).val() === "" || $(amountId).val() === undefined) {
                LoaderHide();
                IsDepositExecute = false;
                return ShowError(ChangeErroMessage("amount_required_error"));
            }

            if ($(amountId).val() <= 30000 && $(amountId).val() >= 10) {
                if ($(amountId).val() > 0) {
                    var radioValue = $("input[name='promotion']:checked").val();
                    var model;
                    if (online) {
                        model = {
                            amount: $(amountId).val(),
                            promotionId: SelectPromotion,
                            promotionApplyEligible: false
                        };
                    }
                    else {
                        model = {
                            bankId: SelectBankDeposit,
                            amount: $(amountId).val(),
                            depositMethodId: depositMethodId,
                            referenceNo: $('#txt_reference_number').val(),
                            depositeTime: Date.parse(document.getElementById("txt_datetime").value.replace(" ", "T")).toString(),
                            promotionId: SelectPromotion,
                            promotionApplyEligible: false
                        };
                    }
                    if (!online) {
                        if (model.bankId === null || model.bankId === "" || model.bankId === undefined) {
                            LoaderHide();
                            IsDepositExecute = false;
                            return ShowError(ChangeErroMessage("plz_selet_bnk_error"));
                        }

                        if (model.depositeTime === "NaN") {
                            LoaderHide();
                            IsDepositExecute = false;
                            return ShowError(ChangeErroMessage("select_date_time_error"));
                        }

                        if (model.referenceNo === "") {
                            LoaderHide();
                            IsDepositExecute = false;
                            return ShowError(ChangeErroMessage("refer_no_error"));
                        }

                        if (filter_array(TableData).length === 0) {
                            LoaderHide();
                            IsDepositExecute = false;
                            return ShowError(ChangeErroMessage("receipt_required_error"));
                        }
                    }

                    if (model.promotionId != "") {
                        if (online) {
                            localStorage.setItem("IsWindowClose", false)
                            OpenPaymentPage();
                        }

                        await WalletBalance();
                        var promotionModel = {
                            userid: null,
                            amount: Number(model.amount)
                        };
                        var walletData = await PostMethodWithParameter(apiEndPoints.promotionApplyCheck, promotionModel);

                        if (walletData.data.IsPending == false) {
                            if (walletData.data.InMaintenance == false) {
                                if (walletData.data.CheckPromotionApply === true && walletData.data.TotalPromotionRow > 0) {
                                    if (online)
                                        localStorage.setItem("IsWindowClose", true);
                                    if (confirm(ChangeErroMessage("promo_apply_balance_error"))) {
                                        if (online) {
                                            localStorage.setItem("IsWindowClose", false)
                                            OpenPaymentPage();
                                        }
                                        model.promotionApplyEligible = true;
                                    }
                                    else {
                                        if (online) {
                                            localStorage.setItem("IsWindowClose", false)
                                            OpenPaymentPage();
                                        }
                                        model.promotionId = "";
                                    }
                                }
                                else {
                                    if (walletData.data.Staus != null && walletData.data.CheckPromotionRemind == true) {
                                        LoaderHide();
                                        if (online)
                                            localStorage.setItem("IsWindowClose", true);
                                        IsDepositExecute = false;
                                        return ShowError(ChangeErroMessage("promot_active_error"));
                                    }

                                    if (walletData.data.CheckPromotionRemind == true) {
                                        model.promotionApplyEligible = true;
                                        depositModel = model;
                                    }

                                    if (walletData.data.Staus == null) {
                                        model.promotionApplyEligible = true;
                                    }
                                }
                            }
                            else {
                                LoaderHide();
                                if (online)
                                    localStorage.setItem("IsWindowClose", true);
                                IsDepositExecute = false;
                                return ShowError(ChangeErroMessage("game_in_maintenance_new_promotion"));
                            }
                        }
                        else {
                            LoaderHide();
                            if (online)
                                localStorage.setItem("IsWindowClose", true);
                            IsDepositExecute = false;
                            return ShowError(ChangeErroMessage("pending_sports_deposit_error"));
                        }
                    }
                    else {
                        if (online) {
                            localStorage.setItem("IsWindowClose", false)
                            OpenPaymentPage();
                        }
                        let data = {
                        }
                        var walletData = await PostMethodWithParameter(apiEndPoints.DepositCheckWithoutPromotion, data);
                        if (walletData.data.CheckPopupWithoutPromotion == true) {
                            LoaderHide();
                            depositModel = model;
                        }
                        else {
                            LoaderHide();
                            depositModel = model;
                            if (online)
                                localStorage.setItem("IsWindowClose", true);
                            $("#promotionNavigate").modal();
                            IsDepositExecute = false;
                            return 0;
                        }
                    }

                    if (!online) {
                        if (filter_array(TableData).length === 0) {
                            IsDepositExecute = false;
                            ShowError(ChangeErroMessage("receipt_required_error"));
                        } else {
                            depositModel = model;
                            IsDepositExecute = false;
                            await DepositAfterPromotion();
                        }
                    } else {
                        depositModel = model;
                        IsDepositExecute = false;
                        await DepositAfterPromotion();
                    }
                }
                else {
                    IsDepositExecute = false;
                    ShowError(ChangeErroMessage("amount_greater_zero_error"));
                }
                LoaderHide();
            }
            else {
                LoaderHide();
                IsDepositExecute = false;
                ShowError(ChangeErroMessage("min_max_amount_error"));
            }
        }
    }
    catch (e) {
        IsDepositExecute = false;
    }
}

async function PromotionApplyInsert() {
    await DepositAfterPromotion();
}

async function DepositAfterPromotion() {
    LoaderShow();
    try {
        if (!IsDepositExecute) {
            IsDepositExecute = true;
            if (onlinePayment) {
                if (depositModel.promotionId == "") {
                    localStorage.setItem("IsWindowClose", false);
                    OpenPaymentPage();
                }
                var res = await PostMethod(apiEndPoints.onlinePayment, depositModel);
                if (res !== null && res !== undefined) {
                    localStorage.setItem("gameURL", res.data.redirect_to)
                }
                IsDepositExecute = false;
            }
            else {
                var res = await PostMethod(apiEndPoints.addDeposite, depositModel);
                if (res !== null && res !== undefined) {
                    await handleFileSelect1(res.data.id);
                    //ShowSuccess(res.message);
                    reset(1);
                    setTimeout(function () {
                        document.getElementById('promotion').innerHTML = "";
                        document.getElementById('Deposit_bank_list').innerHTML = "";
                        SelectBankDeposit = null;
                        BankList();
                    }, 200);
                }
                IsDepositExecute = false;
            }
        }
    }
    catch (e) {
        IsDepositExecute = false;
    }
    LoaderHide();
}
//#endregion Deposit

//#region Withdrawal
async function Withdrawal() {
    //LoaderShow();
    if ($('#txt_withdrawalAmount').val() === null || $('#txt_withdrawalAmount').val() === "" || $('#txt_withdrawalAmount').val() === undefined) {
        LoaderHide();
        return ShowError(ChangeErroMessage("amount_required_error"));
    }
    if ($('#txt_withdrawalAmount').val() <= Number(WithdrawLimit) && $('#txt_withdrawalAmount').val() >= 10) {
        //await regisrationGame();
        if ($('#txt_withdrawalAmount').val() > 0) {
            var model = {
                bankId: SelectBankWithdrawl,
                amount: $('#txt_withdrawalAmount').val(),
                accountNumber: $('#txt_withdrawalAccountNumber').val(),
                //accountName: UserAccountName != null && UserAccountName != undefined && UserAccountName != "" ? UserAccountName : $('#lbl_accountHolder').val()
                accountName: User_BankName
            };

            if (model.bankId === "" || model.bankId === null || model.bankId === undefined) {
                //LoaderHide();
                return ShowError(ChangeErroMessage("plz_selet_bnk_error"));
            }
            if (model.amount === "") {
                //LoaderHide();
                return ShowError(ChangeErroMessage("amt_req_error"));
            }

            if (model.accountNumber === "") {
                //LoaderHide();
                return ShowError(ChangeErroMessage("acc_no_req_error"));
            }

            if (model.amount < 0) {
                //LoaderHide();
                return ShowError(ChangeErroMessage("amount_greater_zero_error"));
            }

            var promotionModel = {
                userid: null,
                amount: Number(model.amount)
            };

            //var CheckPromotionApply = await PostMethodWithParameter(apiEndPoints.promotionApplyCheck, promotionModel);
            //if (CheckPromotionApply.data.Staus != null && CheckPromotionApply.data.TotalPromotionRow > 0) {
            //
            //    return ShowError(ChangeErroMessage("promo_ongoing_withdraw_error"));
            //}

            var res = await PostMethod(apiEndPoints.addWithdraw, model);
            if (res !== null && res !== undefined) {
                ShowSuccess(res.message);
                reset(2);
                setTimeout(function () {
                    WalletBalance();
                    CheckWithdrawAmountList()
                }, 2000);
            }
        }
        else {
            ShowError(ChangeErroMessage("amount_greater_zero_error"));
        }
    }
    else {
        ShowError(ChangeErroMessage("min_max_amount_error_parameter", WithdrawLimit + "."));
    }
    //LoaderHide();
}
//#endregion

//#region TransferAmount
async function Checkbalance() {
    LoaderShow();
    if ($('#ddl_transferFromWallet').val() != "") {
        if ($('#ddl_transferToWallet').val() != "") {
            if ($('#txt_transferAmount').val() === null || $('#txt_transferAmount').val() === "" || $('#txt_transferAmount').val() === undefined) {
                LoaderHide();
                return ShowError(ChangeErroMessage("amount_required_error"));
            }
            if ($('#txt_transferAmount').val() >= 1) {
                //WalletBalance();
                await TransferAmount();
            }
            else {
                ShowError(ChangeErroMessage("min1_max1000_amount_error"));
            }
        }
        else {
            ShowError(ChangeErroMessage("select_to_wallet_error"));
        }
    }
    else {
        ShowError(ChangeErroMessage("select_from_wallet_error"));
    }
    LoaderHide();
}

async function TransferAmount() {
    // Game register
    //await regisrationGame();
    var modelBalance = {};
    // check insert amount is gereate then 0

    if ($('#txt_transferAmount').val() > 0) {
        if ($('#txt_transferAmount').val() >= 1) {
            // get all wallete balance
            var resBalance = await PostMethod(apiEndPoints.walletBalance, modelBalance);
            var model = {
                fromWalletId: $('#ddl_transferFromWallet').val(),
                toWalletId: $('#ddl_transferToWallet').val(),
                amount: Number($('#txt_transferAmount').val())
            };

            //Get the Wallet Name
            var valueFromWalletName = resBalance.data.filter(function (walletName) { return walletName.walletId === model.fromWalletId; });
            var valueToWalletName = resBalance.data.filter(function (wallet) { return wallet.walletId === model.toWalletId; });

            if (Number($('#txt_transferAmount').val()) <= Number(valueFromWalletName[0].amount)) {
                if (valueFromWalletName.length !== 0 && valueToWalletName.length !== 0) {
                    var nameFromWallet = valueFromWalletName[0].walletName;

                    var res = await PostMethod(apiEndPoints.paymentTransferInOneAPi, model);
                    if (res !== null && res !== undefined) {
                        ShowSuccess(res.message);
                        reset(3);
                        setTimeout(function () {
                            WalletBalance();
                        }, 2000);
                    }
                }
            }
            else {
                ShowError(ChangeErroMessage("Insufficient_balance_wallet"));
            }
        }
        else {
            ShowError(ChangeErroMessage("amount_greater_one_error"));
        }
    }
    else {
        ShowError(ChangeErroMessage("amount_greater_zero_error"));
    }
}

function generate(n) {
    var add = 1, max = 12 - add;
    if (n > max)
        return this.generate(max) + this.generate(n - max);
    max = Math.pow(10, n + add);
    var min = max / 10;
    var number = Math.floor(Math.random() * (max - min + 1)) + min;
    return ("" + number).substring(add);
}

function generateGuid() {
    var result, i, j;
    result = '';
    for (j = 0; j < 32; j++) {
        if (j === 8 || j === 12 || j === 16 || j === 20)
            result = result + '-';
        i = Math.floor(Math.random() * 16).toString(16).toUpperCase();
        result = result + i;
    }
    return result;
}
//#endregion

var userbalance;
//#region TransferValidation
async function select() {
    var fromSel = document.getElementById("ddl_transferFromWallet");
    var fromName = $("#ddl_transferFromWallet option:selected").text();
    await TransferValidation(fromName);
    $('#ddl_transferToWallet').html('');
    if (fromSel.value !== null) {
        //var res = await GetMethod(apiEndPoints.depositDdl);
        //var wallet = res.data.walletTypes;
        var setAmount = false;
        var modelBalance = {};
        var fromSel1 = fromSel.value;
        //var resBalance = await PostMethod(apiEndPoints.walletBalance, modelBalance);
        var valueFromWalletName = userbalance.data.filter(function (walletName) { return walletName.walletId === fromSel1; });
        var nameFromWalletAmount = valueFromWalletName[0].amount;
        document.getElementsByName('txt_transferAmount')[0].placeholder = 'Max Limit:' + nameFromWalletAmount;
        $('#ddl_transferToWallet option:not(:first)').remove();
        $("#ddl_transferToWallet").append('<option value="" selected>-- Select --</option>');
        $.each(allWalletList, function () {
            if (this.id !== fromSel.value) {
                $("#ddl_transferToWallet").append($("<option />").val(this.id).text(this.walletType));
            }
            if (this.id === fromSel.value && this.walletType === "Main Wallet") {
                setAmount = true;
                document.getElementById("txt_transferAmount").value = MainWallet;
            }
        });
        if (setAmount == false)
            document.getElementById("txt_transferAmount").value = "";
        jcf.getInstance($("#ddl_transferToWallet")).refresh();
    }
}

async function TransferValidation(walletName) {
    WalletBalanceMaxTransfer(walletName);
    var fromWallet = $('#ddl_transferFromWallet').val();
    if (fromWallet !== null && fromWallet !== "") {
        //await WalletBalance();
        var modelBalance = {};
        userbalance = await PostMethod(apiEndPoints.walletBalance, modelBalance);
        var fromSel = $('#ddl_transferFromWallet').val();
        if (fromSel === null || fromSel === undefined) {
            ShowError(ChangeErroMessage("select_from_wallet_error"));
        }
        var valueFromWalletName = userbalance.data.filter(function (walletName) { return walletName.walletId === fromSel; });
        var nameFromWalletAmount = valueFromWalletName[0].amount;
        document.getElementById('txt_transferAmount').value = nameFromWalletAmount;
        document.getElementById('walletBalance').innerHTML = nameFromWalletAmount;
    }
    else {
        ShowError(ChangeErroMessage("select_from_wallet_error"));
    }
}
//#endregion

//#region Transfer Main Wallet to Any Wallet
var walletNameTransferInWallet;
function OpenModelTransferWallet(GameName) {
    walletNameTransferInWallet = GameName;
    $("#AllInConfirmation").modal();
}

async function TransferInAllWallet(GameWalletName) {
    if (location.href.toLowerCase().includes("?p=transfer"))
        await LoadingImageShowAllInSection(GameWalletName);
    var GameName;
    if (GameWalletName == undefined) GameName = walletNameTransferInWallet;
    else GameName = GameWalletName

    let model = {
        walletName: GameName
    }
    var res = await PostMethod(apiEndPoints.AllInWallet, model);
    await WalletBalance();
}

function LoadingImageShowAllInSection(GameName) {
    switch (GameName) {
        case "918Kiss Wallet": document.getElementById("918KissWallet").innerHTML = '<img class="img_load" src="/images/loading.gif" height="13" >'; break;
        case "AG Wallet": document.getElementById("AGWallet").innerHTML = '<img class="img_load" src="/images/loading.gif" height="13" >'; break;
        case "PlayTech Wallet": document.getElementById("PlaytechWallet").innerHTML = '<img class="img_load" src="/images/loading.gif" height="13" >'; break;
        case "M8 Wallet": document.getElementById("M8Wallet").innerHTML = '<img class="img_load" src="/images/loading.gif" height="13" >'; break;
        case "MaxBet Wallet": document.getElementById("MaxBetWallet").innerHTML = '<img class="img_load" src="/images/loading.gif" height="13" >'; break;
        case "Mega888 Wallet": document.getElementById("Mega888Wallet").innerHTML = '<img class="img_load" src="/images/loading.gif" height="13" >'; break;
        case "Joker Wallet": document.getElementById("JokerWallet").innerHTML = '<img class="img_load" src="/images/loading.gif" height="13" >'; break;
        case "DG Wallet": document.getElementById("DGWallet").innerHTML = '<img class="img_load" src="/images/loading.gif" height="13" >'; break;
        case "Sexy Wallet": document.getElementById("SexyWallet").innerHTML = '<img class="img_load" src="/images/loading.gif" height="13" >'; break;
        case "SA Wallet": document.getElementById("SAWallet").innerHTML = '<img class="img_load" src="/images/loading.gif" height="13" >'; break;
        case "Pussy888 Wallet": document.getElementById("Pussy888Wallet").innerHTML = '<img class="img_load" src="/images/loading.gif" height="13" >'; break;
        case "AllBet Wallet": document.getElementById("AllBetWallet").innerHTML = '<img class="img_load" src="/images/loading.gif" height="13" >'; break;
        case "WM Wallet": document.getElementById("WMWallet").innerHTML = '<img class="img_load" src="/images/loading.gif" height="13" >'; break;
        case "Pragmatic Wallet": document.getElementById("PragmaticWallet").innerHTML = '<img class="img_load" src="/images/loading.gif" height="13" >'; break;
        case "YeeBet Wallet": document.getElementById("YeeBetWallet").innerHTML = '<img class="img_load" src="/images/loading.gif" height="13" >'; break;
        case "SBO Wallet": document.getElementById("SBOWallet").innerHTML = '<img class="img_load" src="/images/loading.gif" height="13" >'; break;
        case "GamePlay Wallet": document.getElementById("GamePlayWallet").innerHTML = '<img class="img_load" src="/images/loading.gif" height="13" >'; break;
        case 'CQ9 Wallet': document.getElementById('CQ9Wallet').innerHTML = '<img class="img_load" src="/images/loading.gif" height="13" >'; break;
        case 'JDB Wallet': document.getElementById('JDBWallet').innerHTML = '<img class="img_load" src="/images/loading.gif" height="13" >'; break;
    }
}

//#endregion Transfer Main Wallet to Any Wallet

async function CheckMainteance() {
    var res = await GetMethodWithReturn(apiEndPoints.VaderPayMainteanceSelect);
    if (res.data.vaderPay.value == "true") {
        document.getElementById("vaderpayMainteanceSection").style.display = "";
        document.getElementById("vaderpaySection").style.display = "none";
        document.getElementById("vaderpayPromotionSection").style.display = "none";
    }
}

async function CheckSupportGame() {
    let model = {}
    var res = await PostMethod(apiEndPoints.GetGameSupport, model);
    if (res.data.length > 0) {
        document.getElementById("kiss918allin").disabled = !res.data[0].Is918Kiss ? true : false;
        document.getElementById("agallin").disabled = !res.data[0].IsAG ? true : false;
        document.getElementById("allbetallin").disabled = !res.data[0].IsAllBet ? true : false;
        document.getElementById("dgallin").disabled = !res.data[0].IsDG ? true : false;
        document.getElementById("jokerallin").disabled = !res.data[0].IsJoker ? true : false;
        document.getElementById("m8allin").disabled = !res.data[0].IsM8 ? true : false;
        document.getElementById("maxbetallin").disabled = !res.data[0].IsMaxbet ? true : false;
        document.getElementById("mega888allin").disabled = !res.data[0].IsMega888 ? true : false;
        document.getElementById("playtechallin").disabled = !res.data[0].IsPlaytech && !res.data[0].IsPlaytechSlot ? true : false;
        document.getElementById("pragmaticallin").disabled = !res.data[0].IsPragmatic ? true : false;
        document.getElementById("pussy888allin").disabled = !res.data[0].IsPussy888 ? true : false;
        document.getElementById("saallin").disabled = !res.data[0].IsSA ? true : false;
        document.getElementById("sexyallin").disabled = !res.data[0].IsSexyBaccarat ? true : false;
        document.getElementById("wmallin").disabled = !res.data[0].IsWM ? true : false;
        document.getElementById("YeeBetallin").disabled = !res.data[0].IsYeeBet ? true : false;
        document.getElementById("SBOallin").disabled = !res.data[0].IsYeeBet ? true : false;
        document.getElementById("gameplayallin").disabled = !res.data[0].IsGamePlayLive && !res.data[0].IsGamePlaySlot ? true : false;
        document.getElementById('cq9allin').disabled = !res.data[0].IsCQ9Slot ? true : false;
        document.getElementById('jdballin').disabled = !res.data[0].IsJDBSlot ? true : false;
    }
}

var HistorySectionName = "WithdrawDeposit";
var fromDate = null, toDate = null, pageSize = 20; pageNumber = 0;
var NumberOfLine = 1;
var apiRunning = false;

function SetHistorySectionName(name) {
    $("#depositHistory").html("");
    $("#transferHistory").html("");
    $("#bettingsummery").html("");
    $("#promotionHistory").html("");
    $("#rebateHistory").html("");
    $("#referralHistory").html("");
    HistorySectionName = name;
    fromDate = null;
    toDate = null;
    pageNumber = 0;
    Get30DayDate()
}

function APIDateFormate(date) {
    return date.replace(/T/, " ").substring(0, 16);
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
    pageNumber = 0;
    var date = new Date();
    GetDateFormate(date, date);
};

function Get3DayDate() {
    pageNumber = 0;
    var fdate = new Date().addDays(-2);
    var tdate = new Date();
    GetDateFormate(fdate, tdate)
};

function GetInWeekDate() {
    pageNumber = 0;
    var curr = new Date(); // get current date
    var first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
    var firstday = new Date(curr.setDate(first + 1))
    var lastday = firstday.addDays(6)
    GetDateFormate(firstday, lastday);
}

function GetInMonthDate() {
    pageNumber = 0;
    var date = new Date();
    var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    GetDateFormate(firstDay, lastDay);
}

function GetDateRange() {
    $('#filter-model').modal('hide');
    $("#depositHistory").html("");
    $("#transferHistory").html("");
    $("#bettingsummery").html("");
    $("#promotionHistory").html("");
    $("#rebateHistory").html("");
    $("#referralHistory").html("");
    pageNumber = 0;
    var fdate = $("#datepicker1").val().split("/");
    var tdate = $("#datepicker2").val().split("/");
    if (fdate == "" || tdate == "") {
        return ShowError(ChangeErroMessage("pls_select_date"))
    }
    fromDate = fdate[2] + "-" + fdate[1] + "-" + fdate[0] + " 00:00:00";
    toDate = tdate[2] + "-" + tdate[1] + "-" + tdate[0] + " 23:59:59";

    CallFunctionAccordingToTab()
}

function Get30DayDate() {
    pageNumber = 0;
    var fdate = new Date().addDays(-31);
    var tdate = new Date();
    GetDateFormate(fdate, tdate)
    CallFunctionAccordingToTab()
};

function CallFunctionAccordingToTab() {
    if (GetLocalStorage('currentUser') !== null)
        switch (HistorySectionName) {
            case "Transfer": TransferHistory(); break;
            case "BettingSummery": BettingHistory(); break;
            case "WithdrawDeposit": WithdrawDepositHistory(); break;
            case "Promotion": PromotionHistory(); break;
            case "Rebate": RebateHistory(); break;
            case "Reward": RewardHistory(); break;
            case "Referral": ReferralHistory(); break;
        }
}

function OnDateFilterChange() {
    var option = document.getElementById("dateFilter").value;
    switch (option) {
        case "Today": GetTodayDate(); break;
        case "In3Days": Get3DayDate(); break;
        case "InAWeek": GetInWeekDate(); break;
        case "InAMonth": GetInMonthDate(); break;
    }
}

async function TransferHistory(FromDate = null, ToDate = null, PageSize = null, PageNumber = null) {
    apiRunning = true;
    let model = {
        pageNo: PageNumber == null ? pageNumber : PageNumber,
        pageSize: PageSize == null ? pageSize : PageSize,
        fromDate: FromDate == null ? fromDate : FromDate,
        toDate: ToDate == null ? toDate : ToDate
    }
    var res = await PostMethod(apiEndPoints.transferHistory, model);
    if (res.data.result.length > 0) {
        var data = res.data.result;
        var html = ""
        for (i = 0; i < data.length; i++) {
            html += '<li data-toggle="modal" data-target="#transfer-history-model" onclick="TransferHistoryDetailsSet(\'' + data[i].orderId + '\',\'' + data[i].created + '\',\'' + parseFloat(data[i].amount).toFixed(2) + '\',\'' + data[i].verified + '\',\'' + data[i].fromWallet + '\',\'' + data[i].toWallet + '\')" class="list-content"><div class="back-btn rotate"><a><img class="tab-bankicon" src="/images/mobile/BackArrow_svg.svg" alt="" /></a></div><div class="product-name-time"><h6>' + data[i].toWallet + '</h6><p>' + APIDateFormate(data[i].created) + '</p></div><div class="product-subdesc"><p class="product-amount">MYR ' + parseFloat(data[i].amount).toFixed(2) + '</p><p class="product-available ' + data[i].verified.replace(" ", "_").toLowerCase() + '_color">' + data[i].verified + '</p></div></li>';
        }
        $("#transferHistory").append(html);
    }
    else {
        if (res.data.total == 0)
            if ($("#transferHistory li").length == 0) {
                var html = '<div class="row transfer-content"><div class="col-xs-12 display-flex"><p class="bank-name-detail text-center mar-top-15"><span class="lang" key="no_record_found_deposit"></span></p></div></div>'
                $("#transferHistory").html(html);
            }
    }
    getLanguage(false);
    apiRunning = false;
}

async function WithdrawDepositHistory(FromDate = null, ToDate = null, PageSize = null, PageNumber = null) {
    apiRunning = true;
    let model = {
        pageNo: PageNumber == null ? pageNumber : PageNumber,
        pageSize: PageSize == null ? pageSize : PageSize,
        fromDate: FromDate == null ? fromDate : FromDate,
        toDate: ToDate == null ? toDate : ToDate
    }
    var res = await PostMethod(apiEndPoints.withdrawDepositHistroy, model);
    if (res.data.result.length > 0) {
        var data = res.data.result;
        var html = ""
        for (i = 0; i < data.length; i++) {
            html += '<li data-toggle="modal" data-target="#depsoit-history-model" onclick="WithdrawDepositHistoryDetailsSet(\'' + data[i].Type + '\',\'' + data[i].Created + '\',\'' + parseFloat(data[i].Amount).toFixed(2) + '\',\'' + data[i].Status + '\',\'' + data[i].Method + '\')" class="list-content"><div class="back-btn rotate"><a><img class="tab-bankicon" src="/images/mobile/BackArrow_svg.svg" alt="" /></a></div><div class="product-name-time"><h6>' + data[i].Type + '</h6><p>' + APIDateFormate(data[i].Created) + '</p></div><div class="product-subdesc"><p class="product-amount">MYR ' + parseFloat(data[i].Amount).toFixed(2) + '</p><p class="product-available ' + data[i].Status.replace(" ", "_").toLowerCase() + '_color">' + data[i].Status + '</p></div></li>';
        }
        $("#depositHistory").append(html);
    }
    else {
        if (res.data.total == 0)
            if ($("#depositHistory li").length == 0) {
                var html = '<div class="row transfer-content"><div class="col-xs-12 display-flex"><p class="bank-name-detail text-center mar-top-15"><span class="lang" key="no_record_found_deposit"></span></p></div></div>'
                $("#depositHistory").html(html);
            }
    }
    getLanguage(false);
    apiRunning = false;
}

var promotionHistoryData;
async function PromotionHistory(FromDate = null, ToDate = null, PageSize = null, PageNumber = null) {
    apiRunning = true;
    let model = {
        pageNo: PageNumber == null ? pageNumber : PageNumber,
        pageSize: PageSize == null ? pageSize : PageSize,
        fromDate: FromDate == null ? fromDate : FromDate,
        toDate: ToDate == null ? toDate : ToDate
    }
    var res = await PostMethod(apiEndPoints.promotionHistroy, model);
    if (res.data.result.length > 0) {
        var data = res.data.result;
        promotionHistoryData = data;
        var html = ""
        for (i = 0; i < data.length; i++) {
            html += '<li data-toggle="modal" data-target="#promotion-history-model" onclick="PromotionHistoryDetailsSet(\'' + data[i].Id + '\')" class="list-content"><div class="back-btn rotate"><a><img class="tab-bankicon" src="/images/mobile/BackArrow_svg.svg" alt="" /></a></div><div class="product-name-time"><h6>' + data[i].Title + '</h6><p>' + APIDateFormate(data[i].Created) + '</p></div><div class="product-subdesc"><p class="product-amount">MYR ' + parseFloat(data[i].UserTurnover).toFixed(2) + '</p><p class="product-available ' + data[i].Staus.replace(" ", "_").toLowerCase() + '_color">' + (data[i].Staus == "Manually Expired" ? "M. Expired" : data[i].Staus) + '</p></div></li>';
        }
        $("#promotionHistory").append(html);
    }
    else {
        if (res.data.total == 0)
            if ($("#promotionHistory li").length == 0) {
                var html = '<div class="row transfer-content"><div class="col-xs-12 display-flex"><p class="bank-name-detail text-center mar-top-15"><span class="lang" key="no_record_found_deposit"></span></p></div></div>'
                $("#promotionHistory").html(html);
            }
    }
    getLanguage(false);
    apiRunning = false;
}

async function RebateHistory(FromDate = null, ToDate = null, PageSize = null, PageNumber = null) {
    apiRunning = true;
    let model = {
        pageNo: PageNumber == null ? pageNumber : PageNumber,
        pageSize: PageSize == null ? pageSize : PageSize,
        fromDate: FromDate == null ? fromDate : FromDate,
        toDate: ToDate == null ? toDate : ToDate
    }
    var res = await PostMethod(apiEndPoints.rebateHistroy, model);
    if (res.data.result.length > 0) {
        var data = res.data.result;
        var html = ""
        for (i = 0; i < data.length; i++) {
            html += '<li data-toggle="modal" data-target="#rebate-history-model"  onclick="RebateHistoryDetailsSet(\'' + data[i].gameName + '\',\'' + data[i].gameType + '\',\'' + parseFloat(data[i].bet).toFixed(2) + '\',\'' + parseFloat(data[i].rolling).toFixed(2) + '\',\'' + parseFloat(data[i].winLose).toFixed(2) + '\',\'' + parseFloat(data[i].turnover).toFixed(2) + '\',\'' + parseFloat(data[i].commAmount).toFixed(2) + '\',\'' + data[i].created + '\')"  class="list-content"><div class="back-btn rotate"><a><img class="tab-bankicon" src="/images/mobile/BackArrow_svg.svg" alt="" /></a></div><div class="product-name-time"><h6>' + data[i].gameName + '</h6><p>' + APIDateFormate(data[i].created) + '</p></div><div class="product-subdesc"><p class="product-amount">MYR ' + parseFloat(data[i].commAmount).toFixed(2) + '</p><p class="product-available approved_color">' + data[i].gameType + '</p></div></li>';
        }
        $("#rebateHistory").append(html);
    }
    else {
        if (res.data.total == 0)
            if ($("#rebateHistory li").length == 0) {
                var html = '<div class="row transfer-content"><div class="col-xs-12 display-flex"><p class="bank-name-detail text-center mar-top-15"><span class="lang" key="no_record_found_deposit"></span></p></div></div>'
                $("#rebateHistory").html(html);
            }
    }
    getLanguage(false);
    apiRunning = false;
}

async function RewardHistory(FromDate = null, ToDate = null, PageSize = null, PageNumber = null) {
    apiRunning = true;
    let model = {
        pageNo: PageNumber == null ? pageNumber : PageNumber,
        pageSize: PageSize == null ? pageSize : PageSize,
        fromDate: FromDate == null ? fromDate : FromDate,
        toDate: ToDate == null ? toDate : ToDate
    }
    var res = await PostMethod(apiEndPoints.rewadHistroy, model);
    if (res.data.result.length > 0) {
        var data = res.data.result;
        var html = ""
        for (i = 0; i < data.length; i++) {
            html += '<li data-toggle="modal" data-target="#rebate-history-model"  class="list-content"><div class="back-btn rotate"><a><img class="tab-bankicon" src="/images/mobile/BackArrow_svg.svg" alt="" /></a></div><div class="product-name-time"><h6>' + data[i].TransactionType + '</h6><p>' + APIDateFormate(data[i].Created) + '</p></div><div class="product-subdesc"><p class="product-amount">MYR ' + parseFloat(data[i].Amount).toFixed(2) + '</p><p class="product-available approved_color">' + parseFloat(data[i].CurrentBalance).toFixed(2) + '</p></div></li>';
        }
        $("#rewardHistory").append(html);
    }
    else {
        if (res.data.total == 0)
            if ($("#rewardHistory li").length == 0) {
                var html = '<div class="row transfer-content"><div class="col-xs-12 display-flex"><p class="bank-name-detail text-center mar-top-15"><span class="lang" key="no_record_found_deposit"></span></p></div></div>'
                $("#rewardHistory").html(html);
            }
    }
    getLanguage(false);
    apiRunning = false;
}

async function BettingHistory(FromDate = null, ToDate = null, PageSize = null, PageNumber = null) {
    apiRunning = true;
    let model = {
        pageNo: PageNumber == null ? pageNumber : PageNumber,
        pageSize: PageSize == null ? pageSize : PageSize,
        fromDate: FromDate == null ? fromDate : FromDate,
        toDate: ToDate == null ? toDate : ToDate
    }
    var res = await PostMethod(apiEndPoints.bettingSummeryHistroy, model);
    if (res.data.result.length > 0) {
        var data = res.data.result;
        var html = ""
        for (i = 0; i < data.length; i++) {
            html += '<li data-toggle="modal" data-target="#betting-history-model" onclick="BettingHistoryDetailsSet(\'' + data[i].GameName + '\',\'' + data[i].BetCount + '\',\'' + parseFloat(data[i].VaildBetAmount).toFixed(2) + '\',\'' + parseFloat(data[i].TotalRebate).toFixed(2) + '\',\'' + parseFloat(data[i].BetAmount).toFixed(2) + '\')" class="list-content"><div class="back-btn rotate"><a><img class="tab-bankicon" src="/images/mobile/BackArrow_svg.svg" alt="" /></a></div><div class="product-name-time"><h6>' + data[i].GameName + '</h6><p>' + data[i].BetCount + '</p></div><div class="product-subdesc"><p class="product-amount">MYR ' + parseFloat(data[i].VaildBetAmount).toFixed(2) + '</p><p class="product-available approved_color">' + parseFloat(data[i].TotalRebate).toFixed(2) + '</p></div></li>';
        }
        $("#bettingsummery").append(html);
    }
    else {
        if (res.data.total == 0)
            if ($("#bettingsummery li").length == 0) {
                var html = '<div class="row transfer-content"><div class="col-xs-12 display-flex"><p class="bank-name-detail text-center mar-top-15"><span class="lang" key="no_record_found_deposit"></span></p></div></div>'
                $("#bettingsummery").html(html);
            }
    }
    getLanguage(false);
    apiRunning = false;
}

async function ReferralHistory(FromDate = null, ToDate = null, PageSize = null, PageNumber = null) {
    apiRunning = true;
    let model = {
        pageNo: PageNumber == null ? pageNumber : PageNumber,
        pageSize: PageSize == null ? pageSize : PageSize,
        fromDate: FromDate == null ? fromDate : FromDate,
        toDate: ToDate == null ? toDate : ToDate
    }
    var res = await PostMethod(apiEndPoints.referralSummeryHistroy, model);
    if (res.data.result.length > 0) {
        var data = res.data.result;
        var html = ""
        for (i = 0; i < data.length; i++) {
            html += '<li data-toggle="modal" data-target="#referral-history-model" onclick="ReferralHistoryDetailsSet(\'' + data[i].Created + '\',\'' + data[i].ReferUsername + '\',\'' + parseFloat(data[i].Turnover).toFixed(2) + '\',\'' + parseFloat(data[i].ReferPercentage).toFixed(2) + '\',\'' + parseFloat(data[i].ReferralBonus).toFixed(2) + '\',\'' + data[i].CalculationDate + '\',\'' + '\')" class="list-content"><div class="back-btn rotate"><a><img class="tab-bankicon" src="/images/mobile/BackArrow_svg.svg" alt="" /></a></div><div class="product-name-time"><h6>' + data[i].ReferUsername + '</h6><p>' + data[i].Created + '</p></div><div class="product-subdesc"><p class="product-amount">T ' + parseFloat(data[i].Turnover).toFixed(2) + '</p><p class="product-available approved_color">' + parseFloat(data[i].ReferralBonus).toFixed(2) + '</p></div></li>';
        }
        $("#referralHistory").append(html);
    }
    else {
        if (res.data.total == 0)
            if ($("#referralHistory li").length == 0) {
                var html = '<div class="row transfer-content"><div class="col-xs-12 display-flex"><p class="bank-name-detail text-center mar-top-15"><span class="lang" key="no_record_found_deposit"></span></p></div></div>'
                $("#referralHistory").html(html);
            }
    }
    getLanguage(false);
    apiRunning = false;
}

function WithdrawDepositHistoryDetailsSet(Type, Created, Amount, Status, Method) {
    $("#depositHistoryType").html(Type)
    $("#depositHistoryMethod").html(Method)
    $("#depositHistoryAmount").html(Amount)
    $("#depositHistoryDate").html(Created.replace("T", " "))
    $("#depositHistoryStatus").html(Status.toUpperCase())
}

function TransferHistoryDetailsSet(OrderId, Created, Amount, Status, from, to) {
    $("#transferHistoryId").html(OrderId)
    $("#transferHistoryFrom").html(from)
    $("#transferHistoryTo").html(to)
    $("#transferHistoryAmount").html(Amount)
    $("#transferHistoryDate").html(Created.replace("T", " "))
    $("#transferHistoryStatus").html(Status.toUpperCase())
}

function BettingHistoryDetailsSet(GameName, BetCount, VaildBetAmount, TotalRebate, BetAmount) {
    $("#bettingHistoryGameName").html(GameName)
    $("#bettingHistoryBetCount").html(BetCount)
    $("#bettingHistoryVaildBet").html(VaildBetAmount)
    $("#bettingHistoryBetAmount").html(BetAmount)
    $("#bettingHistoryRebate").html(TotalRebate)
}

function PromotionHistoryDetailsSet(id) {
    var data = promotionHistoryData.filter(x => x.Id == id);

    $("#promotionHistoryTitle").html(data[0].Title)
    $("#promotionHistoryDAmount").html(parseFloat(data[0].DepositAmount).toFixed(2))
    $("#promotionHistoryBAmount").html(parseFloat(data[0].BonusAmount).toFixed(2))
    $("#promotionHistoryUTurnover").html(parseFloat(data[0].UserTurnover).toFixed(2))
    $("#promotionHistoryTurnTime").html(data[0].TurnoverTime == "0X" ? data[0].WinTurn : data[0].TurnoverTime)
    $("#promotionHistoryRDay").html(data[0].RemainingDay)
    $("#promotionHistoryStatus").html(data[0].Staus)
    $("#promotionHistoryExpiry").html(data[0].ExpiryDate.replace("T", " "))
    $("#promotionHistoryCreated").html(data[0].Created.replace("T", " "))
    $("#promotionHistoryTurnoverTarget").html(parseFloat(data[0].TurnoverTarget).toFixed(2))
}

function RebateHistoryDetailsSet(GameName, GameType, BetAmount, Rolling, winlose, Turnover, CommAmount, created) {
    $("#rebateHistoryGameName").html(GameName)
    $("#rebateHistoryGameType").html(GameType)
    $("#rebateHistoryBAmount").html(BetAmount)
    $("#rebateHistoryRolling").html(Rolling)
    $("#rebateHistoryWinlose").html(winlose)
    $("#rebateHistoryTurnover").html(Turnover)
    $("#rebateHistoryCommAmount").html(CommAmount)
    $("#rebateHistoryCreated").html(created.replace("T", " "))
}

function ReferralHistoryDetailsSet(TransactionDate, ReferUsername, Turnover, ReferPercentage, ReferBonus, DateofBonus) {
    $("#referralHistoryTransactionDate").html(TransactionDate.replace("T", " "))
    $("#referralHistoryReferUsername").html(ReferUsername)
    $("#referralHistoryTurnover").html(Turnover)
    $("#referralHistoryPercentage").html(ReferPercentage+ " %")
    $("#referralHistoryBonus").html(ReferBonus)
    $("#referralHistoryDateBonus").html(DateofBonus.split("T")[0])
}
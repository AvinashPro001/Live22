import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { customer, gameBalance } from '../../../../environments/environment';
import { CommonService } from '../../../common/common.service';
import { AdminService } from '../../admin.service';

declare var $: any;

@Component({
    selector: 'app-admin/deposit/deposit-add',
    templateUrl: './deposit-add.component.html',
    styleUrls: ['./deposit-add.component.scss']
})

export class DepositAddComponent implements OnInit {
    //#region variable
    disabled: boolean = false;
    customerData: any;
    IsMaintenance: boolean = false;
    singleSelect: any = [];
    selectedUserList: any;
    selectedBankList: any;
    selectedList3: any;
    selectedList1: any;
    selectedList2: any;
    selectedMethodList: any;
    selectedWalletList: any;
    listType: any;
    selectedList: any
    customerWallet: any;
    newVal: any;

    mainBal: any;
    kissBal: any;
    playtechBal: any;
    jokerBal: any;
    agBal: any;
    Pussy888Bal: any;
    dgBal: any;
    saBal: any;
    maxbetBal: any;
    sexybaccaratBal: any;
    m8Bal: any;
    mega888Bal: any;

    ddlData: any;
    depositType: any;
    model1: any;
    bankList: any;
    promotionList: any;
    promotionListhtml: string;
    customerBank: any;
    base64images: any;
    timeStart = { hour: 13, minute: 30 };
    timeEnd = { hour: 13, minute: 30 };
    meridian = true;
    bank: any;
    filenames: any = [];
    urls: any = [];
    apiPlaytech: any;
    apiAG: any;
    maxbetResult: any;
    apiM8: any;
    api918Kiss: any;
    apiJoker: any;
    depsoitMethodId: any;
    DepositModel: any;
    showModal: boolean = false;
    promotionshowModal: boolean = false;
    withoutPromotionshowModal: boolean = false;
    agUsername: any;
    playtechUsername: any;
    dgUsername: any;
    saUsername: any;
    sexyUsername: any;
    jokerUsername: any;
    maxbetUsername: any;
    m8Username: any;
    kiss918Username: any;
    mega888Username: any;
    pussyUsername: any;

    allbetBal: any;
    allbetUsername: any;
    wmBal: any;
    wmUsername: any;

    pragmaticBal: any;
    pragmaticUsername: any;

    userPassword: any;

    YeeBetBalance: any;
    YeeBetUsername: any;

    SBOBalance: any;
    SBOUsername: any;

    GamePlayBalance: any;
    GamePlayUsername: any;

    CQ9Balance: any;
    CQ9Username: any;

    JDBBalance: any;
    JDBUsername: any;

    //#endregion

    //#region ngOnInit
    async ngOnInit() {
        if (await this.checkAddPermission()) {
            this.customerUser();
            this.retrieveDepositpage();
            this.filenames = [];
        }
    }
    //#endregion

    //#region onChange
    onChange(event) {
        this.newVal = event.value.id;
        this.userPassword = event.value.password;
        this.retriveUserbank(this.newVal);
        this.walletData(this.newVal);
    }

    config = {
        displayKey: "username", //if objects array passed which key to be displayed defaults to description
        search: true, //true/false for the search functionlity defaults to false,
        height: '500px', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
        placeholder: 'Select Username.', // text to be displayed when no item is selected defaults to Select,
        customComparator: () => { }, // a custom function using which user wants to sort the items. default is undefined and Array.sort() will be used in that case,
        limitTo: Option.length,// a number thats limits the no of options displayed in the UI similar to angular's limitTo pipe
        moreText: 'more', // text to be displayed whenmore than one items are selected like Option 1 + 5 more
        noResultsFound: 'No results found!', // text to be displayed when no items are found while searching
        searchPlaceholder: 'Search', // label thats displayed in search input,
        searchOnKey: 'username' // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
    }
    //#endregion

    //#region constructor
    constructor(
        private adminService: AdminService,
        private toasterService: ToasterService,
        private router: Router,
        private commonService: CommonService) { }
    //#endregion

    //#region customerUser
    customerUser() {
        let model = {
            role: "user"
        };
        this.adminService.add<any>(customer.customerListForDropdown, model).subscribe(res => {
            this.customerData = res.data;
        }, error => {
            this.toasterService.pop('error', 'Error', error.error.message);
        });
    }
    //#endregion

    //#region walletData
    walletData(newVal) {
        let promtoionModel = {
            id: newVal
        }
        this.adminService.add<any>(customer.promotionDailyList, promtoionModel).subscribe(res => {
            this.promotionList = res.data;
            let data = {
                id: newVal
            }
            this.adminService.add<any>(customer.GetUsername, data).subscribe(res => {
                this.agUsername = res.data.agUsername;
                this.playtechUsername = res.data.playtechUsername;
                this.dgUsername = res.data.dgUsername;
                this.saUsername = res.data.saUsername;
                this.sexyUsername = res.data.sexyUsername;
                this.jokerUsername = res.data.jokerUsername;
                this.maxbetUsername = res.data.maxbetUsername;
                this.m8Username = res.data.m8Username;
                this.kiss918Username = res.data.kiss918Username;
                this.mega888Username = res.data.mega888Username;
                this.pussyUsername = res.data.pussy888Username;
                this.allbetUsername = res.data.allbetUsername;
                this.wmUsername = res.data.wmUsername;
                this.pragmaticUsername = res.data.pragmaticUsername;
                this.YeeBetUsername = res.data.yeeBetUsername;
                this.SBOUsername = res.data.sboUsername;
                this.GamePlayUsername = res.data.gameplayUsername;
                this.CQ9Username = res.data.cq9Username;
                this.JDBUsername = res.data.jdbUsername;

                this.Kiss918Balance(newVal);
                this.Mega888(newVal);
                this.Maxbet(newVal);
                this.M8(newVal);
                this.AG(newVal);
                this.DG(newVal);
                this.ManiWalletBalance(newVal);
                this.Playtech(newVal);
                this.Joker(newVal);
                this.Sexybaccarat(newVal);
                this.SA(newVal);
                this.Pussy888(newVal);
                this.AllBet(newVal);
                this.WM(newVal);
                this.Pragmatic(newVal);
                this.YeeBet(newVal);
                this.SBO(newVal);
                this.GamePlay(newVal);
                this.CQ9(newVal);
                this.JDB(newVal);
            })
        });
    }
    //#endregion

    //#region retriveUserbank
    retriveUserbank(newVal) {
        var model = {
            id: newVal,
        }
        this.adminService.add<any>(customer.userBank, model).subscribe(res => {
            this.customerBank = res.data;
            this.bankList = this.customerBank;
        }, error => {
            this.toasterService.pop('error', 'Error', error.error.message);
        })
    }
    //#endregion

    //#region retrieveDepositpage
    retrieveDepositpage() {
        this.adminService.getAll<any>(customer.depositDdl).subscribe(res => {
            this.ddlData = res.data;
            this.bank = this.ddlData.bankDetails
            this.depositType = this.ddlData.depositMethods;
            for (let i = 0; i < this.depositType.length; i++) {
                if (this.depositType[i].method === "Bank Transfer") {
                    this.depsoitMethodId = this.depositType[i].id;
                }
            }
        }, error => {
            this.toasterService.pop('error', 'Error', error.error.message);
        });
    }
    //#endregion

    RegisterAfterDeposite() {
        var userId = this.newVal;
        var userdata = this.customerData.filter(function (person) { return person.id == userId });
        this.addDeposit();
    }

    //#region addDeposit
    addDeposit() {
        this.disabled = true;
        let radioValue = $("input[name='promotion']:checked").val();
        let dataSelect = {
            userId: this.newVal,
            bankId: ((document.getElementById("ddl_bank") as HTMLInputElement).value),
            depositMethodId: this.depsoitMethodId,
            amount: ((document.getElementById("txt_amount") as HTMLInputElement).value),
            referenceNo: ((document.getElementById("txt_reference") as HTMLInputElement).value),
            depositeTime: Date.parse((document.getElementById("txt_datetime") as HTMLInputElement).value).toString(),
            promotionId: radioValue,
            promotionApplyEligible: false,
            adminRemark: ((document.getElementById("txt_remark") as HTMLInputElement).value)
        }

        if (dataSelect.userId === "0: undefined") {
            this.disabled = false;
            this.ngOnInit();
            return this.toasterService.pop('error', 'Error', this.commonService.errorMessage.PleaseSelectUser);
        }
        if (dataSelect.bankId === "0: undefined") {
            this.disabled = false;
            this.ngOnInit();
            return this.toasterService.pop('error', 'Error', this.commonService.errorMessage.PleaseSelectBank);
        }

        if (dataSelect.amount === "") {
            this.disabled = false;
            this.ngOnInit();
            return this.toasterService.pop('error', 'Error', this.commonService.errorMessage.PleaseEnterAmount);
        }
        if (Number(dataSelect.amount) <= 0) {
            this.disabled = false;
            this.ngOnInit();
            return this.toasterService.pop('error', 'Error', this.commonService.errorMessage.PleaseInsertGreaterAmount);
        }
        if (dataSelect.depositMethodId === "0: undefined") {
            this.disabled = false;
            this.ngOnInit();
            return this.toasterService.pop('error', 'Error', this.commonService.errorMessage.PleaseSelectDepositMethod);
        }
        if (dataSelect.referenceNo === "") {
            this.disabled = false;
            this.ngOnInit();
            return this.toasterService.pop('error', 'Error', this.commonService.errorMessage.PleaseEnterReferenceNumber);
        }
        if (dataSelect.depositeTime == "NaN") {
            this.disabled = false;
            this.ngOnInit();
            return this.toasterService.pop('error', 'Error', this.commonService.errorMessage.PleaseSelectDate);
        }

        if (this.urls.length === 0) {
            this.disabled = false;
            this.ngOnInit();
            return this.toasterService.pop('error', 'Error', this.commonService.errorMessage.PleaseUploadReceipt);
        }

        if (dataSelect.promotionId !== "") {
            let promotionModel = {
                userid: dataSelect.userId,
                amount: dataSelect.amount
            };
            this.adminService.add<any>(customer.promotionApplyCheck, promotionModel).subscribe(walletData => {
                if (walletData.data.IsPending == false) {
                    if (walletData.data.InMaintenance == false) {
                        if (walletData.data.CheckPromotionApply === true && walletData.data.TotalPromotionRow > 0) {
                            if (confirm("Your balance is lower than 5 MYR of your deposit balance, you are available to apply new promotion, and your existing promotion wil be expired.")) {
                                dataSelect.promotionApplyEligible = true
                                //var promotionModel2 = {
                                //    userid: dataSelect.userId,
                                //    amount: dataSelect.amount,
                                //    promotionid: dataSelect.promotionId
                                //};
                                //this.adminService.add<any>(customer.promotionApplyInsert, promotionModel2).subscribe(walletData => { });
                            }
                            else {
                                dataSelect.promotionId = "";
                            }
                        }
                        else {
                            if (walletData.data.Staus != null && walletData.data.CheckPromotionRemind == true) {
                                this.disabled = false;
                                this.ngOnInit();
                                return this.toasterService.pop('error', 'Error', this.commonService.errorMessage.YouCannotApplyPromotionBecauseHaveActivePromotion);
                            }

                            if (walletData.data.CheckPromotionRemind == true) {
                                dataSelect.promotionApplyEligible = true
                                this.DepositModel = dataSelect;
                                this.promotionshowModal = true;
                                this.disabled = false;
                                return 0;
                            }

                            if (walletData.data.Staus == null) {
                                dataSelect.promotionApplyEligible = true
                                //var promotionModel2 = {
                                //    userid: dataSelect.userId,
                                //    amount: dataSelect.amount,
                                //    promotionid: dataSelect.promotionId
                                //};
                                //this.adminService.add<any>(customer.promotionApplyInsert, promotionModel2).subscribe(walletData => { });
                            }
                        }
                    }
                    else {
                        this.disabled = false;
                        this.ngOnInit();
                        return this.toasterService.pop('error', 'Error', this.commonService.errorMessage.YouCannotApplyPromotionBecauseGameInMaintenance);
                    }
                }
                else {
                    this.disabled = false;
                    this.ngOnInit();
                    return this.toasterService.pop('error', 'Error', this.commonService.errorMessage.SportsBookStillHavePendingBetsYetToBeUnsettledPleaseWaitUntilAllBetsHasBeenSettled);
                }
                this.DepositModel = dataSelect;
                this.ConfirmDeposit()
                this.disabled = false;
            });
        } else {
            let data = {
                id: dataSelect.userId
            };
            this.adminService.add<any>(customer.depositCheck, data).subscribe(Data => {
                if (Data.data.CheckPopupWithoutPromotion == true) {
                    this.DepositModel = dataSelect;
                    this.withoutPromotionshowModal = true;
                    this.disabled = false;
                    return 0;
                }
                else {
                    this.DepositModel = dataSelect;
                    this.showModal = true;
                    this.disabled = false;
                    return 0;
                }
            });
        }
    }

    PromotionApplyCheck() {
        //let dataSelect = this.DepositModel;
        //var promotionModel2 = {
        //    userid: dataSelect.userId,
        //    amount: dataSelect.amount,
        //    promotionid: dataSelect.promotionId
        //};
        //this.adminService.add<any>(customer.promotionApplyInsert, promotionModel2).subscribe(walletData => {
        this.ConfirmDeposit();
        //});
    }

    ConfirmDeposit() {
        let dataSelect = this.DepositModel;
        this.adminService.add<any>(customer.addDeposit, dataSelect).subscribe(res => {
            this.toasterService.pop('success', 'Successfully', res.message);
            this.uploadReceipt(res.data.id);
            this.router.navigate(['admin/customers/deposit-list']);
        }, error => {
            this.toasterService.pop('error', 'Error', error.message);
            this.disabled = false;
            this.ngOnInit();
        });
    }

    //#endregion

    //#region uploadReceipt
    //urls = new Array<any>();
    uploadReceipt(id) {
        let data = {
            id: id,
            images: this.urls
        }
        this.adminService.add<any>(customer.userReceipt, data).subscribe(res => {
            this.toasterService.pop('success', 'Success', res.message);
        }, error => {
            this.toasterService.pop('error', 'Error', error.error.message);
        });
    }

    selectfile(event) {
        if (event.target.files.length >= 0) {
            var filesAmount = event.target.files.length;
            for (let i = 0; i < filesAmount; i++) {
                let files = event.target.files[i];
                this.base64(files);
                this.filenames.push(event.target.files[i].name);
            }
        }
    }

    base64(file) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
            this.urls.push({ base64images: e.target.result });
        }
        reader.readAsDataURL(file);
    }

    removefile(files) {
        let urlindex = this.filenames.map(singleUrl => { return singleUrl }).indexOf(files)
        if (this.filenames.length == 1) {
            this.filenames.splice(urlindex, 1)
            let form: HTMLFormElement = <HTMLFormElement>document.getElementById("imageform");
            form.reset();
        }
        else {
            this.filenames.splice(urlindex, 1)
        }
        let imageindexupload = this.urls.map(singleUrl => { return singleUrl }).indexOf(files[0])
        this.urls.splice(imageindexupload, 1)
    }
    //#endregion

    hide() {
        this.showModal = false;
        this.promotionshowModal = false;
        this.withoutPromotionshowModal = false;
    }

    //#region Wallet Balance
    convertDecimal(Balance) {
        return Number(Balance).toFixed(2);
    }

    ManiWalletBalance(id) {
        let data = {
            id: id
        }
        this.adminService.add<any>(gameBalance.walletBalance, data).subscribe(res => {
            var balance = res.data.filter(x => x.walletName == "Main Wallet");
            this.mainBal = this.convertDecimal(balance[0].amount);
        })
    }

    Kiss918Balance(id) {
        let data = {
            id: id,
            username: this.kiss918Username
        }
        this.adminService.add<any>(gameBalance.Kiss918, data).subscribe(res => {
            this.kissBal = this.convertDecimal(res.data.balance);
        })
    }

    Mega888(id) {
        let data = {
            id: id,
            username: this.mega888Username
        }
        this.adminService.add<any>(gameBalance.Mega888, data).subscribe(res => {
            this.mega888Bal = this.convertDecimal(res.data.balance);
        })
    }

    Maxbet(id) {
        let data = {
            id: id,
            username: this.maxbetUsername
        }
        this.adminService.add<any>(gameBalance.Maxbet, data).subscribe(res => {
            this.maxbetBal = this.convertDecimal(res.data.balance);
        })
    }

    M8(id) {
        let data = {
            id: id,
            username: this.m8Username
        }
        this.adminService.add<any>(gameBalance.m8, data).subscribe(res => {
            this.m8Bal = this.convertDecimal(res.data.balance);
        })
    }

    AG(id) {
        let data = {
            id: id,
            username: this.agUsername
        }
        this.adminService.add<any>(gameBalance.AG, data).subscribe(res => {
            this.agBal = this.convertDecimal(res.data.balance);
        })
    }

    DG(id) {
        let data = {
            id: id,
            username: this.dgUsername
        }
        this.adminService.add<any>(gameBalance.DG, data).subscribe(res => {
            this.dgBal = this.convertDecimal(res.data.balance);
        })
    }

    Playtech(id) {
        let data = {
            id: id,
            username: this.playtechUsername
        }
        this.adminService.add<any>(gameBalance.Playtech, data).subscribe(res => {
            this.playtechBal = this.convertDecimal(res.data.balance);
        })
    }

    Joker(id) {
        let data = {
            id: id,
            username: this.jokerUsername
        }
        this.adminService.add<any>(gameBalance.Joker, data).subscribe(res => {
            this.jokerBal = this.convertDecimal(res.data.balance);
        })
    }

    Sexybaccarat(id) {
        let data = {
            id: id,
            username: this.sexyUsername
        }
        this.adminService.add<any>(gameBalance.SexyBaccarat, data).subscribe(res => {
            this.sexybaccaratBal = this.convertDecimal(res.data.balance);
        })
    }

    SA(id) {
        let data = {
            id: id,
            username: this.saUsername
        }
        this.adminService.add<any>(gameBalance.SA, data).subscribe(res => {
            this.saBal = this.convertDecimal(res.data.balance);
        })
    }

    Pussy888(id) {
        let data = {
            id: id,
            username: this.pussyUsername
        }
        this.adminService.add<any>(gameBalance.Pussy888, data).subscribe(res => {
            this.Pussy888Bal = res.data.balance;
        })
    }

    AllBet(id) {
        let data = {
            id: id,
            username: this.allbetUsername,
            password: this.userPassword
        }
        this.adminService.add<any>(gameBalance.AllBet, data).subscribe(res => {
            this.allbetBal = res.data.balance;
        })
    }

    WM(id) {
        let data = {
            id: id,
            username: this.wmUsername
        }
        this.adminService.add<any>(gameBalance.WM, data).subscribe(res => {
            this.wmBal = res.data.balance;
        })
    }

    Pragmatic(id) {
        let data = {
            id: id,
            username: this.pragmaticUsername
        }
        this.adminService.add<any>(gameBalance.Pragmatic, data).subscribe(res => {
            this.pragmaticBal = res.data.balance;
        })
    }

    YeeBet(id) {
        let data = {
            id: id,
            username: this.YeeBetUsername
        }
        this.adminService.add<any>(gameBalance.YeeBet, data).subscribe(res => {
            this.YeeBetBalance = res.data.balance;
        })
    }

    SBO(id) {
        let data = {
            id: id,
            username: this.SBOUsername
        }
        this.adminService.add<any>(gameBalance.SBO, data).subscribe(res => {
            this.SBOBalance = res.data.balance;
        })
    }

    GamePlay(id) {
        let data = {
            id: id,
            username: this.GamePlayUsername
        }
        this.adminService.add<any>(gameBalance.GamePlay, data).subscribe(res => {
            this.GamePlayBalance = res.data.balance;
        })
    }

    CQ9(id) {
        let data = {
            id: id,
            username: this.CQ9Username
        }
        this.adminService.add<any>(gameBalance.CQ9, data).subscribe(res => {
            this.CQ9Balance = res.data.balance;
        })
    }

    JDB(id) {
        let data = {
            id: id,
            username: this.JDBUsername
        }
        this.adminService.add<any>(gameBalance.JDB, data).subscribe(res => {
            this.JDBBalance = res.data.balance;
        })
    }

    //#endregion Wallet Balance

    //#region Check Permission

    async checkViewPermission() {
        var usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
        if (usersPermissions.permissionsList[2].Permissions[0].IsChecked === true) {
            if (usersPermissions.permissionsList[2].submenu[0].Permissions[0].IsChecked === true) {
                return true;
            } else {
                this.toasterService.pop('error', 'Error', this.commonService.errorMessage.unAuthorized);
                this.router.navigate(['admin/dashboard']);
                return false;
            }
        } else {
            this.toasterService.pop('error', 'Error', this.commonService.errorMessage.unAuthorized);
            this.router.navigate(['admin/dashboard']);
            return false;
        }
    }

    async checkUpdatePermission() {
        var usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
        if (usersPermissions.permissionsList[2].Permissions[1].IsChecked === true) {
            if (usersPermissions.permissionsList[2].submenu[0].Permissions[1].IsChecked === true) {
                return true;
            } else {
                this.toasterService.pop('error', 'Error', this.commonService.errorMessage.unAuthorized);
                this.router.navigate(['admin/dashboard']);
                return false;
            }
        } else {
            this.toasterService.pop('error', 'Error', this.commonService.errorMessage.unAuthorized);
            this.router.navigate(['admin/dashboard']);
            return false;
        }
    }

    async checkAddPermission() {
        var usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
        if (usersPermissions.permissionsList[2].Permissions[2].IsChecked === true) {
            if (usersPermissions.permissionsList[2].submenu[0].Permissions[2].IsChecked === true) {
                return true;
            } else {
                this.toasterService.pop('error', 'Error', this.commonService.errorMessage.unAuthorized);
                this.router.navigate(['admin/dashboard']);
                return false;
            }
        } else {
            this.toasterService.pop('error', 'Error', this.commonService.errorMessage.unAuthorized);
            this.router.navigate(['admin/dashboard']);
            return false;
        }
    }

    //#endregion Check Permission
}
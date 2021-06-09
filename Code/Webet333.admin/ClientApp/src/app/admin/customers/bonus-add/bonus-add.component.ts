import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { account, customer, gameBalance } from '../../../../environments/environment';
import { CommonService } from '../../../common/common.service';
import { AdminService } from '../../admin.service';
declare var $: any;

class ImageSnippet {
    pending: boolean = false;
    status: string = 'init';

    constructor(public src: string, public file: File) { }
}
@Component({
    selector: 'app-admin/bonus/bonus-add',
    templateUrl: './bonus-add.component.html',
    styleUrls: ['./bonus-add.component.scss']
})

export class BonusAddComponent implements OnInit {
    disabled: boolean = false;
    playtechBal: any;
    m8Bal: any;
    sexybaccaratBal: any;
    IsMaintenance: boolean = false;
    jokerBal: any;
    Pussy888Bal: any;
    agBal: any;
    dgBal: any;
    saBal: any;
    public hasBaseDropZoneOver: boolean = false;
    public hasAnotherDropZoneOver: boolean = false;
    timeStart = { hour: 13, minute: 30 };
    timeEnd = { hour: 13, minute: 30 };
    meridian = true;
    myInput: any;
    files: any;
    model1: any;
    model: any;
    singleSelect: any = [];
    list: any;
    T: any;
    ddlData: any;
    walletType: any;
    promotionList: any;
    promotionListhtml: string;
    depositType: any;
    selectedList1: any;
    selectedList3: any;
    itemCount: any;
    length: any;
    myVar: any;
    toggleMeridian() {
        this.meridian = !this.meridian;
    }
    bank: any;
    filenames: any = [];
    urls: any = [];
    apiPlaytech: any;
    apiAG: any;
    apiM8: any;
    maxbetResult: any;
    api918Kiss: any;
    apiJoker: any;

    //#region variable
    customerData: any
    customerWallet: any
    kissBal: any
    mainBal: any
    mega888Bal: any;
    maxbetBal: any;
    newVal: any;
    agUsername: any;
    playtechUsername: any;
    dgUsername: any;
    saUsername: any;
    sexyUsername: any;
    jokerUsername: any;
    maxbetUsername: any;
    pragmaticBal: any;
    pragmaticUsername: any;
    m8Username: any;
    kiss918Username: any;
    mega888Username: any;
    pussyUsername: any;

    allbetBal: any;
    allbetUsername: any;
    wmBal: any;
    wmUsername: any;
    userPassword: any;

    YeeBetBalance: any;
    YeeBetUsername: any;

    //#endregion

    //#region ngOnInit
    async ngOnInit() {
        if (await this.checkAddPermission()) {
            this.customerUser();
            this.retrieveDepositpage();
        }
    }
    //#endregion

    //#region onChange
    onChange(event) {
        this.newVal = event.value.id;
        this.userPassword = event.value.password;
        this.walletData(this.newVal);
    }

    config = {
        displayKey: "username", //if objects array passed which key to be displayed defaults to description
        search: true, //true/false for the search functionlity defaults to false,
        height: 'auto', //height of the list so that if there are more no of items it can show a scroll defaults to auto. With auto height scroll will never appear
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

    RegisterGame(userData) {
        this.addBonus();
    }

    RegisterAfterBonus() {
        var userId = this.newVal;
        var userdata = this.customerData.filter(function (person) { return person.id == userId });
        this.RegisterGame(userdata[0]);
    }

    //#region Add BONUS
    addBonus() {
        this.disabled = true;
        let radioValue = $("input[name='promotion']:checked").val();
        let dataSelect = {
            userId: this.newVal,
            walletTypeId: ((document.getElementById("ddl_wallettype") as HTMLInputElement).value),
            amount: ((document.getElementById("txt_amount") as HTMLInputElement).value),
            depositMethodId: this.depositType[0].id,
            referenceNo: ((document.getElementById("txt_reference") as HTMLInputElement).value),
            promotionId: radioValue
        }
        let dataProfile = {
            id: dataSelect.userId
        }
        if (dataSelect.userId === "0: undefined") {
            this.disabled = false;
            this.ngOnInit();
            return this.toasterService.pop('error', 'Error', this.commonService.errorMessage.PleaseSelectUser);
        }
        if (dataSelect.walletTypeId === "0: undefined") {
            this.disabled = false;
            this.ngOnInit();
            return this.toasterService.pop('error', 'Error', this.commonService.errorMessage.PleaseSelectWalllet);
        }
        if (dataSelect.amount === "") {
            this.disabled = false;
            this.ngOnInit();
            return this.toasterService.pop('error', 'Error', this.commonService.errorMessage.PleaseInsertAmount);
        }
        if (dataSelect.promotionId === undefined) {
            this.disabled = false;
            this.ngOnInit();
            return this.toasterService.pop('error', 'Error', this.commonService.errorMessage.PleaseSelectPromotion);
        }

        if (dataSelect.referenceNo === "") {
            this.disabled = false;
            this.ngOnInit();
            return this.toasterService.pop('error', 'Error', this.commonService.errorMessage.PleaseAddRemark);
        }

        this.adminService.get<any>(account.walletSelect).subscribe(resData => {
            resData.data.forEach(el => {
                if (el.id === dataSelect.walletTypeId)
                    this.IsMaintenance = el.isMaintenance;
            });

            if (this.IsMaintenance) {
                this.disabled = false;
                this.ngOnInit();
                return this.toasterService.pop('error', 'Error', this.commonService.errorMessage.GameInMaintenance);
            }

            this.adminService.add<any>(customer.addDeposit, dataSelect).subscribe(res => {
                this.toasterService.pop('success', 'Successfully', res.message);
                this.router.navigate(['admin/customers/bonus-list']);
            });
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

    //#region M8
    callApi(apiurl, postData) {
        if (postData == false) {
            let model = {
                url: apiurl
            };
            return new Promise((resolve, reject) => {
                this.adminService.add<any>('http://api.webet333.com/api/Default', model).subscribe(res => {
                    resolve({
                        'error': false,
                        'data': res
                    });
                }), error => {
                    reject({
                        'error': true,
                        'data': error
                    });
                }
            });
        } else {
            return new Promise((resolve, reject) => {
                this.adminService.add<any>(apiurl, postData).subscribe(res => {
                    resolve({
                        'error': false,
                        'data': res
                    });
                }, error => {
                    reject({
                        'error': true,
                        'data': error
                    });
                });
            });
        }
    }
    //#endregion M8

    //#region Playtech
    callApiPlaytech(apiurl, postData) {
        if (postData == false) {
            let model = {
                url: apiurl
            };
            return new Promise((resolve, reject) => {
                this.adminService.add<any>('http://api.webet333.com/api/Default/playtech', model).subscribe(res => {
                    resolve({
                        'error': false,
                        'data': res
                    });
                }), error => {
                    reject({
                        'error': true,
                        'data': error
                    });
                }
            });
        } else {
            return new Promise((resolve, reject) => {
                this.adminService.add<any>(apiurl, postData).subscribe(res => {
                    resolve({
                        'error': false,
                        'data': res.message
                    });
                }, error => {
                    reject({
                        'error': true,
                        'data': error.message
                    });
                });
            });
        }
    }
    //#endregion Playtech

    //#region AG
    callAG(apiurl, postData) {
        if (postData == false) {
            let model = {
                url: apiurl
            };
            return new Promise((resolve, reject) => {
                this.adminService.add<any>('http://api.webet333.com/api/Default/ag', model).subscribe(res => {
                    resolve({
                        'error': false,
                        'data': res
                    });
                }), error => {
                    reject({
                        'error': true,
                        'data': error
                    });
                }
            });
        } else {
            return new Promise((resolve, reject) => {
                this.adminService.add<any>(apiurl, postData).subscribe(res => {
                    resolve({
                        'error': false,
                        'data': res.message
                    });
                }, error => {
                    reject({
                        'error': true,
                        'data': error.message
                    });
                });
            });
        }
    }
    //#endregion AG

    //#region 918Kiss
    call918Kiss(apiurl, postData) {
        if (postData == false) {
            let model = {
                url: apiurl
            };
            return new Promise((resolve, reject) => {
                this.adminService.add<any>('http://api.webet333.com/api/Default/ag', model).subscribe(res => {
                    resolve({
                        'error': false,
                        'data': res
                    });
                }), error => {
                    reject({
                        'error': true,
                        'data': error.mes
                    });
                }
            });
        } else {
            return new Promise((resolve, reject) => {
                this.adminService.add<any>(apiurl, postData).subscribe(res => {
                    resolve({
                        'error': false,
                        'data': res.message
                    });
                }, error => {
                    reject({
                        'error': true,
                        'data': error.message
                    });
                });
            });
        }
    }
    //#endregion

    //#region Joker
    callJoker(apiurl, parameter, postData) {
        if (postData == false) {
            let model = {
                url: apiurl,
                model: parameter
            };
            return new Promise((resolve, reject) => {
                this.adminService.add<any>('http://api.webet333.com/api/Default/joker', model).subscribe(res => {
                    resolve({
                        'error': false,
                        'data': res
                    });
                }), error => {
                    reject({
                        'error': true,
                        'data': error
                    });
                }
            });
        } else {
            return new Promise((resolve, reject) => {
                this.adminService.add<any>(apiurl, postData).subscribe(res => {
                    resolve({
                        'error': false,
                        'data': res.message
                    });
                }, error => {
                    reject({
                        'error': true,
                        'data': error.message
                    });
                });
            });
        }
    }
    //#endregion

    //#region Generate GUID
    generateGuid() {
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

    //#region Generate Number
    generate(n) {
        var add = 1, max = 12 - add;   // 12 is the min safe number Math.random() can generate without it starting to pad the end with zeros.

        if (n > max) {
            return this.generate(max) + this.generate(n - max);
        }

        max = Math.pow(10, n + add);
        var min = max / 10; // Math.pow(10, n) basically
        var number = Math.floor(Math.random() * (max - min + 1)) + min;

        return ("" + number).substring(add);
    }
    //#endregion Generate Number

    //#endregion

    //#region customerUser
    customerUser() {
        let model = {};
        this.adminService.add<any>(customer.customerList, model).subscribe(res => {
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
            })
        });
    }
    //#endregion

    //#region retrieveDepositpage
    retrieveDepositpage() {
        this.adminService.getAll<any>(customer.bonusDdl).subscribe(res => {
            this.ddlData = res.data;
            this.walletType = this.ddlData.walletTypes.filter(x => x.walletType == "Main Wallet");
            this.depositType = this.ddlData.depositMethods;
            this.length = this.ddlData.promotions.length;
        }, error => {
            this.toasterService.pop('error', 'Error', error.error.message);
        });
    }
    //#endregion

    public fileOverBase(e: any): void {
        this.hasBaseDropZoneOver = e;
    }

    public fileOverAnother(e: any): void {
        this.hasAnotherDropZoneOver = e;
    }

    //#region MaxBet
    MaxBet(apiurl, model) {
        return new Promise((resolve, reject) => {
            this.adminService.add<any>(apiurl, model).toPromise().then(res => {
                resolve({
                    'error': false,
                    'data': res
                });
            }), error => {
                reject({
                    'error': true,
                    'data': error
                });
            }
        });
    }
    //#endregion MaxBet

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

    //#endregion Wallet Balance

    //#region Check Permission

    async checkViewPermission() {
        var usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
        if (usersPermissions.permissionsList[2].Permissions[0].IsChecked === true) {
            if (usersPermissions.permissionsList[2].submenu[3].Permissions[0].IsChecked === true) {
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
            if (usersPermissions.permissionsList[2].submenu[3].Permissions[1].IsChecked === true) {
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
            if (usersPermissions.permissionsList[2].submenu[3].Permissions[2].IsChecked === true) {
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
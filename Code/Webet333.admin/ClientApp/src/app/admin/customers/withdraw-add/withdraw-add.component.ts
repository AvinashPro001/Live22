﻿import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { AdminService } from '../../admin.service';
import { customer, ErrorMessages } from '../../../../environments/environment';
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { account, playtech, AGGame, M8Game, Joker, _918Kiss, gameBalance } from '../../../../environments/environment';
import { debounce } from 'rxjs/operators';
import { Md5 } from 'ts-md5/dist/md5';
import { async } from 'q';
import { debug } from 'util';
declare var require: any

@Component({
    selector: 'app-admin/withdraw-add/withdraw-add',
    templateUrl: './withdraw-add.component.html',
    styleUrls: ['./withdraw-add.component.scss']
})

export class WithdrawAddComponent implements OnInit {

    //#region variable
    disabled: boolean = false;
    customerData: any;
    singleSelect: any = [];
    selectedUserList: any;
    playtechBal: any;
    m8Bal: any;
    jokerBal: any;
    agBal: any;
    saBal: any;
    dgBal: any;
    Pussy888Bal: any;
    sexybaccaratBal: any;
    selectedBankList: any;
    selectedMethodList: any;
    selectedWalletList: any;
    listType: any;
    selectedList: any;
    selectedList1: any;
    customerWallet: any;
    newVal: any;
    mainBal: any;
    maxbetBal: any;
    kissBal: any;
    mega888Bal: any;
    ddlData: any;
    walletType: any;
    depositType: any;
    bankList: any;
    promotionList: any;
    promotionListhtml: string;
    customerBank: any;
    bankName: any;
    selectedList3: any;
    resWalletId: any;
    accountHolder: string;
    accountNumber: string;
    WalletId: any;
    balance: any;
    id1: any;
    resBankId: any;
    apiPlaytech: any;
    apiAG: any;
    maxbetResult: any;
    apiRes2: any;
    api918Kiss: any;
    resultAG: any;
    resultPlaytech: any;
    resultJoker: any;
    result981Kiss: any;
    resultM8: any;
    IsMaintenance: boolean = false;
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
    wmBal: any;
    wmUsername: any;
    pragmaticBal: any;
    pragmaticUsername: any;
    allbetBal: any;
    allbetUsername: any;
    userPassword: any;

    //#endregion

    //#region ngOnInit
    async ngOnInit() {
        if (await this.checkAddPermission()) this.customerUser();
    }
    //#endregion

    //#region onChange
    onChange(event) {
        this.newVal = event.value.id;
        this.userPassword = event.value.password;
        this.balanceUpdate(this.newVal)
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

    balanceUpdate(newVal) {
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
            this.pragmaticUsername = res.data.pragmaticUsername;
            this.allbetUsername = res.data.allbetUsername;
            this.wmUsername = res.data.wmUsername;
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
            this.Pragmatic(newVal);
            this.AllBet(newVal);
            this.WM(newVal);
        });
    }

    //#region constructor
    constructor(
        private adminService: AdminService,
        private toasterService: ToasterService,
        private router: Router
    ) { }
    //#endregion

    //#region customerUser
    customerUser() {
        var model = {};
        this.adminService.add<any>(customer.customerList, model).subscribe(res => {
            this.customerData = res.data;
        }, error => {
            this.toasterService.pop('error', 'Error', error.error.message);
        });
    }
    //#endregion

    //#region walletData
    walletData(newVal) {
        var data = {
            id: newVal,
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
            this.Kiss918Balance(newVal);
            this.Mega888(newVal);
            this.Maxbet(newVal);
            this.M8(newVal);
            this.AG(newVal);
            this.DG(newVal);
            this.ManiWalletBalance(newVal);
            this.Playtech(newVal);
            this.Joker(newVal);
            this.SA(newVal);
            this.Pussy888(newVal);
            this.AllBet(newVal);
            this.WM(newVal);
            this.Pragmatic(newVal);

            this.adminService.getAll<any>(customer.depositDdl).subscribe(res => {
                this.ddlData = res.data;
                this.resWalletId = this.ddlData.walletTypes;
            }, error => {
                this.toasterService.pop('error', 'Error', error.error.message);
            });
        });

    }

    walletDatabal() {
        var id1 = (document.getElementById("ddl_bank") as HTMLInputElement).value;
        for (let i = 0; i < this.resBankId.length; i++) {
            if (id1 === this.resBankId[i].id) {
                this.bankName = this.resBankId[i].bankName;
                this.accountHolder = this.resBankId[i].accountName;
                this.accountNumber = this.resBankId[i].accountNo
            }
        }
    }
    //#endregion

    //#region retriveUserbank
    retriveUserbank(newVal) {
        var model = {
            id: newVal,
        }
        this.adminService.add<any>(customer.userBank, model).subscribe(res => {
            this.customerBank = res.data;
            for (let i = 0; i < this.customerBank.length; i++) {
                this.resBankId = this.customerBank;
            }
            this.bankName = (this.customerBank.length !== 0) ? this.customerBank[0].bankName : "Not Available";
            this.accountHolder = (this.customerBank.length !== 0) ? this.customerBank[0].accountName : "Not Available";
            this.accountNumber = (this.customerBank.length !== 0) ? this.customerBank[0].accountNo : "Not Available";
        }, error => {
            this.toasterService.pop('error', 'Error', error.error.message);
        })
    }
    //#endregion

    //#region Add Withdrawl
    addWithdrawal() {
        this.disabled = true;
        let dataSelect = {
            userId: this.newVal,
            bankId: ((document.getElementById("ddl_bank") as HTMLInputElement).value),
            amount: ((document.getElementById("txt_amount") as HTMLInputElement).value),
            accountNumber: this.accountHolder,
            accountName: this.accountNumber,
            adminRemark: ((document.getElementById("txt_remark") as HTMLInputElement).value)
        }

        let dataProfile = {
            id: dataSelect.userId
        };

        var promotionModel = {
            userid: dataSelect.userId,
            amount: Number(dataSelect.amount)
        };


        this.adminService.add<any>(customer.promotionApplyCheck, promotionModel).subscribe(async CheckPromotionApply => {
            if (CheckPromotionApply.data.Staus != null && CheckPromotionApply.data.TotalPromotionRow > 0) {
                this.disabled = false;
                this.ngOnInit();
                return this.toasterService.pop('error', 'Error', "Your Promotion is on going, cannot withdraw till the promotion is completed");
            }


            this.adminService.add<any>(account.profile, dataProfile).subscribe(async resUser => {
                this.adminService.add<any>(customer.addWithdrawal, dataSelect).subscribe(res => {
                    this.balanceUpdate(resUser.data.id);
                    this.toasterService.pop('success', 'Success', res.Meassage);
                    this.router.navigate(['admin/customers/withdraw-list']);
                }, error => {
                    this.disabled = false;
                    this.ngOnInit();
                    this.toasterService.pop('error', 'Error', error.error.message);
                });
            }, error => {
                this.disabled = false;
                this.ngOnInit();
                this.toasterService.pop('error', 'Error', error.error.message);
            });
        });

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
                        'data': error.message
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
                        'data': error.message
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
                        'data': res
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
                        'data': error.message
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
                        'data': error.message
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
                        'data': error.message
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

    generate(n) {
        var add = 1, max = 12 - add;
        if (n > max)
            return this.generate(max) + this.generate(n - max);

        max = Math.pow(10, n + add);
        var min = max / 10;
        var number = Math.floor(Math.random() * (max - min + 1)) + min;
        return ("" + number).substring(add);
    }

    //#region MaxBet
    MaxBet(apiurl, model) {
        return new Promise((resolve, reject) => {
            this.adminService.add<any>(apiurl, model).toPromise().then(res => {
                resolve({
                    'error': false,
                    'data': res
                });
            }).catch(error => {
                resolve({
                    'error': true,
                    'data': error
                });
            });
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

    //#endregion Wallet Balance

    //#region Check Permission

    async checkViewPermission() {
        var usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
        if (usersPermissions.permissionsList[2].Permissions[0].IsChecked === true) {
            if (usersPermissions.permissionsList[2].submenu[1].Permissions[0].IsChecked === true) {
                return true;
            } else {
                this.toasterService.pop('error', 'Error', ErrorMessages.unAuthorized);
                this.router.navigate(['admin/dashboard']);
                return false;
            }
        } else {
            this.toasterService.pop('error', 'Error', ErrorMessages.unAuthorized);
            this.router.navigate(['admin/dashboard']);
            return false;
        }
    }

    async checkUpdatePermission() {
        var usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
        if (usersPermissions.permissionsList[2].Permissions[1].IsChecked === true) {
            if (usersPermissions.permissionsList[2].submenu[1].Permissions[1].IsChecked === true) {
                return true;
            } else {
                this.toasterService.pop('error', 'Error', ErrorMessages.unAuthorized);
                this.router.navigate(['admin/dashboard']);
                return false;
            }
        } else {
            this.toasterService.pop('error', 'Error', ErrorMessages.unAuthorized);
            this.router.navigate(['admin/dashboard']);
            return false;
        }
    }

    async checkAddPermission() {
        var usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
        if (usersPermissions.permissionsList[2].Permissions[2].IsChecked === true) {
            if (usersPermissions.permissionsList[2].submenu[1].Permissions[2].IsChecked === true) {
                return true;
            } else {
                this.toasterService.pop('error', 'Error', ErrorMessages.unAuthorized);
                this.router.navigate(['admin/dashboard']);
                return false;
            }
        } else {
            this.toasterService.pop('error', 'Error', ErrorMessages.unAuthorized);
            this.router.navigate(['admin/dashboard']);
            return false;
        }
    }

    //#endregion Check Permission
}
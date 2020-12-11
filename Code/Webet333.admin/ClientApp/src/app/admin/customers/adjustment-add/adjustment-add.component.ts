import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { AdminService } from '../../admin.service';
import { customer } from '../../../../environments/environment';
import { account, gameBalance } from '../../../../environments/environment';
import { Route } from '@angular/compiler/src/core';
import { Md5 } from 'ts-md5/dist/md5';
import { error } from '@angular/compiler/src/util';

@Component({
    selector: 'app-adjustment-add',
    templateUrl: './adjustment-add.component.html',
    styleUrls: ['./adjustment-add.component.scss']
})
export class AdjustmentAddComponent implements OnInit {
    disabled: boolean = false;
    customerData: any;
    selectedList3: any;
    selectedList1: any;
    ddlData: any;
    walletType: any;
    customerWallet: any;
    mainBal: any;
    kissBal: any;
    sexybaccaratBal:any;
    maxbetBal: any;
    playtechBal: any;
    singleSelect: any = [];
    jokerBal: any;
    agBal: any;
    dgBal: any;
    Pussy888Bal: any;
    saBal: any;
    m8Bal: any;
    mega888Bal: any;
    apiPlaytech: any;
    apiAG: any;
    apiRes2: any;
    api918Kiss: any;
    apiM8: any;
    apiJoker: any;
    newVal: any;
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
    userPassword: any;

    pragmaticBal: any;
    pragmaticUsername: any;

    constructor(
        private adminService: AdminService,
        private toasterService: ToasterService,
        private router: Router
    ) { }

    ngOnInit() {
        this.customerUser();
        this.retrieveDepositpage();
    }
    //work
    retrieveDepositpage() {
        this.adminService.getAll<any>(customer.depositDdl).subscribe(res => {
            this.ddlData = res.data;
            this.walletType = this.ddlData.walletTypes;
        }, error => {
            this.toasterService.pop('error', 'Error', error.error.message);
        });
    }

    walletData(newVal) {
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
        })
    }

    addAdjustment() {
        if (this.newVal != undefined) {
            this.disabled = true;
            var Id;
            //for (let i = 0; i < this.customerWallet.length; i++) {
            //    if (this.customerWallet[i].walletName == "Main Wallet")
            //        Id = this.customerWallet[i].walletId;
            //}
            let dataSelectAdjustment = {
                userId: this.newVal,
                walletId: null,
                amount: ((document.getElementById("txt_amount") as HTMLInputElement).value),
                adminRemark: ((document.getElementById("txt_remark") as HTMLInputElement).value)
            }
            //var amount;
            //for (let i = 0; i < this.customerWallet.length; i++) {
            //    if (this.customerWallet[i].walletId === dataSelectAdjustment.walletId) {
            //        amount = this.customerWallet[i].amount;
            //    }
            //}

            if (+dataSelectAdjustment.amount > 0) {
                //deposit
                let dataProfile = {
                    id: dataSelectAdjustment.userId
                }
                this.adminService.add<any>(customer.adjustmentAdd, dataSelectAdjustment).subscribe(res => {
                    this.toasterService.pop('success', 'Successfully', res.message);
                    this.router.navigate(['admin/customers/adjustment-list']);
                }, error => {
                    this.disabled = false;
                    this.ngOnInit();
                    this.toasterService.pop('error', 'Error', error.message);
                });

            }
            else if (+dataSelectAdjustment.amount < 0) {
                //withdrawal
                let dataProfile = {
                    id: dataSelectAdjustment.userId
                }

                this.adminService.add<any>(customer.adjustmentAdd, dataSelectAdjustment).subscribe(res => {
                    this.toasterService.pop('success', 'Successfully', res.message);
                    this.router.navigate(['admin/customers/adjustment-list']);
                }, error => {
                    this.disabled = false;
                    this.ngOnInit();
                    this.toasterService.pop('error', 'Error', error.message);
                });

            }
            else {
                this.disabled = false;
                this.ngOnInit();
                this.toasterService.pop('error', 'Error', "Please provide proper value !!");            }
        }
        else {
            this.toasterService.pop('error', 'Error', "Please Select User !!");
        }
    }

    onChange(event) {
        this.newVal = event.value.id;
        this.userPassword = event.value.password;
        this.walletData(this.newVal);
    }

    searchChange($event) {
        console.log($event);
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

    customerUser() {
        var model = {};
        this.adminService.add<any>(customer.customerList, model).subscribe(res => {
            this.customerData = res.data;
        }, error => {
            this.toasterService.pop('error', 'Error', error.error.message);
        });
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
    //#endregion Wallet Balance
}

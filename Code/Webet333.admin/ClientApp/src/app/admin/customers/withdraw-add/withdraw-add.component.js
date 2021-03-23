"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var environment_1 = require("../../../../environments/environment");
var WithdrawAddComponent = /** @class */ (function () {
    //#endregion
    //#region constructor
    function WithdrawAddComponent(adminService, toasterService, router) {
        this.adminService = adminService;
        this.toasterService = toasterService;
        this.router = router;
    }
    //#endregion
    //#region ngOnInit
    WithdrawAddComponent.prototype.ngOnInit = function () {
        this.customerUser();
    };
    //#endregion
    //#region onChange
    WithdrawAddComponent.prototype.onChange = function (event) {
        var newVal = event.target.value;
        this.retriveUserbank(newVal);
        this.walletData(newVal);
    };
    //#endregion
    //#region customerUser
    WithdrawAddComponent.prototype.customerUser = function () {
        var _this = this;
        var model = {};
        this.adminService.add(environment_1.customer.customerList, model).subscribe(function (res) {
            _this.customerData = res.data;
        }, function (error) {
            _this.toasterService.pop('error', 'Error', error.error.message);
        });
    };
    //#endregion
    //#region walletData
    WithdrawAddComponent.prototype.walletData = function (newVal) {
        var _this = this;
        var data = {
            id: newVal,
        };
        this.adminService.add(environment_1.customer.walletBalance, data).subscribe(function (res) {
            _this.customerWallet = res.data;
            for (var i = 0; i < _this.customerWallet.length; i++) {
                _this.resWalletId = _this.customerWallet;
                if (_this.customerWallet[i].walletName == 'Main Wallet') {
                    _this.mainBal = _this.customerWallet[i].amount;
                }
                else if (_this.customerWallet[i].walletName == '918Kiss Wallet') {
                    _this.kissBal = _this.customerWallet[i].amount;
                }
                else if (_this.customerWallet[i].walletName == 'PlayTech Wallet') {
                    _this.playtechBal = _this.customerWallet[i].amount;
                }
                else if (_this.customerWallet[i].walletName == 'Joker Wallet') {
                    _this.jokerBal = _this.customerWallet[i].amount;
                }
                else if (_this.customerWallet[i].walletName == 'AG Wallet') {
                    _this.agBal = _this.customerWallet[i].amount;
                }
                else if (_this.customerWallet[i].walletName == 'M8 Wallet') {
                    _this.m8Bal = _this.customerWallet[i].amount;
                }
            }
        }, function (error) {
            _this.toasterService.pop('error', 'Error', error.error.message);
        });
    };
    WithdrawAddComponent.prototype.walletDatabal = function () {
        var id1 = document.getElementById("ddl_wallet").value;
        for (var i = 0; i < this.customerWallet.length; i++) {
            if (id1 === this.customerWallet[i].walletId) {
                this.balance = (this.customerWallet[i].amount);
            }
        }
    };
    //#endregion
    //#region retriveUserbank
    WithdrawAddComponent.prototype.retriveUserbank = function (newVal) {
        var _this = this;
        var model = {
            id: newVal,
        };
        this.adminService.add(environment_1.customer.userBank, model).subscribe(function (res) {
            _this.customerBank = res.data;
            for (var i = 0; i < _this.customerBank.length; i++) {
                _this.resBankId = _this.customerBank;
            }
            _this.bankName = (_this.customerBank.length !== 0) ? _this.customerBank[0].bankName : "Not Available";
            _this.accountHolder = (_this.customerBank.length !== 0) ? _this.customerBank[0].accountName : "Not Available";
            _this.accountNumber = (_this.customerBank.length !== 0) ? _this.customerBank[0].accountNo : "Not Available";
        }, function (error) {
            _this.toasterService.pop('error', 'Error', error.error.message);
        });
    };
    //#endregion
    //#region addDeposit
    WithdrawAddComponent.prototype.addWithdrawal = function () {
        var _this = this;
        var dataSelect = {
            userId: (document.getElementById("ddl_username").value),
            bankId: (document.getElementById("ddl_bank").value),
            walletId: (document.getElementById("ddl_wallet").value),
            amount: (document.getElementById("txt_amount").value),
        };
        this.adminService.add(environment_1.customer.addWithdrawal, dataSelect).subscribe(function (res) {
            _this.toasterService.pop('success', 'Success', res.message);
            for (var i = 0; i < _this.customerWallet.length; i++) {
                if (_this.customerWallet[i].walletId === dataSelect.walletId) {
                    var walletName = _this.customerWallet[i].walletId;
                    switch (walletName) {
                        case 'Main Wallet': _this.toasterService.pop('success', 'Success', res.message);
                        case 'PlayTech Wallet': {
                        }
                        case 'Joker Wallet': {
                        }
                        case 'M8 Wallet':
                            {
                            }
                            ;
                        case 'AG Wallet':
                            {
                            }
                            ;
                        case '918Kiss Wallet':
                            {
                            }
                            ;
                    }
                }
            }
        }, function (error) {
            _this.toasterService.pop('error', 'Error', error.error.message);
        });
    };
    WithdrawAddComponent = __decorate([
        core_1.Component({
            selector: 'app-admin/withdraw-add/withdraw-add',
            templateUrl: './withdraw-add.component.html',
            styleUrls: ['./withdraw-add.component.scss']
        })
    ], WithdrawAddComponent);
    return WithdrawAddComponent;
}());
exports.WithdrawAddComponent = WithdrawAddComponent;
//# sourceMappingURL=withdraw-add.component.js.map
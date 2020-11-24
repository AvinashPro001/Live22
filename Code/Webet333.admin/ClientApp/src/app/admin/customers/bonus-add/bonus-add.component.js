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
var ImageSnippet = /** @class */ (function () {
    function ImageSnippet(src, file) {
        this.src = src;
        this.file = file;
        this.pending = false;
        this.status = 'init';
    }
    return ImageSnippet;
}());
var BonusAddComponent = /** @class */ (function () {
    //#endregion
    //#region constructor
    function BonusAddComponent(adminService, toasterService, router) {
        this.adminService = adminService;
        this.toasterService = toasterService;
        this.router = router;
        this.hasBaseDropZoneOver = false;
        this.hasAnotherDropZoneOver = false;
        this.timeStart = { hour: 13, minute: 30 };
        this.timeEnd = { hour: 13, minute: 30 };
        this.meridian = true;
    }
    BonusAddComponent.prototype.toggleMeridian = function () {
        this.meridian = !this.meridian;
    };
    //#endregion
    //#region ngOnInit
    BonusAddComponent.prototype.ngOnInit = function () {
        this.customerUser();
        this.retrieveDepositpage();
    };
    //#endregion
    //#region onChange
    BonusAddComponent.prototype.onChange = function (event) {
        var newVal = event.target.value;
        this.walletData(newVal);
    };
    //#endregion
    //#region AddPromotion
    BonusAddComponent.prototype.addBonus = function () {
        var _this = this;
        var radioValue = $("input[name='promotion']:checked").val();
        var dataSelect = {
            userId: (document.getElementById("ddl_username").value),
            walletTypeId: (document.getElementById("ddl_wallettype").value),
            amount: (document.getElementById("txt_amount").value),
            depositMethodId: this.depositType[0].id,
            referenceNo: (document.getElementById("txt_reference").value),
            promotionId: radioValue
        };
        this.adminService.add(environment_1.customer.addDeposit, dataSelect).subscribe(function (res) {
            _this.toasterService.pop('success', 'Success', res.message);
        }, function (error) {
            _this.toasterService.pop('error', 'Error', error.error.message);
        });
    };
    //#endregion
    //#region customerUser
    BonusAddComponent.prototype.customerUser = function () {
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
    BonusAddComponent.prototype.walletData = function (newVal) {
        var _this = this;
        var data = {
            id: newVal,
        };
        this.adminService.add(environment_1.customer.walletBalance, data).subscribe(function (res) {
            _this.customerWallet = res.data;
            for (var i = 0; i < _this.customerWallet.length; i++) {
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
    //#endregion
    //#region retrieveDepositpage
    BonusAddComponent.prototype.retrieveDepositpage = function () {
        var _this = this;
        this.adminService.getAll(environment_1.customer.bonusDdl).subscribe(function (res) {
            _this.ddlData = res.data;
            _this.walletType = _this.ddlData.walletTypes;
            _this.depositType = _this.ddlData.depositMethods;
            _this.promotionList = _this.ddlData.promotions;
            _this.length = _this.promotionList.length;
        }, function (error) {
            _this.toasterService.pop('error', 'Error', error.error.message);
        });
    };
    //#endregion
    BonusAddComponent.prototype.fileOverBase = function (e) {
        this.hasBaseDropZoneOver = e;
    };
    BonusAddComponent.prototype.fileOverAnother = function (e) {
        this.hasAnotherDropZoneOver = e;
    };
    BonusAddComponent = __decorate([
        core_1.Component({
            selector: 'app-admin/bonus/bonus-add',
            templateUrl: './bonus-add.component.html',
            styleUrls: ['./bonus-add.component.scss']
        })
    ], BonusAddComponent);
    return BonusAddComponent;
}());
exports.BonusAddComponent = BonusAddComponent;
//# sourceMappingURL=bonus-add.component.js.map
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function () { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepositAddComponent = void 0;
var core_1 = require("@angular/core");
var environment_1 = require("../../../../environments/environment");
var DepositAddComponent = /** @class */ (function () {
    //#endregion
    //#region constructor
    function DepositAddComponent(adminService, toasterService, router, modalService) {
        this.adminService = adminService;
        this.toasterService = toasterService;
        this.router = router;
        this.modalService = modalService;
        //#region variable
        this.disabled = false;
        this.IsMaintenance = false;
        this.singleSelect = [];
        this.timeStart = { hour: 13, minute: 30 };
        this.timeEnd = { hour: 13, minute: 30 };
        this.meridian = true;
        this.filenames = [];
        this.urls = [];
        this.showModal = false;
        this.promotionshowModal = false;
        this.withoutPromotionshowModal = false;
        this.config = {
            displayKey: "username",
            search: true,
            height: '500px',
            placeholder: 'Select Username.',
            customComparator: function () { },
            limitTo: Option.length,
            moreText: 'more',
            noResultsFound: 'No results found!',
            searchPlaceholder: 'Search',
            searchOnKey: 'username' // key on which search should be performed this will be selective search. if undefined this will be extensive search on all keys
        };
    }
    //#endregion
    //#region ngOnInit
    DepositAddComponent.prototype.ngOnInit = function () {
        //#region Check Add Permission
        this.checkAddPermission();
        //#endregion Check Add Permission
        this.customerUser();
        this.retrieveDepositpage();
        this.filenames = [];
    };
    //#endregion
    //#region onChange
    DepositAddComponent.prototype.onChange = function (event) {
        this.newVal = event.value.id;
        this.userPassword = event.value.password;
        this.retriveUserbank(this.newVal);
        this.walletData(this.newVal);
    };
    //#endregion
    //#region customerUser
    DepositAddComponent.prototype.customerUser = function () {
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
    DepositAddComponent.prototype.walletData = function (newVal) {
        var _this = this;
        var promtoionModel = {
            id: newVal
        };
        this.adminService.add(environment_1.customer.promotionDailyList, promtoionModel).subscribe(function (res) {
            _this.promotionList = res.data;
            var data = {
                id: newVal
            };
            _this.adminService.add(environment_1.customer.GetUsername, data).subscribe(function (res) {
                _this.agUsername = res.data.agUsername;
                _this.playtechUsername = res.data.playtechUsername;
                _this.dgUsername = res.data.dgUsername;
                _this.saUsername = res.data.saUsername;
                _this.sexyUsername = res.data.sexyUsername;
                _this.jokerUsername = res.data.jokerUsername;
                _this.maxbetUsername = res.data.maxbetUsername;
                _this.m8Username = res.data.m8Username;
                _this.kiss918Username = res.data.kiss918Username;
                _this.mega888Username = res.data.mega888Username;
                _this.pussyUsername = res.data.pussy888Username;
                _this.allbetUsername = res.data.allbetUsername;
                _this.wmUsername = res.data.wmUsername;
                _this.pragmaticUsername = res.data.pragmaticUsername;
                _this.Kiss918Balance(newVal);
                _this.Mega888(newVal);
                _this.Maxbet(newVal);
                _this.M8(newVal);
                _this.AG(newVal);
                _this.DG(newVal);
                _this.ManiWalletBalance(newVal);
                _this.Playtech(newVal);
                _this.Joker(newVal);
                _this.Sexybaccarat(newVal);
                _this.SA(newVal);
                _this.Pussy888(newVal);
                _this.AllBet(newVal);
                _this.WM(newVal);
                _this.Pragmatic(newVal);
            });
        });
    };
    //#endregion
    //#region retriveUserbank
    DepositAddComponent.prototype.retriveUserbank = function (newVal) {
        var _this = this;
        var model = {
            id: newVal,
        };
        this.adminService.add(environment_1.customer.userBank, model).subscribe(function (res) {
            _this.customerBank = res.data;
            _this.bankList = _this.customerBank;
        }, function (error) {
            _this.toasterService.pop('error', 'Error', error.error.message);
        });
    };
    //#endregion
    //#region retrieveDepositpage
    DepositAddComponent.prototype.retrieveDepositpage = function () {
        var _this = this;
        this.adminService.getAll(environment_1.customer.depositDdl).subscribe(function (res) {
            _this.ddlData = res.data;
            _this.bank = _this.ddlData.bankDetails;
            _this.depositType = _this.ddlData.depositMethods;
            for (var i = 0; i < _this.depositType.length; i++) {
                if (_this.depositType[i].method === "Bank Transfer") {
                    _this.depsoitMethodId = _this.depositType[i].id;
                }
            }
        }, function (error) {
            _this.toasterService.pop('error', 'Error', error.error.message);
        });
    };
    //#endregion
    DepositAddComponent.prototype.RegisterAfterDeposite = function () {
        var userId = this.newVal;
        var userdata = this.customerData.filter(function (person) { return person.id == userId; });
        this.addDeposit();
    };
    //#region addDeposit
    DepositAddComponent.prototype.addDeposit = function () {
        var _this = this;
        this.disabled = true;
        var radioValue = $("input[name='promotion']:checked").val();
        var dataSelect = {
            userId: this.newVal,
            bankId: (document.getElementById("ddl_bank").value),
            depositMethodId: this.depsoitMethodId,
            amount: (document.getElementById("txt_amount").value),
            referenceNo: (document.getElementById("txt_reference").value),
            depositeTime: Date.parse(document.getElementById("txt_datetime").value).toString(),
            promotionId: radioValue,
            promotionApplyEligible: false,
            adminRemark: (document.getElementById("txt_remark").value)
        };
        if (dataSelect.userId === "0: undefined") {
            this.disabled = false;
            this.ngOnInit();
            return this.toasterService.pop('error', 'Error', "Please Select User");
        }
        if (dataSelect.bankId === "0: undefined") {
            this.disabled = false;
            this.ngOnInit();
            return this.toasterService.pop('error', 'Error', "Please Select Bank");
        }
        if (dataSelect.amount === "") {
            this.disabled = false;
            this.ngOnInit();
            return this.toasterService.pop('error', 'Error', "Please Enter Amount");
        }
        if (Number(dataSelect.amount) <= 0) {
            this.disabled = false;
            this.ngOnInit();
            return this.toasterService.pop('error', 'Error', "Please Insert greater Amount");
        }
        if (dataSelect.depositMethodId === "0: undefined") {
            this.disabled = false;
            this.ngOnInit();
            return this.toasterService.pop('error', 'Error', "Please Select Deposit Method");
        }
        if (dataSelect.referenceNo === "") {
            this.disabled = false;
            this.ngOnInit();
            return this.toasterService.pop('error', 'Error', "Please Enter Reference Number");
        }
        if (dataSelect.depositeTime == "NaN") {
            this.disabled = false;
            this.ngOnInit();
            return this.toasterService.pop('error', 'Error', "Please Select Date");
        }
        if (this.urls.length === 0) {
            this.disabled = false;
            this.ngOnInit();
            return this.toasterService.pop('error', 'Error', "Please Uploade Recipt");
        }
        if (dataSelect.promotionId !== "") {
            var promotionModel = {
                userid: dataSelect.userId,
                amount: dataSelect.amount
            };
            this.adminService.add(environment_1.customer.promotionApplyCheck, promotionModel).subscribe(function (walletData) {
                if (walletData.data.IsPending == false) {
                    if (walletData.data.InMaintenance == false) {
                        if (walletData.data.CheckPromotionApply === true && walletData.data.TotalPromotionRow > 0) {
                            if (confirm("Your balance is lower than 5 MYR of your deposit balance, you are available to apply new promotion, and your existing promotion wil be expired.")) {
                                dataSelect.promotionApplyEligible = true;
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
                                _this.disabled = false;
                                _this.ngOnInit();
                                return _this.toasterService.pop('error', 'Error', "You cannot apply promotion,Because  have active promotion");
                            }
                            if (walletData.data.CheckPromotionRemind == true) {
                                dataSelect.promotionApplyEligible = true;
                                _this.DepositModel = dataSelect;
                                _this.promotionshowModal = true;
                                _this.disabled = false;
                                return 0;
                            }
                            if (walletData.data.Staus == null) {
                                dataSelect.promotionApplyEligible = true;
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
                        _this.disabled = false;
                        _this.ngOnInit();
                        return _this.toasterService.pop('error', 'Error', "You cannot apply promotion,Because Game in maintenance");
                    }
                }
                else {
                    _this.disabled = false;
                    _this.ngOnInit();
                    return _this.toasterService.pop('error', 'Error', "Sports Book still have pending bets yet to be unsettled, please wait until all bets has been settled");
                }
                _this.DepositModel = dataSelect;
                _this.ConfirmDeposit();
                _this.disabled = false;
            });
        }
        else {
            var data = {
                id: dataSelect.userId
            };
            this.adminService.add(environment_1.customer.depositCheck, data).subscribe(function (Data) {
                if (Data.data.CheckPopupWithoutPromotion == true) {
                    _this.DepositModel = dataSelect;
                    _this.withoutPromotionshowModal = true;
                    _this.disabled = false;
                    return 0;
                }
                else {
                    _this.DepositModel = dataSelect;
                    _this.showModal = true;
                    _this.disabled = false;
                    return 0;
                }
            });
        }
    };
    DepositAddComponent.prototype.PromotionApplyCheck = function () {
        //let dataSelect = this.DepositModel;
        //var promotionModel2 = {
        //    userid: dataSelect.userId,
        //    amount: dataSelect.amount,
        //    promotionid: dataSelect.promotionId
        //};
        //this.adminService.add<any>(customer.promotionApplyInsert, promotionModel2).subscribe(walletData => {
        this.ConfirmDeposit();
        //});
    };
    DepositAddComponent.prototype.ConfirmDeposit = function () {
        var _this = this;
        var dataSelect = this.DepositModel;
        this.adminService.add(environment_1.customer.addDeposit, dataSelect).subscribe(function (res) {
            _this.toasterService.pop('success', 'Successfully', res.message);
            _this.uploadReceipt(res.data.id);
            _this.router.navigate(['admin/customers/deposit-list']);
        }, function (error) {
            _this.toasterService.pop('error', 'Error', error.message);
            _this.disabled = false;
            _this.ngOnInit();
        });
    };
    //#endregion
    //#region uploadReceipt
    //urls = new Array<any>();
    DepositAddComponent.prototype.uploadReceipt = function (id) {
        var _this = this;
        var data = {
            id: id,
            images: this.urls
        };
        this.adminService.add(environment_1.customer.userReceipt, data).subscribe(function (res) {
            _this.toasterService.pop('success', 'Success', res.message);
        }, function (error) {
            _this.toasterService.pop('error', 'Error', error.error.message);
        });
    };
    DepositAddComponent.prototype.selectfile = function (event) {
        if (event.target.files.length >= 0) {
            var filesAmount = event.target.files.length;
            for (var i = 0; i < filesAmount; i++) {
                var files = event.target.files[i];
                this.base64(files);
                this.filenames.push(event.target.files[i].name);
            }
        }
    };
    DepositAddComponent.prototype.base64 = function (file) {
        var _this = this;
        var reader = new FileReader();
        reader.onload = function (e) {
            _this.urls.push({ base64images: e.target.result });
        };
        reader.readAsDataURL(file);
    };
    DepositAddComponent.prototype.removefile = function (files) {
        var urlindex = this.filenames.map(function (singleUrl) { return singleUrl; }).indexOf(files);
        if (this.filenames.length == 1) {
            this.filenames.splice(urlindex, 1);
            var form = document.getElementById("imageform");
            form.reset();
        }
        else {
            this.filenames.splice(urlindex, 1);
        }
        var imageindexupload = this.urls.map(function (singleUrl) { return singleUrl; }).indexOf(files[0]);
        this.urls.splice(imageindexupload, 1);
    };
    //#endregion
    DepositAddComponent.prototype.hide = function () {
        this.showModal = false;
        this.promotionshowModal = false;
        this.withoutPromotionshowModal = false;
    };
    //#region Wallet Balance
    DepositAddComponent.prototype.convertDecimal = function (Balance) {
        return Number(Balance).toFixed(2);
    };
    DepositAddComponent.prototype.ManiWalletBalance = function (id) {
        var _this = this;
        var data = {
            id: id
        };
        this.adminService.add(environment_1.gameBalance.walletBalance, data).subscribe(function (res) {
            var balance = res.data.filter(function (x) { return x.walletName == "Main Wallet"; });
            _this.mainBal = _this.convertDecimal(balance[0].amount);
        });
    };
    DepositAddComponent.prototype.Kiss918Balance = function (id) {
        var _this = this;
        var data = {
            id: id,
            username: this.kiss918Username
        };
        this.adminService.add(environment_1.gameBalance.Kiss918, data).subscribe(function (res) {
            _this.kissBal = _this.convertDecimal(res.data.balance);
        });
    };
    DepositAddComponent.prototype.Mega888 = function (id) {
        var _this = this;
        var data = {
            id: id,
            username: this.mega888Username
        };
        this.adminService.add(environment_1.gameBalance.Mega888, data).subscribe(function (res) {
            _this.mega888Bal = _this.convertDecimal(res.data.balance);
        });
    };
    DepositAddComponent.prototype.Maxbet = function (id) {
        var _this = this;
        var data = {
            id: id,
            username: this.maxbetUsername
        };
        this.adminService.add(environment_1.gameBalance.Maxbet, data).subscribe(function (res) {
            _this.maxbetBal = _this.convertDecimal(res.data.balance);
        });
    };
    DepositAddComponent.prototype.M8 = function (id) {
        var _this = this;
        var data = {
            id: id,
            username: this.m8Username
        };
        this.adminService.add(environment_1.gameBalance.m8, data).subscribe(function (res) {
            _this.m8Bal = _this.convertDecimal(res.data.balance);
        });
    };
    DepositAddComponent.prototype.AG = function (id) {
        var _this = this;
        var data = {
            id: id,
            username: this.agUsername
        };
        this.adminService.add(environment_1.gameBalance.AG, data).subscribe(function (res) {
            _this.agBal = _this.convertDecimal(res.data.balance);
        });
    };
    DepositAddComponent.prototype.DG = function (id) {
        var _this = this;
        var data = {
            id: id,
            username: this.dgUsername
        };
        this.adminService.add(environment_1.gameBalance.DG, data).subscribe(function (res) {
            _this.dgBal = _this.convertDecimal(res.data.balance);
        });
    };
    DepositAddComponent.prototype.Playtech = function (id) {
        var _this = this;
        var data = {
            id: id,
            username: this.playtechUsername
        };
        this.adminService.add(environment_1.gameBalance.Playtech, data).subscribe(function (res) {
            _this.playtechBal = _this.convertDecimal(res.data.balance);
        });
    };
    DepositAddComponent.prototype.Joker = function (id) {
        var _this = this;
        var data = {
            id: id,
            username: this.jokerUsername
        };
        this.adminService.add(environment_1.gameBalance.Joker, data).subscribe(function (res) {
            _this.jokerBal = _this.convertDecimal(res.data.balance);
        });
    };
    DepositAddComponent.prototype.Sexybaccarat = function (id) {
        var _this = this;
        var data = {
            id: id,
            username: this.sexyUsername
        };
        this.adminService.add(environment_1.gameBalance.SexyBaccarat, data).subscribe(function (res) {
            _this.sexybaccaratBal = _this.convertDecimal(res.data.balance);
        });
    };
    DepositAddComponent.prototype.SA = function (id) {
        var _this = this;
        var data = {
            id: id,
            username: this.saUsername
        };
        this.adminService.add(environment_1.gameBalance.SA, data).subscribe(function (res) {
            _this.saBal = _this.convertDecimal(res.data.balance);
        });
    };
    DepositAddComponent.prototype.Pussy888 = function (id) {
        var _this = this;
        var data = {
            id: id,
            username: this.pussyUsername
        };
        this.adminService.add(environment_1.gameBalance.Pussy888, data).subscribe(function (res) {
            _this.Pussy888Bal = res.data.balance;
        });
    };
    DepositAddComponent.prototype.AllBet = function (id) {
        var _this = this;
        var data = {
            id: id,
            username: this.allbetUsername,
            password: this.userPassword
        };
        this.adminService.add(environment_1.gameBalance.AllBet, data).subscribe(function (res) {
            _this.allbetBal = res.data.balance;
        });
    };
    DepositAddComponent.prototype.WM = function (id) {
        var _this = this;
        var data = {
            id: id,
            username: this.wmUsername
        };
        this.adminService.add(environment_1.gameBalance.WM, data).subscribe(function (res) {
            _this.wmBal = res.data.balance;
        });
    };
    DepositAddComponent.prototype.Pragmatic = function (id) {
        var _this = this;
        var data = {
            id: id,
            username: this.pragmaticUsername
        };
        this.adminService.add(environment_1.gameBalance.Pragmatic, data).subscribe(function (res) {
            _this.pragmaticBal = res.data.balance;
        });
    };
    //#endregion Wallet Balance
    //#region Check Permission
    DepositAddComponent.prototype.checkViewPermission = function () {
        return __awaiter(this, void 0, void 0, function () {
            var usersPermissions;
            return __generator(this, function (_a) {
                usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
                if (usersPermissions.permissionsList[2].Permissions[0].IsChecked === true) {
                    if (usersPermissions.permissionsList[2].submenu[0].Permissions[0].IsChecked === true) {
                        return [2 /*return*/, true];
                    }
                    else {
                        this.toasterService.pop('error', 'Error', environment_1.this.commonService.errorMessage.unAuthorized);
                        this.router.navigate(['admin/dashboard']);
                        return [2 /*return*/, false];
                    }
                }
                else {
                    this.toasterService.pop('error', 'Error', environment_1.this.commonService.errorMessage.unAuthorized);
                    this.router.navigate(['admin/dashboard']);
                    return [2 /*return*/, false];
                }
                return [2 /*return*/];
            });
        });
    };
    DepositAddComponent.prototype.checkUpdatePermission = function () {
        return __awaiter(this, void 0, void 0, function () {
            var usersPermissions;
            return __generator(this, function (_a) {
                usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
                if (usersPermissions.permissionsList[2].Permissions[1].IsChecked === true) {
                    if (usersPermissions.permissionsList[2].submenu[0].Permissions[1].IsChecked === true) {
                        return [2 /*return*/, true];
                    }
                    else {
                        this.toasterService.pop('error', 'Error', environment_1.this.commonService.errorMessage.unAuthorized);
                        this.router.navigate(['admin/dashboard']);
                        return [2 /*return*/, false];
                    }
                }
                else {
                    this.toasterService.pop('error', 'Error', environment_1.this.commonService.errorMessage.unAuthorized);
                    this.router.navigate(['admin/dashboard']);
                    return [2 /*return*/, false];
                }
                return [2 /*return*/];
            });
        });
    };
    DepositAddComponent.prototype.checkAddPermission = function () {
        return __awaiter(this, void 0, void 0, function () {
            var usersPermissions;
            return __generator(this, function (_a) {
                usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
                if (usersPermissions.permissionsList[2].Permissions[2].IsChecked === true) {
                    if (usersPermissions.permissionsList[2].submenu[0].Permissions[2].IsChecked === true) {
                        return [2 /*return*/, true];
                    }
                    else {
                        this.toasterService.pop('error', 'Error', environment_1.this.commonService.errorMessage.unAuthorized);
                        this.router.navigate(['admin/dashboard']);
                        return [2 /*return*/, false];
                    }
                }
                else {
                    this.toasterService.pop('error', 'Error', environment_1.this.commonService.errorMessage.unAuthorized);
                    this.router.navigate(['admin/dashboard']);
                    return [2 /*return*/, false];
                }
                return [2 /*return*/];
            });
        });
    };
    DepositAddComponent = __decorate([
        core_1.Component({
            selector: 'app-admin/deposit/deposit-add',
            templateUrl: './deposit-add.component.html',
            styleUrls: ['./deposit-add.component.scss']
        })
    ], DepositAddComponent);
    return DepositAddComponent;
}());
exports.DepositAddComponent = DepositAddComponent;
//# sourceMappingURL=deposit-add.component.js.map
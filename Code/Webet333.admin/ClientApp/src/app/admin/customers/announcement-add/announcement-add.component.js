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
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
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
exports.AnnouncementAddComponent = void 0;
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
var AnnouncementAddComponent = /** @class */ (function () {
    //#region constructor
    function AnnouncementAddComponent(adminService, toasterService, router) {
        this.adminService = adminService;
        this.toasterService = toasterService;
        this.router = router;
        //#endregion
        this.disabled = false;
        this.hasBaseDropZoneOver = false;
        this.hasAnotherDropZoneOver = false;
        this.timeStart = { hour: 13, minute: 30 };
        this.timeEnd = { hour: 13, minute: 30 };
        this.meridian = true;
    }
    AnnouncementAddComponent.prototype.toggleMeridian = function () {
        this.meridian = !this.meridian;
    };
    //#endregion
    //#region ngOnInit
    AnnouncementAddComponent.prototype.ngOnInit = function () {
        if (this.checkAddPermission())
            this.getLanguage();
    };
    //#endregion
    AnnouncementAddComponent.prototype.getLanguage = function () {
        var _this = this;
        this.adminService.get(environment_1.account.getLanguageList).subscribe(function (res) {
            _this.Language = res.data;
        });
    };
    //#region onChange
    AnnouncementAddComponent.prototype.onChange = function (event) {
        var newVal = event.target.value;
    };
    //#endregion
    //#region AddPromotion
    AnnouncementAddComponent.prototype.addAnnouncement = function () {
        var _this = this;
        this.disabled = true;
        var dataSelect = {
            announcement: (document.getElementById("txt_reference").value),
            languageid: document.getElementById("ddlLanguage").value
        };
        this.adminService.add(environment_1.customer.announcementAdd, dataSelect).subscribe(function (res) {
            _this.toasterService.pop('success', 'Success', res.message);
            _this.router.navigate(['admin/customers/announcement-list']);
        }, function (error) {
            _this.disabled = false;
            _this.ngOnInit();
            _this.toasterService.pop('error', 'Error', error.error.message);
        });
    };
    //#endregion
    AnnouncementAddComponent.prototype.fileOverBase = function (e) {
        this.hasBaseDropZoneOver = e;
    };
    AnnouncementAddComponent.prototype.fileOverAnother = function (e) {
        this.hasAnotherDropZoneOver = e;
    };
    //#region Check Permission
    AnnouncementAddComponent.prototype.checkViewPermission = function () {
        return __awaiter(this, void 0, void 0, function () {
            var usersPermissions;
            return __generator(this, function (_a) {
                usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
                if (usersPermissions.permissionsList[1].Permissions[0].IsChecked === true) {
                    if (usersPermissions.permissionsList[1].submenu[9].Permissions[0].IsChecked === true) {
                        return [2 /*return*/, true];
                    }
                    else {
                        this.toasterService.pop('error', 'Error', environment_1.ErrorMessages.unAuthorized);
                        this.router.navigate(['admin/dashboard']);
                        return [2 /*return*/, false];
                    }
                }
                else {
                    this.toasterService.pop('error', 'Error', environment_1.ErrorMessages.unAuthorized);
                    this.router.navigate(['admin/dashboard']);
                    return [2 /*return*/, false];
                }
                return [2 /*return*/];
            });
        });
    };
    AnnouncementAddComponent.prototype.checkUpdatePermission = function () {
        return __awaiter(this, void 0, void 0, function () {
            var usersPermissions;
            return __generator(this, function (_a) {
                usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
                if (usersPermissions.permissionsList[1].Permissions[1].IsChecked === true) {
                    if (usersPermissions.permissionsList[1].submenu[9].Permissions[1].IsChecked === true) {
                        return [2 /*return*/, true];
                    }
                    else {
                        this.toasterService.pop('error', 'Error', environment_1.ErrorMessages.unAuthorized);
                        this.router.navigate(['admin/dashboard']);
                        return [2 /*return*/, false];
                    }
                }
                else {
                    this.toasterService.pop('error', 'Error', environment_1.ErrorMessages.unAuthorized);
                    this.router.navigate(['admin/dashboard']);
                    return [2 /*return*/, false];
                }
                return [2 /*return*/];
            });
        });
    };
    AnnouncementAddComponent.prototype.checkAddPermission = function () {
        return __awaiter(this, void 0, void 0, function () {
            var usersPermissions;
            return __generator(this, function (_a) {
                usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
                if (usersPermissions.permissionsList[1].Permissions[2].IsChecked === true) {
                    if (usersPermissions.permissionsList[1].submenu[9].Permissions[2].IsChecked === true) {
                        return [2 /*return*/, true];
                    }
                    else {
                        this.toasterService.pop('error', 'Error', environment_1.ErrorMessages.unAuthorized);
                        this.router.navigate(['admin/dashboard']);
                        return [2 /*return*/, false];
                    }
                }
                else {
                    this.toasterService.pop('error', 'Error', environment_1.ErrorMessages.unAuthorized);
                    this.router.navigate(['admin/dashboard']);
                    return [2 /*return*/, false];
                }
                return [2 /*return*/];
            });
        });
    };
    AnnouncementAddComponent = __decorate([
        core_1.Component({
            selector: 'app-admin/announcement/announcement-add',
            templateUrl: './announcement-add.component.html',
            styleUrls: ['./announcement-add.component.scss']
        })
    ], AnnouncementAddComponent);
    return AnnouncementAddComponent;
}());
exports.AnnouncementAddComponent = AnnouncementAddComponent;
//# sourceMappingURL=announcement-add.component.js.map
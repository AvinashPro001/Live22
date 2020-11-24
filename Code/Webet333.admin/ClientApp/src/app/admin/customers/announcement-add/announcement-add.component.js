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
var AnnouncementAddComponent = /** @class */ (function () {
    //#endregion
    //#region constructor
    function AnnouncementAddComponent(adminService, toasterService, router) {
        this.adminService = adminService;
        this.toasterService = toasterService;
        this.router = router;
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
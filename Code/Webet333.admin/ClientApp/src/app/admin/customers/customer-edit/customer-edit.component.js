"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var angular2_toaster_1 = require("angular2-toaster");
var environment_1 = require("../../../../environments/environment");
var CustomerEditComponent = /** @class */ (function () {
    //#region constructor
    function CustomerEditComponent(adminService, toasterService, router) {
        this.adminService = adminService;
        this.toasterService = toasterService;
        this.router = router;
        this.toasterconfig = new angular2_toaster_1.ToasterConfig({
            positionClass: 'toast-bottom-right',
            showCloseButton: true
        });
    }
    //#endregion
    //#region Init
    CustomerEditComponent.prototype.ngOnInit = function () {
        this.getProfile();
    };
    //#endregion
    //#region getProfile
    CustomerEditComponent.prototype.getProfile = function () {
        var dataCustomer = JSON.parse(localStorage.getItem('data'));
        this.data = dataCustomer;
    };
    //#endregion
    //#region updateProfile
    CustomerEditComponent.prototype.updateProfile = function (data) {
        var _this = this;
        var dataSelect = {
            id: data.id,
            username: (document.getElementById("txt_username").value),
            mobile: (document.getElementById("txt_newMobileNumber").value),
            password: (document.getElementById("txt_newPassowrd").value),
            name: (document.getElementById("txt_newName").value)
        };
        this.adminService.add(environment_1.customer.customerUpdate, dataSelect).subscribe(function (res) {
            _this.toasterService.pop('success', 'Success', res.message);
            _this.router.navigate(['admin/customers/list']);
        }, function (error) {
            _this.toasterService.pop('error', 'Error', error.error.message);
        });
    };
    //#endregion
    //#region navigateCancle
    CustomerEditComponent.prototype.navigateCancle = function () {
        this.router.navigate(['admin/customers/list']);
    };
    CustomerEditComponent = __decorate([
        core_1.Component({
            selector: 'app-admin/customer/edit-list',
            templateUrl: './customer-edit.component.html',
            styleUrls: ['./customer-edit.component.scss']
        })
    ], CustomerEditComponent);
    return CustomerEditComponent;
}());
exports.CustomerEditComponent = CustomerEditComponent;
//# sourceMappingURL=customer-edit.component.js.map
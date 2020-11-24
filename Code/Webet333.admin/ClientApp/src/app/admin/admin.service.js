"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var AdminService = /** @class */ (function () {
    function AdminService(http) {
        this.http = http;
    }
    AdminService.prototype.formData = function (formData) {
        return Object.keys(formData).map(function (key) {
            return encodeURIComponent(key) + '=' + encodeURIComponent(formData[key]);
        }).join('&');
    };
    AdminService.prototype.add = function (apiPath, data) {
        return this.http.post(apiPath, data);
    };
    AdminService.prototype.addWithoutParam = function (apiPath) {
        return this.http.post(apiPath, '');
    };
    AdminService.prototype.getAll = function (apiPath) {
        return this.http.get(apiPath);
    };
    AdminService.prototype.get = function (apiPath) {
        return this.http.get(apiPath);
    };
    AdminService = __decorate([
        core_1.Injectable()
    ], AdminService);
    return AdminService;
}());
exports.AdminService = AdminService;
//# sourceMappingURL=admin.service.js.map
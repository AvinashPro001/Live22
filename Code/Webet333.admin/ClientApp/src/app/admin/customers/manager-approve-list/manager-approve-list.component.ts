import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { HubConnectionBuilder } from '@aspnet/signalr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { ToasterService } from 'angular2-toaster';
import { account } from '../../../../environments/environment';
import { CommonService } from '../../../common/common.service';
import { AdminService } from '../../admin.service';

@Component({
    selector: 'app-manager-approve-list',
    templateUrl: './manager-approve-list.component.html',
    styleUrls: ['./manager-approve-list.component.scss']
})

export class ManagerApproveListComponent implements OnInit {
    @ViewChild(DatatableComponent) table: DatatableComponent;
    @ViewChild('status') status: TemplateRef<any>;
    @ViewChild('receipt') receipt: TemplateRef<any>;
    @ViewChild('action') action: TemplateRef<any>;
    @ViewChild('link') link: TemplateRef<any>;
    listType: any = [
        { verified: "Pending" },
        { verified: "Approved" },
        { verified: "Rejected" }
    ];
    rows = [];
    columns = [];
    selectedList: any;
    managerData: any;
    imagesUrl = [];
    rowId: any;
    verified: any;
    loadingIndicator: boolean = true;
    AutoRefersh: any;

    constructor(
        private adminService: AdminService,
        private toasterService: ToasterService,
        private modalService: NgbModal,
        private router: Router,
        private commonService: CommonService) { }

    async ngOnInit() {
        if (await this.checkViewPermission()) {
            this.getAutoRefershUpdate();
            this.hubConnection();
            this.selectedList = this.listType[0];
            this.setColumn(this.selectedList);
            this.setPageData(this.selectedList);
        }
    }

    AutoRefershUpdate() {
        this.AutoRefersh = (document.getElementById("chk_autorefersh") as HTMLInputElement).checked;
        let data = {
            name: "ManagerAutoRefersh",
            value: this.AutoRefersh + ""
        }
        this.adminService.add<any>(account.AdminNotificationParameterUpdate, data).subscribe(res => { });
    }

    getAutoRefershUpdate() {
        let data = {
            name: "ManagerAutoRefersh",
        }
        this.adminService.add<any>(account.AdminNotificationParameterSelect, data).subscribe(res => {
            this.AutoRefersh = res.data.value == "true" ? true : false;
        });
    }

    hubConnection() {
        let Connection = new HubConnectionBuilder().withUrl("http://api.webet333.com/signalrhub").build();

        Connection.on("ManagerApprovalList", () => {
            this.AutoRefersh = (document.getElementById("chk_autorefersh") as HTMLInputElement).checked;
            if (this.AutoRefersh == true || this.AutoRefersh == "true")
                this.playAudio();
        });
        Connection.start().then(res =>
            console.log("Connection started")
        );
    }

    playAudio() {
        this.ngOnInit();
        let audio = new Audio();
        audio.src = "../../../assets/audio/notification.mp3";
        audio.load();
        audio.play();
        this.toasterService.pop('info', 'Manager Approval Pending', "New Approval Request Arrive");
        this.selectedList = this.listType[0];
        this.setColumn(this.selectedList);
        this.setPageData(this.selectedList);
    }

    onChange($event) {
        this.setColumn(this.selectedList.verified);
        this.setPageData(this.selectedList);
    }

    //#region setCoumn
    setColumn(selectedList) {
        if (selectedList == "Approved") {
            this.columns = [
                { prop: 'No' },
                { prop: 'Created' },
                { prop: 'Username', cellTemplate: this.link, sortable: false },
                { prop: 'New' },
                { prop: 'OperationType' },
                { prop: 'Verified' },
                { prop: 'ManagerUserName' },
                { prop: 'ManagerId' },
                { prop: 'Receipt', cellTemplate: this.receipt, sortable: false }
            ];
        } else if (selectedList == "Rejected") {
            this.columns = [
                { prop: 'No' },
                { prop: 'Created' },
                { prop: 'Username', cellTemplate: this.link, sortable: false },
                { prop: 'New' },
                { prop: 'OperationType' },
                { prop: 'Verified' },
                { prop: 'ManagerUserName' },
                { prop: 'ManagerId' },
                { prop: 'Receipt', cellTemplate: this.receipt, sortable: false }
            ];
        }
        else {
            this.columns = [
                { prop: 'No' },
                { prop: 'Created' },
                { prop: 'Username', cellTemplate: this.link, sortable: false },
                { prop: 'New' },
                { prop: 'OperationType' },
                { prop: 'Verified' },
                { prop: 'Action', cellTemplate: this.status, sortable: false },
                { prop: 'Receipt', cellTemplate: this.receipt, sortable: false }
            ];
        }
    }
    //#endregion

    //#region setPageData
    setPageData(selectedList) {
        this.loadingIndicator = true;
        this.rows = [];
        let data = {
            status: selectedList.verified,
        }
        this.adminService.add<any>(account.managerSelect, data).subscribe(res => {
            this.rows = [];
            let i = 0;
            if (res.data.length > 0) {
                this.managerData = res.data;

                res.data.forEach(el => {
                    this.rows.push({
                        No: ++i,
                        Created: el.created,
                        userId: el.userId,
                        Username: el.username,
                        New: el.new,
                        OperationType: el.operationType,
                        Verified: el.verified,
                        ManagerUserName: el.managerUserName,
                        ManagerId: el.managerId,
                    });
                });
            }
            this.rows = [...this.rows];
            this.loadingIndicator = false;
        }, error => {
            this.loadingIndicator = false;
            this.toasterService.pop('error', 'Error', error.error.message);
        });
    }
    //#endregion

    receiptview(data, content) {
        this.imagesUrl = [];
        this.imagesUrl.push(data);
        this.openWindowCustomClass(content);
    }

    OpenWindows(Content, id, verified) {
        this.openWindowCustomClass(Content);
        this.rowId = id;
        this.verified = verified == "accept" ? "Approved" : "Rejected";
    }

    openWindowCustomClass(content) {
        this.modalService.open(content, { windowClass: 'dark-modal', });
    }

    async Accept() {
        if (await this.checkUpdatePermission()) {
            var Username = ((document.getElementById("txt_managerUsername") as HTMLInputElement).value)
            var Password = ((document.getElementById("txt_managerPassword") as HTMLInputElement).value)

            if (Username == "") return this.toasterService.pop('error', 'Error', "Username Required");
            if (Password == "") return this.toasterService.pop('error', 'Error', "Password Required");

            let data = {
                id: this.rowId,
                managerUsername: Username,
                managerPassword: Password,
                verifid: this.verified
            }
            this.adminService.add<any>(account.managerUpdate, data).subscribe(res => {
                this.toasterService.pop('success', 'Success', res.message);
                this.rowId = "";
                this.verified = "";
                (document.getElementById("txt_managerUsername") as HTMLInputElement).value = "";
                (document.getElementById("txt_managerPassword") as HTMLInputElement).value = "";
                this.modalService.dismissAll();
                this.ngOnInit();
            }, error => {
                this.toasterService.pop('error', 'Error', error.error.message);
            });
        }
    }

    //#region Check Permission

    async checkViewPermission() {
        var usersPermissions = JSON.parse(localStorage.getItem("currentUser"));
        if (usersPermissions.permissionsList[3].Permissions[0].IsChecked === true) {
            if (usersPermissions.permissionsList[3].submenu[10].Permissions[0].IsChecked === true) {
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
        if (usersPermissions.permissionsList[3].Permissions[1].IsChecked === true) {
            if (usersPermissions.permissionsList[3].submenu[10].Permissions[1].IsChecked === true) {
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
        if (usersPermissions.permissionsList[3].Permissions[2].IsChecked === true) {
            if (usersPermissions.permissionsList[3].submenu[10].Permissions[2].IsChecked === true) {
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

    //#region Redirect to user details page

    show(row = null) {
        localStorage.setItem('id', JSON.stringify(row));
        window.open('admin/customers/users-details', '_blank');
    }

    //#endregion Redirect to user details page
}
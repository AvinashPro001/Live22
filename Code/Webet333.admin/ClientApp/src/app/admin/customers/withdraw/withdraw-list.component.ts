import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { Stopwatch } from "ts-stopwatch";
import { AdminService } from '../../admin.service';
import { DatePipe } from '@angular/common';
import { customer, ErrorMessages } from '../../../../environments/environment';
import { account, playtech } from '../../../../environments/environment';
import { ConfirmationDialogService } from '../../../../app/confirmation-dialog/confirmation-dialog.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HubConnectionBuilder } from '@aspnet/signalr';

@Component({
    selector: 'app-admin/customer/retrive-list',
    templateUrl: './withdraw-list.component.html',
    styleUrls: ['./withdraw-list.component.scss']
})
export class WithdrawListComponent implements OnInit {

    //#region Variables
    @ViewChild(DatatableComponent) table: DatatableComponent;
    @ViewChild('status') status: TemplateRef<any>;
    @ViewChild('action') action: TemplateRef<any>;
    @ViewChild('tracking') tracking: TemplateRef<any>;
    toaster: any;
    toasterConfig: any;
    toasterconfig: ToasterConfig = new ToasterConfig({
        positionClass: 'toast-bottom-right',
        showCloseButton: true
    });
    withdrawStatus: any;
    rowsTacking = [];
    columnsTacking = [];
    warningImagePath = "../../../../assets/img/warning.png";
    successImagePath = "../../../../assets/img/success.png";
    rows = [];
    columns = [];
    rowsSimilar = [];
    columnsSimilar = [];
    totalRecords = 0;
    filteredData = [];
    withdrawData: any;
    customerData: any;
    loadingIndicator: boolean = true;
    model1: any;
    model2: any;
    soritngColumn = "";
    searchString = "";
    selectedList: any;
    final: any;
    res: any;
    listType: any = [
        { verified: "Pending" },
        { verified: "Approved" },
        { verified: "Rejected" }
    ];
    forEach: any;
    changeText: boolean;
    remarkdata: any;
    remarkid: any;
    remarktype: any;
    remarkval: any
    OrderID: any;
    userName: any;
    WalletName: any;
    amountWithdraw: any;
    apiRes2: any;
    apiRes1: any;
    apiPlaytech: any;
    apiAG: any;
    maxbetResult: any;
    api918Kiss: any;
    apiM8: any;
    apiJoker: any;
    disabled: boolean = false;
    AutoRefersh: any;

    //#endregion Variables

    //#region constructor
    constructor(
        private adminService: AdminService,
        private toasterService: ToasterService,
        private route: ActivatedRoute,
        private router: Router,
        private modalService: NgbModal,
        private confirmationDialogService: ConfirmationDialogService,
        private datePipe: DatePipe,
        private titleService: Title
    ) { }
    //#endregion constructor

    //#region onInit

    async ngOnInit() {
        if (await this.checkViewPermission()) {
            this.getAutoRefershUpdate();
            setInterval(() => {
                this.CheckWithdraw();
            }, 5000)
            this.withdrawStatus = this.route.snapshot.queryParamMap.get('withdrawStatus')
            if (this.withdrawStatus != null) {
                if (this.withdrawStatus == 'Approved') {
                    this.withdrawStatus = this.listType[1].verified;
                }
                else if (this.withdrawStatus == 'Rejected') {
                    this.withdrawStatus = this.listType[2].verified;
                }
            }
            else {
                this.withdrawStatus = this.listType[0].verified;
            }
            this.withdrawStatus == 'Pending' ? this.selectedList = this.listType[0] : this.withdrawStatus == 'Approved' ? this.selectedList = this.listType[1] : this.withdrawStatus == 'Rejected' ? this.selectedList = this.listType[2] : this.selectedList = this.listType[0];
            this.setColumn(this.selectedList.verified);
            this.setSimilarNameColoum()
            this.setPageData(this.selectedList.verified, "", null, null);
        }
    }
    //#endregion

    AutoRefershUpdate() {
        this.AutoRefersh = (document.getElementById("chk_autorefersh") as HTMLInputElement).checked;
        let data = {
            name: "WithdrawAutoRefersh",
            value: this.AutoRefersh + ""
        }
        this.adminService.add<any>(account.AdminNotificationParameterUpdate, data).subscribe(res => { });
    }

    getAutoRefershUpdate() {
        let data = {
            name: "WithdrawAutoRefersh",
        }
        this.adminService.add<any>(account.AdminNotificationParameterSelect, data).subscribe(res => {
            this.AutoRefersh = res.data.value == "true" ? true : false;
        });
    }

    //hubConnection() {
    //    let Connection = new HubConnectionBuilder().withUrl("http://api.webet333.com/signalrhub").build();

    //    Connection.on("WithdrawApprovalList", () => {
    //        this.AutoRefersh = (document.getElementById("chk_autorefersh") as HTMLInputElement).checked;
    //        if (this.AutoRefersh == true || this.AutoRefersh == "true")
    //            this.playAudio();
    //    });
    //    Connection.start().then(res =>
    //        console.log("Connection started")
    //    );

    //}

    withdrawCount: Number = 0;
    async delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    CheckWithdraw() {
        if (window.location.href.toLowerCase().includes("admin/customers/withdraw-list")) {
            let data = {
                status: 'Pending',
                keyword: null,
                fromDate: null,
                toDate: null
            }
            this.adminService.add<any>(customer.withdrawList, data).subscribe(async res => {
                if (res.data.length > 0) {
                    this.AutoRefersh = (document.getElementById("chk_autorefersh") as HTMLInputElement).checked;
                    if (this.AutoRefersh == true || this.AutoRefersh == "true") {
                        this.playAudio();
                        this.titleService.setTitle("Withdraw Request (" + res.data.length + ")");

                        await this.delay(1000);
                        this.titleService.setTitle("\u200E")
                        await this.delay(1000);
                        this.titleService.setTitle("Withdraw Request (" + res.data.length + ")");
                        await this.delay(1000);
                        this.titleService.setTitle("\u200E")
                        await this.delay(1000);
                        this.titleService.setTitle("Withdraw Request (" + res.data.length + ")");
                        await this.delay(1000);
                        this.titleService.setTitle("\u200E")
                        await this.delay(1000);
                        this.titleService.setTitle("Withdraw Request (" + res.data.length + ")");
                        await this.delay(1000);
                        this.titleService.setTitle("\u200E")
                        await this.delay(1000);
                        this.titleService.setTitle("Withdraw Request (" + res.data.length + ")");
                        await this.delay(1000);
                        this.titleService.setTitle("\u200E")
                        await this.delay(1000);
                        this.titleService.setTitle("Withdraw Request (" + res.data.length + ")");
                        await this.delay(1000);
                        this.titleService.setTitle("\u200E")
                        await this.delay(1000);
                        this.titleService.setTitle("Withdraw Request (" + res.data.length + ")");
                        await this.delay(1000);
                        this.titleService.setTitle("\u200E")
                        await this.delay(1000);
                    }
                }
            })
        }
    }

    playAudio() {
        let audio = new Audio();
        audio.src = "../../../assets/audio/notification.mp3";
        audio.load();
        audio.play();
        //this.toasterService.pop('info', 'Withdraw Approval Pending', "New Approval Request Arrive");
        this.withdrawStatus == 'Pending'
        this.selectedList = this.listType[0];
        this.setColumn(this.selectedList.verified);
        this.setSimilarNameColoum()
        this.setPageData(this.selectedList.verified, "", null, null);
    }


    setSimilarNameColoum() {
        this.columnsSimilar = [
            { prop: 'No', width: 55 },
            { prop: 'Username' },
            { prop: 'AccountName' },
            { prop: 'Name' },
            { prop: 'Amount' },
            { prop: 'SimilarPercentage' },
        ];

        this.columnsTacking = [
            { prop: 'No' },
            { prop: 'UserName' },
            { prop: 'Process' },
            { prop: 'Created' },
        ];
    }

    //#region Set Column Datatable
    setColumn(selectedList) {
        if (selectedList == "Approved") {
            this.columns = [
                { prop: 'No'},
                { prop: 'Created' },
                { prop: 'Username' },
                { prop: 'AccountName' },
                { prop: 'WithdrawalNo' },
                { prop: 'Bank' },
                { prop: 'AccountNo' },
                { prop: 'WalletName' },
                { prop: 'Amount' },
                { prop: 'PromotionTitle' },
                { prop: 'similar%', cellTemplate: this.action, sortable: false },
                { prop: 'Tracking', cellTemplate: this.tracking, sortable: false },
                { prop: 'Status' },
                { prop: 'Operator' },
                { prop: 'Modified' },
                { prop: 'Remarks' }
            ];
        } else if (selectedList == "Rejected") {
            this.columns = [
                { prop: 'No'},
                { prop: 'Created' },
                { prop: 'Username' },
                { prop: 'AccountName' },
                { prop: 'WithdrawalNo' },
                { prop: 'Bank' },
                { prop: 'AccountNo' },
                { prop: 'WalletName' },
                { prop: 'Amount' },
                { prop: 'PromotionTitle' },
                { prop: 'similar%', cellTemplate: this.action, sortable: false },
                { prop: 'Tracking', cellTemplate: this.tracking, sortable: false },
                { prop: 'Status' },
                { prop: 'Operator' },
                { prop: 'Modified' },
                { prop: 'Remarks' }
            ];
        }
        else {
            this.columns = [
                { prop: 'No'},
                { prop: 'Created' },
                { prop: 'Username' },
                { prop: 'AccountName' },
                { prop: 'WithdrawalNo' },
                { prop: 'Bank' },
                { prop: 'AccountNo' },
                { prop: 'WalletName' },
                { prop: 'Amount' },
                { prop: 'PromotionTitle' },
                { prop: 'similar%', cellTemplate: this.action, sortable: false },
                { prop: 'Tracking', cellTemplate: this.tracking, sortable: false },
                { prop: 'Status' },
                { prop: 'Remarks' },
                { prop: 'Verified', cellTemplate: this.status, sortable: false },
            ];
        }
    }

    setPageData(selectedList, search, fromdate, todate) {
        //this.loadingIndicator = true;
        //this.rows = [];
        let data = {
            status: selectedList,
            keyword: search,
            fromDate: fromdate,
            toDate: todate
        }
        this.adminService.add<any>(customer.withdrawList, data).subscribe(res => {
            let i = 0
            this.rows = [];
            this.withdrawData = res.data;
            res.data.forEach(el => {
                this.rows.push({
                    No: ++i,
                    Id: el.id,
                    Username: el.userName,
                    AccountName: el.AccountName,
                    WithdrawalNo: el.orderId,
                    Bank: el.bankName,
                    AccountNo: el.accountNo,
                    WalletName: el.walletName,
                    Amount: el.withdrawalAmount,
                    PromotionTitle: el.PromotionTitle == null ? 'No Promotion' : el.PromotionTitle,
                    Tracking: el.TrackingLoginRegister == true ? '<img (click)=DuplicateDetails("' + el.username + '") class="tracking-img" src="../../../../assets/img/warning.png"/>' : '<img (click)=DuplicateDetails("' + el.username + '") class="tracking-img"  src="../../../../assets/img/success.png"/>',
                    Verified: el.verified,
                    Status: el.verified,
                    Operator: el.operatorName,
                    Remarks: el.adminRemarks === "" || el.adminRemarks === null ? "No Remarks" : el.adminRemarks,
                    Created: this.ReplaceTime(el.created),
                    Modified: this.ReplaceTime(el.modified)
                });
            });
            this.rows = [...this.rows];
            //this.loadingIndicator = false;
        }, error => {
            //this.loadingIndicator = false;
            this.toasterService.pop('error', 'Error', error.error.message);
        });
    }
    //#endregion Set Column Datatable

    GetSimilarName(similarnamelist, id) {
        this.loadingIndicator = true;
        let model = {
            id: id
        }
        this.adminService.add<any>(customer.similarNameList, model).subscribe(res => {
            let i = 0
            this.rowsSimilar = [];
            if (res.data != undefined) {
                res.data.forEach(el => {
                    this.rowsSimilar.push({
                        No: ++i,
                        Username: el.username,
                        Name: el.name,
                        Amount: el.amount,
                        AccountName: el.accountName,
                        SimilarPercentage: el.similarPercentage
                    })
                });
                this.rowsSimilar = [...this.rowsSimilar];
            }
            else {
                this.toasterService.pop('success', 'Success', res.message);
            }

            this.loadingIndicator = false;
        }, error => {
            this.loadingIndicator = false;
            this.toasterService.pop('error', 'Error', error.error.message);
        });
        this.modalService.open(similarnamelist, { windowClass: 'dark-modal' });

    }

    //#region timeFormat
    ReplaceTime(Date) {
        return Date.replace("T", " ")
    }

    toDate(date) {
        if (date === void 0) {
            return new Date(0);
        }
        if (this.isDate(date)) {
            return date;
        } else {
            return new Date(parseFloat(date.toString()));
        }
    }
    isDate(date) {
        return (date instanceof Date);
    }
    time(date, format) {
        var d = this.toDate(date);
        return format
            .replace(/Y/gm, d.getFullYear().toString())
            .replace(/m/gm, ('0' + (d.getMonth() + 1)).substr(-2))
            .replace(/d/gm, ('0' + (d.getDate())).substr(-2))
            .replace(/H/gm, ('0' + (d.getHours() + 0)).substr(-2))
            .replace(/i/gm, ('0' + (d.getMinutes() + 0)).substr(-2))
            .replace(/s/gm, ('0' + (d.getSeconds() + 0)).substr(-2))
            .replace(/v/gm, ('0000' + (d.getMilliseconds() % 1000)).substr(-3));
    }
    //#endregion

    //#region accept
    acceptRequest(id) {
        if (this.final == true) {
            let data = {
                id: id,
                approved: "Approved"
            }
            this.adminService.add<any>(customer.withdrawVerify, data).subscribe(res => {
                this.toasterService.pop('success', 'Success', res.message);
                this.ngOnInit();
                this.setPageData(this.selectedList.verified, "", null, null);
            }, error => {
                this.toasterService.pop('error', 'Error', error.error.message);
            });
        }
    }
    //#endregion accept

    //#region reject
    rejectRequest(id) {
        if (this.final == true) {
            let data = {
                id: id,
                approved: "Rejected"
            }
            this.adminService.add<any>(customer.withdrawVerify, data).subscribe(res => {
                this.toasterService.pop('success', 'Success', res.message);
                this.ngOnInit();
                this.setPageData(this.selectedList.verified, "", null, null);
            }, error => {
                this.toasterService.pop('error', 'Error', error.error.message);
            });
        }
    }
    //#endregion reject

    //#region onchange
    onChange($event) {
        this.withdrawStatus = this.withdrawStatus != null ? this.selectedList.verified : "Pending";
        this.setPageData(this.selectedList.verified, "", null, null);
        this.setColumn(this.selectedList.verified);
    }

    openVerifyConfirmationDialog(id) {
        this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to verify withdrawal ?')
            .then((confirmed) => {
                this.final = confirmed
                this.acceptRequest(id)
            });
    }

    openRejectConfirmationDialog(id) {
        this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to reject withdrawal ?')
            .then((confirmed) => {
                this.final = confirmed
                this.rejectRequest(id)
            });
    }
    //#endregion onchange

    //#region navigateAdd
    async navigateAdd() {
        if (await this.checkAddPermission()) this.router.navigate(['/admin/customers/withdraw-add']);
    }
    //#endregion

    //#region search
    searchHandler(event) {
        let data;
        if (event.target.value) {
            data = {
                SearchParam: event.target.value,
            }
            this.searchString = event.target.value,
                this.setPageData(this.selectedList.verified, data.SearchParam, null, null)
        } else {
            data = {
                SearchParam: ""
            }
            this.setPageData(this.selectedList.verified, data.SearchParam, null, null)
        }
    }

    searchHandlerByDate() {
        let fromdate, todate
        fromdate = (document.getElementById("txt_fromdatetime") as HTMLInputElement).value
        todate = (document.getElementById("txt_todatetime") as HTMLInputElement).value
        if (todate === "")
            todate = fromdate;
        if (fromdate === "")
            fromdate = todate;
        if (fromdate === "" && todate === "")
            this.toasterService.pop('error', 'Error', "Please select Date.");
        else if ((fromdate !== undefined && todate !== null) || (todate !== null && fromdate !== null)) {
            this.setPageData(this.selectedList.verified, "", fromdate, todate);
        }
        else {
            this.setPageData(this.selectedList.verified, "", null, null)
        }
    }
    //#endregion search

    //#region Open Remark Model
    async openremark(remark, id, orderId, name, walletName, _amount, type) {
        if (await this.checkUpdatePermission()) {
            this.remarktype = type
            this.remarkid = id
            this.OrderID = orderId
            this.userName = name
            this.WalletName = walletName
            this.amountWithdraw = _amount
            this.modalService.open(remark, { windowClass: 'dark-modal' });
        }
    }
    //#endregion Open Remark Model

    //#region Close Remark Model
    decline() {
        this.modalService.dismissAll();
    }
    //#endregion Close Remark Model

    //#region AcceptReject
    async accept() {
        this.disabled = true;
        //if remark type is accept
        if (this.remarktype == 'reject') {
            this.remarkdata = {
                id: this.remarkid,
                approved: "rejected",
                adminRemarks: this.remarkval
            }
            let userModel = {
                username: this.userName
            }
            this.adminService.add<any>(account.profile, userModel).subscribe(async resUser => {
                switch (this.WalletName) {
                    case 'Main Wallet': {
                        this.adminService.add<any>(customer.withdrawVerify, this.remarkdata).subscribe(res => {
                            this.toasterService.pop('success', 'Successfully', res.message);
                            this.disabled = false;
                            this.ngOnInit();
                        });
                    }; break;
                }
            });
        }
        //if remark type is rejection
        else {
            this.remarkdata = {
                id: this.remarkid,
                approved: "approved",
                adminRemarks: this.remarkval
            }
            let userModel = {
                username: this.userName
            }
            this.adminService.add<any>(account.profile, userModel).subscribe(async resUser => {
                await this.adminService.add<any>(customer.withdrawVerify, this.remarkdata).subscribe(res => {
                    this.toasterService.pop('success', 'Successfully', res.message);
                    this.disabled = false;
                    this.ngOnInit();
                    this.ApprovalTime(resUser.data.id, resUser.data.username, "Withdraw", this.remarkid);
                }, error => {
                    this.toasterService.pop('error', 'Error', error.error.message);
                    this.disabled = false;
                });
            });
        }
        this.decline();
    }
    //#endregion AcceptReject

    ApprovalTime(UserId, UserName, Type, Id) {
        let model = {
            userid: UserId,
            username: UserName,
            type: Type,
            Id: Id
        }
        this.adminService.add<any>(customer.approvalTimeInsert, model).subscribe(res => {
        });
    }


    //#region Close All
    dismiss() {
        this.modalService.dismissAll();
    }
    //#endregion Close All

    DuplicateDetails(trancking, username, trackingLoginRegister) {
        if (trackingLoginRegister) {
            this.loadingIndicator = true;

            let data = {
                username: username
            }
            this.rowsTacking = [];
            this.adminService.add<any>(customer.trackingSelect, data).subscribe(res => {
                let i = 0;
                res.data.forEach(el => {
                    this.rowsTacking.push({
                        No: ++i,
                        UserName: el.Usernames,
                        Process: el.Process,
                        Created: this.ReplaceTime(el.Created),
                    });
                });
                this.rowsTacking = [...this.rowsTacking];
                this.loadingIndicator = false;
            }, error => {
                this.rowsTacking = [];
                this.toasterService.pop('error', 'Error', error.error.message)
                this.loadingIndicator = false;

            });
            this.modalService.open(trancking, { windowClass: 'dark-modal' });
        }
        else {
            this.toasterService.pop('error', 'Error', 'No Duplicate Record !!!');
        }
    }

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
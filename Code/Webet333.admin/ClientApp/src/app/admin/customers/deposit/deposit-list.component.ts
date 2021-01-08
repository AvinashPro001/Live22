import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Router, ActivatedRoute } from '@angular/router';
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { Stopwatch } from "ts-stopwatch";
import { AdminService } from '../../admin.service';
import { DatePipe } from '@angular/common';
import { account, customer } from '../../../../environments/environment';
import { ConfirmationDialogService } from '../../../../app/confirmation-dialog/confirmation-dialog.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HubConnectionBuilder } from '@aspnet/signalr';
import { Md5 } from 'ts-md5/dist/md5';

@Component({
    selector: 'app-admin/deposit/retrieve-list',
    templateUrl: './deposit-list.component.html',
    styleUrls: ['./deposit-list.component.scss']
})
export class DepositListComponent implements OnInit {

    //#region declaration
    slideConfig = { "slidesToShow": 1, "slidesToScroll": 1 };
    @ViewChild(DatatableComponent) table: DatatableComponent;
    @ViewChild('status') status: TemplateRef<any>;
    @ViewChild('receipt') receipt: TemplateRef<any>;
    @ViewChild('action') action: TemplateRef<any>;
    @ViewChild('addreceipt') addreceipt: TemplateRef<any>;

    @ViewChild('tracking') tracking: TemplateRef<any>;
    toaster: any;
    toasterConfig: any;
    toasterconfig: ToasterConfig = new ToasterConfig({
        positionClass: 'toast-bottom-right',
        showCloseButton: true
    });

    rowsTacking = [];
    columnsTacking = [];

    warningImagePath = "../../../../assets/img/warning.png";
    successImagePath = "../../../../assets/img/success.png";

    depositStatus: any;
    rows = [];
    columns = [];
    imagesUrl = [];
    filenames: any = [];
    urls: any = [];
    disable: boolean = false;
    totalRecords = 0;
    RowId: any;
    model1: any;
    model2: any;
    filteredData = [];
    loadingIndicator: boolean = true;
    selectedList: any;
    depositData: any;
    soritngColumn = "";
    searchString = "";
    pager: any = {};
    pagedItems: any[];
    res: any;
    data: any;
    final: any;
    forEach: any;
    confirmed: boolean;
    bodyText: string;
    num: number = 0;
    count: number = 0;
    dummyData: any;
    curDate: any;
    listType: any = [
        { verified: "Pending" },
        { verified: "Approved" },
        { verified: "Rejected" }
    ];
    remarkdata: any
    remarkval: any;
    remarkid: any;
    remarktype: any;
    Username: any;
    WalletName: any;
    Amount: any;
    apiRes1: any;
    apiRes2: any;
    apiPlaytech: any;
    apiAG: any;
    maxbetResult: any;
    api918Kiss: any;
    apiJoker: any;
    userModel: any;
    disabled: boolean = false;
    //stopwatch: any;
    //currentDateTime: any;
    AutoRefersh: any;
    setAutorefersh: any;
    imageIcon: any = "../../../assets/img/pdficon.svg";
    //#endregion

    //#region constructor
    constructor(
        private adminService: AdminService,
        private toasterService: ToasterService,
        private router: Router,
        private route: ActivatedRoute,
        private confirmationDialogService: ConfirmationDialogService,
        private modalService: NgbModal,
        private datePipe: DatePipe,
    ) { }
    //#endregion




    //#region Init
    ngOnInit() {
        this.hubConnection();
        this.getAutoRefershUpdate();

        //this.generate(12);
        this.depositStatus = this.route.snapshot.queryParamMap.get('depositStatus')
        if (this.depositStatus != null) {
            if (this.depositStatus == 'Approved') {
                this.depositStatus = this.listType[1].verified;
            }
            else if (this.depositStatus == 'Rejected') {
                this.depositStatus = this.listType[2].verified;
            }
        }
        else {
            this.depositStatus = this.listType[0].verified;
        }
        this.depositStatus == 'Pending' ? this.selectedList = this.listType[0] : this.depositStatus == 'Approved' ? this.selectedList = this.listType[1] : this.depositStatus == 'Rejected' ? this.selectedList = this.listType[2] : this.selectedList = this.listType[0];
        this.setColumn(this.selectedList.verified);
        this.setPageData(this.selectedList.verified, "", null, null);
        this.curDate = new Date();
        setTimeout(() => { this.loadingIndicator = false; }, 1500);
    }
    //#endregion

    AutoRefershUpdate() {

        this.AutoRefersh = (document.getElementById("chk_autorefersh") as HTMLInputElement).checked;
        let data = {
            name: "DepositAutoRefersh",
            value: this.AutoRefersh + ""
        }
        this.adminService.add<any>(account.AdminNotificationParameterUpdate, data).subscribe(res => { });
    }

    getAutoRefershUpdate() {
        let data = {
            name: "DepositAutoRefersh",
        }
        this.adminService.add<any>(account.AdminNotificationParameterSelect, data).subscribe(res => {
            this.AutoRefersh = res.data.value == "true" ? true : false;
        });
    }

    hubConnection() {
        let Connection = new HubConnectionBuilder().withUrl("http://api.webet333.com/signalrhub").build();

        Connection.on("DepositApprovalList", () => {
            this.AutoRefersh = (document.getElementById("chk_autorefersh") as HTMLInputElement).checked;
            if (this.AutoRefersh == true || this.AutoRefersh == "true")
                this.playAudio();
        });

        Connection.start().then(res =>
            console.log("Connection started")
        ).catch(err => this.hubConnection());
    }

    playAudio() {
        let audio = new Audio();
        audio.src = "../../../assets/audio/notification.mp3";
        audio.load();
        audio.play();
        //this.toasterService.pop('info', 'Deposit Approval Pending', "New Approval Request Arrive");
        this.depositStatus == 'Pending'
        this.selectedList = this.listType[0];
        this.setColumn(this.selectedList.verified);
        this.setPageData(this.selectedList.verified, "", null, null);
    }


    ImageOpenNewTab(ImageUrl) {
        window.open(ImageUrl, 'Image', 'width=largeImage.stylewidth,height=largeImage.style.height,resizable=1');
    }

    //#region setCoumn
    setColumn(selectedList) {
        this.columnsTacking = [
            { prop: 'No' },
            { prop: 'UserName' },
            { prop: 'Process' },
            { prop: 'Created' },
        ];

        if (selectedList == "Approved") {
            this.columns = [
                { prop: 'No' },
                { prop: 'Created' },
                { prop: 'UserName' },
                { prop: 'DepositNo' },
                { prop: 'WalletName' },
                { prop: 'BankName' },
                { prop: 'Method' },
                { prop: 'Amount' },
                { prop: 'ReferenceNo' },
                { prop: 'Time' },
                { prop: 'Tracking', cellTemplate: this.tracking, sortable: false },
                { prop: 'Operator' },
                { prop: 'Promotion' },
                { prop: 'Remarks' },
                { prop: 'Status' },
                { prop: 'Receipt', cellTemplate: this.receipt, sortable: true }
            ];
        } else if (selectedList == "Rejected") {
            this.columns = [
                { prop: 'No' },
                { prop: 'Created' },
                { prop: 'UserName' },
                { prop: 'DepositNo' },
                { prop: 'WalletName' },
                { prop: 'BankName' },
                { prop: 'Method' },
                { prop: 'Amount' },
                { prop: 'ReferenceNo' },
                { prop: 'Time' },
                { prop: 'Tracking', cellTemplate: this.tracking, sortable: false },
                { prop: 'Operator' },
                { prop: 'Promotion' },
                { prop: 'Status' },
                { prop: 'Remarks' },
                { prop: 'Receipt', cellTemplate: this.receipt, sortable: true }
            ];
        }
        else {
            this.columns = [
                { prop: 'No' },
                { prop: 'Created' },
                { prop: 'UserName' },
                { prop: 'DepositNo' },
                { prop: 'WalletName' },
                { prop: 'BankName' },
                { prop: 'Method' },
                { prop: 'Amount' },
                { prop: 'ReferenceNo' },
                { prop: 'Time' },
                { prop: 'Tracking', cellTemplate: this.tracking, sortable: false },
                { prop: 'Status' },
                { prop: 'Promotion' },
                { prop: 'Verified', cellTemplate: this.status, sortable: true },
                { prop: 'Receipt', cellTemplate: this.receipt, sortable: true },
                { prop: 'AddReceipt', cellTemplate: this.addreceipt, sortable: true }
            ];
        }
    }
    //#endregion

    //#region setPageData

    setPageData(selectedList, search, fromdate, todate) {
        this.loadingIndicator = true;
        this.rows = [];
        let data = {
            status: selectedList,
            keyword: search,
            fromDate: fromdate,
            toDate: todate
        }
        this.adminService.add<any>(customer.depositList, data).subscribe(res => {
            this.rows = [];
            let i = 0;
            this.depositData = res.data;
            res.data.forEach(el => {
                this.rows.push({
                    No: ++i,
                    UserName: el.username,
                    DepositNo: el.orderId,
                    WalletName: el.walletName,
                    BankName: el.bankName,
                    Method: el.depositMethod == "Promotion" ? "<span class='method-promotion'>" + el.depositMethod + "</span>" : "<span class='method-bank-transfer'>" + el.depositMethod + "</span>",
                    Amount: el.amount,
                    ReferenceNo: el.referenceNo,
                    Time: this.time(el.depositTime, "Y-m-d H:i"),
                    Verified: el.verified,
                    id: el.id,
                    Status: (el.verified == "approved" ? "<span class='approved'>" + el.verified + "</span>" : (el.verified == "pending" ? "<span class='pending'>" + el.verified + "</span>" : "<span class='rejected'>" + el.verified + "</span>")),
                    //Status: el.verified,
                    Operator: el.operatorName,
                    Tracking: el.trackingLoginRegister == true ? '<img (click)=DuplicateDetails("' + el.username + '") class="tracking-img" src="../../../../assets/img/warning.png"/>' : '<img (click)=DuplicateDetails("' + el.username + '") class="tracking-img"  src="../../../../assets/img/success.png"/>',
                    Remarks: el.adminRemarks === null || el.adminRemarks === "" ? 'No Remarks' : el.adminRemarks,
                    Promotion: el.promotionTitle === null ? 'No Promotion' : el.promotionTitle,
                    Created: this.ReplaceTime(el.created),
                    Modified: this.ReplaceTime(el.modified),
                });
            });
            this.rows = [...this.rows];
            this.loadingIndicator = false;



        }, error => {
            this.loadingIndicator = false;
            this.toasterService.pop('error', 'Error', error.error.message);
        });

    }

    //#endregion

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

    //#region acceptRequest
    acceptRequest(id) {
        if (this.final == true) {
            let data = {
                id: id,
                approved: "Approved"
            }
            this.adminService.add<any>(customer.depositVerify, data).subscribe(res => {
                this.toasterService.pop('success', 'Success', res.message);
                this.ngOnInit();
            }, error => {
                this.toasterService.pop('error', 'Error', error.error.message);
            });
        }
    }
    //#endregion

    //#region rejectRequest
    rejectRequest(id) {
        if (this.final == true) {
            let data = {
                id: id,
                approved: "Rejected"
            }
            this.adminService.add<any>(customer.depositVerify, data).subscribe(res => {
                this.toasterService.pop('success', 'Success', res.message);
                this.ngOnInit();
            }, error => {
                this.toasterService.pop('error', 'Error', error.error.message);
            });
        }
    }
    //#endregion

    //#region onChange
    onChange($event) {
        this.depositStatus = this.depositStatus != null ? this.selectedList.verified : "Pending";
        this.setPageData(this.selectedList.verified, "", null, null);
        this.setColumn(this.selectedList.verified);
    }
    //#endregion

    //#region navigateAdd
    navigateAdd() {
        this.router.navigate(['/admin/customers/deposit-add']);
    }
    //#endregion

    //#region openVerifyConfirmationDialog
    openVerifyConfirmationDialog(id) {
        this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to verify deposit ?')
            .then((confirmed) => {
                this.final = confirmed
                this.acceptRequest(id)
            });
    }
    //#endregion

    //#region openRejectConfirmationDialog
    openRejectConfirmationDialog(id) {
        this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to reject deposit ?')
            .then((confirmed) => {
                this.final = confirmed
                this.rejectRequest(id)
            });
    }
    //#endregion

    //#region Search
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
    //#endregion

    //#region OpenWindow
    receiptview(idMain, content) {
        for (this.num = 0; this.num <= this.depositData.length - 1; this.num++) {
            if (idMain === this.depositData[this.num].id) {
                if (this.depositData[this.num].receipts.length === 0) {
                    this.toasterService.pop('error', 'Error', "Receipt is not available.");
                }
                else {
                    this.openWindowCustomClass(idMain, content);
                }
            }
        }
    }
    openWindowCustomClass(idMain, content) {
        this.imagesUrl = [];
        this.modalService.open(content, { windowClass: 'dark-modal' });
        if (idMain === this.depositData[this.num].id) {
            for (this.count = 0; this.count <= this.depositData[this.num].receipts.length - 1; this.count++) {
                this.imagesUrl.push(this.depositData[this.num].receipts[this.count].receipt);
            }
        }
    }
    //#endregion

    //#region open remark modal event
    openremark(remark, id, type, username, walletName, amount) {
        this.remarktype = type,
            this.remarkid = id,
            this.modalService.open(remark, { windowClass: 'dark-modal' }),
            this.Username = username,
            this.WalletName = walletName,
            this.Amount = amount
    }

    decline() {
        this.modalService.dismissAll();
    }

    async RegisteAfterAccept() {
        //this.stopwatch = new Stopwatch();
        //this.stopwatch.start();
        //let date: Date = new Date();
        //this.currentDateTime = this.datePipe.transform(date, "yyyy-MM-dd HH:mm:ss");

        this.disabled = true;
        this.userModel = {
            username: this.Username
        }
        let model = {}
        //this.adminService.add<any>(customer.customerList, model).subscribe(res => {
        //    this.adminService.add<any>(account.profile, this.userModel).subscribe(async resUser => {
        await this.accept();
        //    });
        //});
    }



    async accept() {

        //if remark type is accept
        if (this.remarktype == 'accept') {
            this.remarkdata = {
                id: this.remarkid,
                approved: "approved",
                adminRemarks: this.remarkval
            }

            this.userModel = {
                username: this.Username
            }

            this.adminService.add<any>(account.profile, this.userModel).subscribe(async resUser => {
                switch (this.WalletName) {
                    case 'Main Wallet': {
                        this.adminService.add<any>(customer.depositVerify, this.remarkdata).subscribe(res => {
                            this.toasterService.pop('success', 'Successfully', res.message);
                            this.disabled = false;
                            // this.stopwatch.stop();
                            this.ngOnInit();
                            this.ApprovalTime(resUser.data.id, resUser.data.username, "Deposit", this.remarkid);
                        });
                    }; break;

                }
            });
        }
        //if remark type is rejection
        else {
            this.remarkdata = {
                id: this.remarkid,
                approved: "rejected",
                adminRemarks: this.remarkval
            }
            this.adminService.add<any>(customer.depositVerify, this.remarkdata).subscribe(res => {
                this.toasterService.pop('success', 'Successfully', res.message);
                this.ngOnInit();
                this.disabled = false;
            });
        }
        this.decline();
    }
    //#endregion

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

    //#region Add Receipt or Remover Receipt images
    openModelAddRecipt(id, AddReceipt) {
        this.RowId = id;
        this.modalService.open(AddReceipt, { windowClass: 'dark-modal' });
    }

    uploadReceipt() {
        this.disable = true;
        let data = {
            id: this.RowId,
            images: this.urls
        }
        if (data.images.length == 0) {
            return this.toasterService.pop('error', 'Error', "Please Select Image");
        }

        this.adminService.add<any>(customer.userReceipt, data).subscribe(res => {
            this.disable = false;
            this.modalService.dismissAll();
            this.ngOnInit();
            this.toasterService.pop('success', 'Success', res.message);
        }, error => {
            this.disable = false;
            this.modalService.dismissAll();
            this.toasterService.pop('error', 'Error', error.error.message);
        });
    }

    closeModel() {
        this.modalService.dismissAll();
    }

    selectfile(event) {
        if (event.target.files.length >= 0) {
            var filesAmount = event.target.files.length;
            for (let i = 0; i < filesAmount; i++) {
                let files = event.target.files[i];
                this.base64(files);
                this.filenames.push(event.target.files[i].name);
            }
        }
    }

    base64(file) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
            this.urls.push({ base64images: e.target.result });
        }
        reader.readAsDataURL(file);

    }

    removefile(files) {
        let urlindex = this.filenames.map(singleUrl => { return singleUrl }).indexOf(files)
        if (this.filenames.length == 1) {
            this.filenames.splice(urlindex, 1)
            let form: HTMLFormElement = <HTMLFormElement>document.getElementById("imageform");
            form.reset();
        }
        else {
            this.filenames.splice(urlindex, 1)
        }
        let imageindexupload = this.urls.map(singleUrl => { return singleUrl }).indexOf(files[0])
        this.urls.splice(imageindexupload, 1)
    }

    //#endregion Add Receipt or Remover Receipt images

    //#region Dismiss
    dismiss() {
        this.modalService.dismissAll();
    }
    //#endregion Dismiss

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

}
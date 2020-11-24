import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminService } from '../../admin.service';
import { customer, gameBalance, smsConst, account } from '../../../../environments/environment';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-admin/customer/edit-list',
    templateUrl: './customer-edit.component.html',
    styleUrls: ['./customer-edit.component.scss']
})

export class CustomerEditComponent implements OnInit {

    slideConfig = { "slidesToShow": 1, "slidesToScroll": 1 };
    editCustomerForm: FormGroup;
    toaster: any;
    urls: any = [];
    filenames: any = [];
    data: any;
    newVal: any;
    playtechBal: any;
    m8Bal: any;
    jokerBal: any;
    agBal: any;
    dgBal: any;
    allbetBal: any;
    saBal: any;
    pussy88Bal: any;
    sexybaccaratBal: any;
    mainBal: any;
    kissBal: any;
    mega888Bal: any;
    wmBal: any;
    pragmaticBal: any;
    maxbetBal: any;
    totalBal: any;
    mobileNumber: any;
    disabled: boolean = true;
    imagePath: any;
    ICNumber: any;


    agUsername: any;
    playtechUsername: any;
    dgUsername: any;
    saUsername: any;
    sexyUsername: any;
    jokerUsername: any;
    maxbetUsername: any;
    m8Username: any;
    kiss918Username: any;
    mega888Username: any;
    pussyUsername: any;
    allbetUsername: any;
    wmUsername: any;
    pragmaticUsername: any;
    password: any;



    toasterConfig: any;
    toasterconfig: ToasterConfig = new ToasterConfig({
        positionClass: 'toast-bottom-right',
        showCloseButton: true
    });

    //#region constructor
    constructor(
        public http: HttpClient,
        private adminService: AdminService,
        private toasterService: ToasterService,
        private router: Router,
        private modalService: NgbModal
    ) { }
    //#endregion

    //#region Init
    ngOnInit() {
        this.getProfile();
    }
    //#endregion

    //#region getProfile
    async getProfile() {
        let dataCustomer = JSON.parse(localStorage.getItem('data'));
        this.data = dataCustomer as object[];
        await this.getUsername()
        this.mobileNumber = this.data.mobileNo.substring(0, 3) + '-XXXXXXXX-' + this.data.mobileNo.substring(this.data.mobileNo.length - 4);


        let data = {
            id: this.data.id
        }
        this.adminService.add<any>(customer.ICImage, data).subscribe(res => {
            if (res.data.length > 0) {
                this.imagePath = res.data;
            }
            else {
                var image = new Array();
                image.push({
                    icImageBanner: "../../../../assets/img/imageUser.png"
                });
                this.imagePath = image;
            }
        });


        this.ICNumber = this.data.userICNumber == null ? "Not Avaiable" : this.data.userICNumber;
        this.password = this.data.password;
    }
    //#endregion

    ImageOpenNewTab(ImageUrl) {
        window.open(ImageUrl, 'Image', 'width=largeImage.stylewidth,height=largeImage.style.height,resizable=1');
    }


    async refeshBalance() {
        await this.loadBalance();
        this.totalBal = this.NumberConvert(this.playtechBal) + this.NumberConvert(this.m8Bal) + this.NumberConvert(this.jokerBal) + this.NumberConvert(this.agBal) + this.NumberConvert(this.dgBal) + this.NumberConvert(this.saBal) + this.NumberConvert(this.sexybaccaratBal) + this.NumberConvert(this.mainBal) + this.NumberConvert(this.kissBal) + this.NumberConvert(this.mega888Bal) + this.NumberConvert(this.maxbetBal) + this.NumberConvert(this.allbetBal) + this.NumberConvert(this.wmBal) + this.NumberConvert(this.pragmaticBal);

        (document.getElementById("balance") as HTMLInputElement).innerText = this.totalBal;
    }



    async loadBalance() {
        this.newVal = this.data.id;
        await this.Kiss918Balance(this.newVal);
        await this.Mega888(this.newVal);
        await this.Maxbet(this.newVal);
        await this.M8(this.newVal);
        await this.AG(this.newVal);
        await this.DG(this.newVal);
        await this.ManiWalletBalance(this.newVal);
        await this.Playtech(this.newVal);
        await this.Joker(this.newVal);
        await this.Sexybaccarat(this.newVal);
        await this.SA(this.newVal);
        await this.Allbet(this.newVal);
        await this.WM(this.newVal);
        await this.Pragmatic(this.newVal);
    }

    NumberConvert(Balance) {
        return Number(Balance);
    }

    async ChangePassord(Content) {
        await this.refeshBalance();
        if (Number(this.totalBal) > 10)
            return this.toasterService.pop('error', 'Error', "Cannot Change Password because total balance is greater than 10");

        this.openWindowCustomClass(Content);
    }

    ResetPassword() {
        var randomPassword = this.randomPassword();
        var SMSMessage = "Your Username is :" + this.data.username + ".  Your New Password is: " + randomPassword + ",  It's Your Temporary Password. It will Expire After Some Time, So Please Change Your Password After Successfully Login.";
        var URL = smsConst.SMSbaseUrl + smsConst.api_key + '&' + smsConst.action + '&' + smsConst.sender_id + '&' + smsConst.content_type + '&' + smsConst.mode + '&' + 'to=' + this.data.mobileNo + '&' + 'msg=' + SMSMessage
        let data = {
            mobileNo: this.data.mobileNo,
            message: SMSMessage
        };
        this.adminService.add<any>(customer.SendSMS, data).subscribe(res => {
            let dataSelect = {
                id: this.data.id,
                password: randomPassword,
            }
            this.adminService.add<any>(customer.customerUpdate, dataSelect).subscribe(res => {
                this.toasterService.pop('success', 'Success', res.message);
            }, error => {
                this.toasterService.pop('error', 'Error', error.error.message);
            });
        }, error => {
            this.toasterService.pop('error', 'Error', error.error.message);
        });
    }

    UpdatePhoneNumber() {
        var PhoneNumber = ((document.getElementById("txt_PhoneNumber") as HTMLInputElement).value)
        var ConfirmPhoneNumber = ((document.getElementById("txt_confirmPhoneNumber") as HTMLInputElement).value)

        if (PhoneNumber == "")
            return this.toasterService.pop('error', 'Error', "Phone Number Required");

        if (ConfirmPhoneNumber == "")
            return this.toasterService.pop('error', 'Error', "Confirm Phone Number Required");


        if (PhoneNumber != ConfirmPhoneNumber)
            return this.toasterService.pop('error', 'Error', "Confirm Phone Number and Phone Number Don't match");

        if (PhoneNumber.length < 10)
            return this.toasterService.pop('error', 'Error', "Phone Number length is grater than 10 or equal to 10");

        if (this.urls[0].base64images == undefined || this.urls[0].base64images == null)
            return this.toasterService.pop('error', 'Error', "Identifiy Proof Requird");

        let dataSelect = {
            userId: this.data.id,
            operationType: "Reset Phone Number",
            old: PhoneNumber,
            new: ConfirmPhoneNumber,
            identityProof: this.urls[0].base64images,
        }

        this.adminService.add<any>(account.managerInsert, dataSelect).subscribe(res => {
            this.toasterService.pop('success', 'Success', res.message);
            this.modalService.dismissAll();
            this.clear();

        }, error => {
            this.toasterService.pop('error', 'Error', error.error.message);
        });
    }

    checkCheckbox() {
        this.disabled = (document.getElementById("chk_condition") as HTMLInputElement).checked ? false : true;
    }

    UpdateName() {


        var oldName = ((document.getElementById("txt_oldname") as HTMLInputElement).value)
        var newName = ((document.getElementById("txt_newname") as HTMLInputElement).value)

        if (oldName == "")
            return this.toasterService.pop('error', 'Error', "Old Name Required");

        if (newName == "")
            return this.toasterService.pop('error', 'Error', "New Name Required");

        if (oldName != this.data.name)
            return this.toasterService.pop('error', 'Error', "Old Name not match");

        let dataSelect = {
            userId: this.data.id,
            operationType: "Change Name",
            old: oldName,
            new: newName,
            identityProof: this.urls[0].base64images,
        }

        this.adminService.add<any>(account.managerInsert, dataSelect).subscribe(res => {
            this.toasterService.pop('success', 'Success', res.message);
            this.modalService.dismissAll();

            this.clear();
        }, error => {
            this.toasterService.pop('error', 'Error', error.error.message);
            this.clear();
        });
    }

    //#region randomPassword
    randomPassword() {

        var charsetOne = 'ABCDEFGHIJKLMNOPQRSTUVWXTZ', charsetTwo = 'abcdefghiklmnopqrstuvwxyz', charsetThree = '@', charsetFour = '0123456789', randomstring = '', i = 0;

        for (i = 0; i < 3; i++) {
            var rnumOne = Math.floor(Math.random() * charsetOne.length);
            randomstring += charsetOne.substring(rnumOne, rnumOne + 1);
        }

        for (i = 0; i < 3; i++) {
            var rnumTwo = Math.floor(Math.random() * charsetTwo.length);
            randomstring += charsetTwo.substring(rnumTwo, rnumTwo + 1);
        }

        var rnumThree = Math.floor(Math.random() * charsetThree.length);
        randomstring += charsetThree.substring(rnumThree, rnumThree + 1);

        for (i = 0; i < 3; i++) {
            var rnumFour = Math.floor(Math.random() * charsetFour.length);
            randomstring += charsetFour.substring(rnumFour, rnumFour + 1);
        }

        return randomstring;
    }
    //#endregion randomPassword

    openWindowCustomClass(content) {
        this.modalService.open(content, { windowClass: 'dark-modal', });
    }

    selectfile(event) {
        if (!event.target.files[0].type.includes("image")) {
            this.modalService.dismissAll();
            this.toasterService.pop('error', 'Error', "Please Select Only Image !!");
            return;
        }
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

    //#region Wallet Balance
    convertDecimal(Balance) {
        return Number(Balance).toFixed(2);
    }

    ManiWalletBalance(id) {

        let data = {
            id: id
        }
        this.adminService.add<any>(gameBalance.walletBalance, data).subscribe(res => {
            var balance = res.data.filter(x => x.walletName == "Main Wallet");
            this.mainBal = this.convertDecimal(balance[0].amount);
        }, error => {
            this.mainBal = 0.0
        });
    }

    Kiss918Balance(id) {
        let data = {
            id: id,
            username: this.kiss918Username
        }
        this.adminService.add<any>(gameBalance.Kiss918, data).subscribe(res => {
            this.kissBal = this.convertDecimal(res.data.balance);
        }, error => {
            this.kissBal = 0.0
        });
    }

    Mega888(id) {
        let data = {
            id: id,
            username: this.mega888Username
        }
        this.adminService.add<any>(gameBalance.Mega888, data).subscribe(res => {
            this.mega888Bal = this.convertDecimal(res.data.balance);
        }, error => {
            this.mega888Bal = 0.0
        });
    }

    Maxbet(id) {
        let data = {
            id: id,
            username: this.maxbetUsername
        }
        this.adminService.add<any>(gameBalance.Maxbet, data).subscribe(res => {
            this.maxbetBal = this.convertDecimal(res.data.balance);
        }, error => {
            this.maxbetBal = 0.0
        });
    }

    M8(id) {
        let data = {
            id: id,
            username: this.m8Username
        }
        this.adminService.add<any>(gameBalance.m8, data).subscribe(res => {
            this.m8Bal = this.convertDecimal(res.data.balance);
        }, error => {
            this.m8Bal = 0.0
        });
    }

    AG(id) {
        let data = {
            id: id,
            username: this.agUsername
        }
        this.adminService.add<any>(gameBalance.AG, data).subscribe(res => {
            this.agBal = this.convertDecimal(res.data.balance);
        }, error => {
            this.agBal = 0.0
        });
    }

    DG(id) {
        let data = {
            id: id,
            username: this.dgUsername
        }
        this.adminService.add<any>(gameBalance.DG, data).subscribe(res => {
            this.dgBal = this.convertDecimal(res.data.balance);
        }, error => {
            this.dgBal = 0.0
        });
    }

    Playtech(id) {
        let data = {
            id: id,
            username: this.playtechUsername
        }
        this.adminService.add<any>(gameBalance.Playtech, data).subscribe(res => {
            this.playtechBal = this.convertDecimal(res.data.balance);
        }, error => {
            this.playtechBal = 0.0
        });
    }

    Joker(id) {
        let data = {
            id: id,
            username: this.jokerUsername
        }
        this.adminService.add<any>(gameBalance.Joker, data).subscribe(res => {
            this.jokerBal = this.convertDecimal(res.data.balance);
        }, error => {
            this.jokerBal = 0.0
        });
    }

    Sexybaccarat(id) {
        let data = {
            id: id,
            username: this.sexyUsername
        }
        this.adminService.add<any>(gameBalance.SexyBaccarat, data).subscribe(res => {
            this.sexybaccaratBal = this.convertDecimal(res.data.balance);
        }, error => {
            this.sexybaccaratBal = 0.0
        });
    }


    SA(id) {
        let data = {
            id: id,
            username: this.saUsername
        }
        this.adminService.add<any>(gameBalance.SA, data).subscribe(res => {
            this.saBal = this.convertDecimal(res.data.balance);
        }, error => {
            this.saBal = 0.0
        });
    }

    Pussy888(id) {
        let data = {
            id: id,
            username: this.pussyUsername
        }
        this.adminService.add<any>(gameBalance.Pussy888, data).subscribe(res => {
            this.pussy88Bal = res.data.balance;
        }, error => {
            this.pussy88Bal = 0.0
        })
    }

    Allbet(id) {
        let data = {
            id: id,
            username: this.allbetUsername,
            password: this.password
        }
        this.adminService.add<any>(gameBalance.AllBet, data).subscribe(res => {
            this.allbetBal = res.data.balance;
        }, error => {
            this.allbetBal = 0.0
        })
    }

    WM(id) {
        let data = {
            id: id,
            username: this.wmUsername
        }
        this.adminService.add<any>(gameBalance.WM, data).subscribe(res => {
            this.wmBal = res.data.balance;
        }, error => {
            this.wmBal = 0.0
        })
    }

    Pragmatic(id) {
        let data = {
            id: id,
            username: this.pragmaticUsername
        }
        this.adminService.add<any>(gameBalance.Pragmatic, data).subscribe(res => {
            this.pragmaticBal = res.data.balance;
        }, error => {
            this.pragmaticBal = 0.0;
        })
    }
    //#endregion Wallet Balance

    clear() {
        (document.getElementById("txt_newname") as HTMLInputElement).value = "";
        (document.getElementById("txt_oldname") as HTMLInputElement).value = "";
        (document.getElementById("txt_PhoneNumber") as HTMLInputElement).value = "";
        (document.getElementById("txt_confirmPhoneNumber") as HTMLInputElement).value = "";
        (document.getElementById("txt_changePassword") as HTMLInputElement).value = "";
        (document.getElementById("txt_confirmPassword") as HTMLInputElement).value = "";
    }

    UploadIcImage() {

        if (this.urls.length == 0) {
            this.toasterService.pop('error', 'Error', "Please Select Image !!");
            return;
        }
        let data = {
            file: this.urls,
            userId: this.data.id
        }

        this.adminService.add<any>(customer.CustomerICImageAdd, data).subscribe(res => {
            this.getProfile();
            this.toasterService.pop('success', 'Success', res.message);
            this.modalService.dismissAll();
        }, error => {
            this.toasterService.pop('error', 'Error', error.error.message);
            this.modalService.dismissAll();
        });
    }

    UpdateICNo() {
        var icNumbers = ((document.getElementById("txt_ic_no") as HTMLInputElement).value)

        if (icNumbers == null || icNumbers == "" || icNumbers == undefined) {
            this.toasterService.pop('error', 'Error', "Please Insert IC Number !!");
            return;
        }
        let data = {
            icNumber: icNumbers,
            userId: this.data.id
        }
        this.adminService.add<any>(customer.CustomerICNumberAdd, data).subscribe(res => {
            this.ICNumber = icNumbers
            this.toasterService.pop('success', 'Success', res.message);
            this.modalService.dismissAll();
        }, error => {
            this.toasterService.pop('error', 'Error', error.error.message);
            this.modalService.dismissAll();
        });
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

    async getUsername() {
        let data = {
            id: this.data.id
        }
        this.adminService.add<any>(customer.GetUsername, data).subscribe(async res => {
            this.agUsername = res.data.agUsername;
            this.playtechUsername = res.data.playtechUsername;
            this.dgUsername = res.data.dgUsername;
            this.saUsername = res.data.saUsername;
            this.sexyUsername = res.data.sexyUsername;
            this.jokerUsername = res.data.jokerUsername;
            this.maxbetUsername = res.data.maxbetUsername;
            this.m8Username = res.data.m8Username;
            this.kiss918Username = res.data.kiss918Username;
            this.mega888Username = res.data.mega888Username;
            this.pussyUsername = res.data.pussy888Username;
            this.allbetUsername = res.data.allbetUsername;
            this.wmUsername = res.data.wmUsername;
            this.pragmaticUsername = res.data.pragmaticUsername;
            await this.refeshBalance();
            setTimeout(() => {
                try {
                    this.totalBal = Number(this.playtechBal) + Number(this.m8Bal) + Number(this.jokerBal) + Number(this.agBal) + Number(this.dgBal) + Number(this.saBal) + Number(this.sexybaccaratBal) + Number(this.mainBal) + Number(this.kissBal) + Number(this.mega888Bal) + Number(this.maxbetBal) + Number(this.allbetBal) + Number(this.wmBal) + Number(this.pragmaticBal);
                    (document.getElementById("balance") as HTMLInputElement).innerText = this.totalBal;
                }
                catch {
                    setTimeout(() => {
                        try {
                            this.totalBal = Number(this.playtechBal) + Number(this.m8Bal) + Number(this.jokerBal) + Number(this.agBal) + Number(this.dgBal) + Number(this.saBal) + Number(this.sexybaccaratBal) + Number(this.mainBal) + Number(this.kissBal) + Number(this.mega888Bal) + Number(this.maxbetBal) + Number(this.allbetBal) + Number(this.wmBal) + Number(this.pragmaticBal);
                            (document.getElementById("balance") as HTMLInputElement).innerText = this.totalBal;
                        }
                        catch {

                        }
                    }, 3000);
                }
            }, 3000);
        })
    }
}

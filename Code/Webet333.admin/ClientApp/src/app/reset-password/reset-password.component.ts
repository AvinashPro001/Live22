import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { SettingsService } from '../core/settings/settings.service';
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { CustomValidators } from 'ng2-validation';
import { CommonService } from '../common/common.service';
import { account } from '../../environments/environment'

@Component({
    selector: 'app-reset-password',
    templateUrl: './reset-password.component.html',
    styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
    id: string;
    token: string;
    resetPWDForm: FormGroup;

    constructor(private fb: FormBuilder,
        private activatedRoute: ActivatedRoute,
        public settings: SettingsService,
        private commonService: CommonService,
        private router: Router,
        private toasterService: ToasterService) { }

    ngOnInit() {
        this.getIdAndToken();
        this.formInfoValidation();
    }

    getIdAndToken() {
        this.activatedRoute.params.subscribe(params => {
            this.id = params['id?token=token'];
        })
        this.activatedRoute.queryParams.subscribe(params => {
            this.token = params['token']
        })
    }

    formInfoValidation() {
        let password = new FormControl('', Validators.compose([Validators.required, Validators.minLength(6), Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$')]));
        let newPassword = new FormControl('', Validators.compose([Validators.required, CustomValidators.equalTo(password)]));
        this.resetPWDForm = this.fb.group({
            Password: password,
            ConfirmPassword: newPassword,
        });
    }
    passwordSubmit(value) {
        value['Id'] = this.id;
        value['Token'] = this.token;
        this.commonService.add<any>(account.resetPassword, value).subscribe(res => {
            this.toasterService.pop('success', 'Success', "Password changed successfully");
            this.router.navigate(['/']);
        }, error => {
            this.toasterService.pop('error', 'Error', error.message);
        })
    }
}
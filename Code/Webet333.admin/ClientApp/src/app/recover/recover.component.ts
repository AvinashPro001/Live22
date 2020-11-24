import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../core/settings/settings.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../common/common.service';
import { ToasterService } from 'angular2-toaster';
import { account } from '../../environments/environment'

@Component({
    selector: 'app-recover',
    templateUrl: './recover.component.html',
    styleUrls: ['./recover.component.scss']
})
export class RecoverComponent implements OnInit {

    forgetPwdForm: FormGroup;

    constructor(public settings: SettingsService,
        private fb: FormBuilder,
        private commonService: CommonService,
        private router: Router,
        private toasterService: ToasterService) {
        this.forgetPwdValidation()
    }


    forgetPwdValidation() {
        this.forgetPwdForm = this.fb.group({
            'Email': ['', Validators.compose([Validators.required, CustomValidators.email])],
        })
    }
    forgetPwdSubmit(value) {
        this.commonService.add<any>(account.forgetPassword, value).subscribe(res => {
            this.toasterService.pop('success', 'Success', "Forgot password link sent successfully");
            this.router.navigate(['/']);
        }, error => {
            this.toasterService.pop('error', 'Error', error.message);
        })
    }

    ngOnInit() {
    }

}

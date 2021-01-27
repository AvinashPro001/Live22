import { Component, OnInit, Input } from '@angular/core';
import { SettingsService } from '../core/settings/settings.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from '../common/common.service';
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { CustomValidators } from 'ng2-validation';
import { account } from '../../environments/environment';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    returnUrl: string;
    toaster: any;
    toasterConfig: any;
    showloader: boolean;
    toasterconfig: ToasterConfig = new ToasterConfig({
        positionClass: 'toast-bottom-right',
        showCloseButton: true
    });
    loginbtn = true;

    constructor(
        public settings: SettingsService,
        public commonService: CommonService,
        public toasterService: ToasterService,
        public cookieService: CookieService,
        public router: Router,
        private route: ActivatedRoute,
        public fb: FormBuilder) {
        this.loginFormValidation();
    }

    loginFormValidation() {
        this.loginForm = this.fb.group({
            'grantType': '1',
            'userName': [null, Validators.compose([Validators.required])],
            'password': [null, Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(128)])]
        });
    }

    login(value: any) {
        this.showloader = true;
        if (this.loginForm.valid) {
            this.showloader = true;
            this.commonService.add<any>(account.login, value).subscribe((res) => {
                this.showloader = true;
                localStorage.setItem('currentUser', JSON.stringify(res.data));
                localStorage.setItem('isReload', 'true');
                this.router.navigate(['/admin/dashboard']);
            }, error => {
                this.showloader = false;
                this.toasterService.pop('error', 'Error', error.error.message);
                this.router.navigate(['/']);
            }
            );
            this.showloader = false;
        }
        this.showloader = false;
    }

    ngOnInit() {
        localStorage.clear();
        this.returnUrl = this.route.snapshot.queryParams['/admin/dashboard'];
    }

}
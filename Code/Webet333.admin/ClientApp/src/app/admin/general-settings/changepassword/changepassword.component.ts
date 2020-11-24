import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { Router } from '@angular/router';
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { CommonService } from '../../../common/common.service';
import { account } from '../../../../environments/environment';


@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.scss']
})
export class ChangepasswordComponent implements OnInit {

  valForm: FormGroup;

  constructor(fb: FormBuilder, 
    private commonService: CommonService, 
    private router: Router, 
    private toasterService: ToasterService
    ) {
    let password = new FormControl('', Validators.compose([Validators.required, Validators.minLength(6), Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$')]));
    let newPassword = new FormControl('', Validators.compose([CustomValidators.equalTo(password)]));
    this.valForm = fb.group({
      'CurrentPassword': [null, Validators.compose([Validators.required,
      Validators.minLength(6)])],
      Password: password,
      ConfirmPassword: newPassword,
    });
  }


  changePassword($ev, value: any) {
    if (this.valForm.valid) {
      this.commonService.add<any>(account.changePassword, this.valForm.value).subscribe((res) => {
        this.toasterService.pop('success', 'Success', res.message);
        this.router.navigate(['/admin/dashboard']);
      },
        error => {
          this.toasterService.pop('error', 'Error', error.error.message);
        }
      );
    }
  }

  ngOnInit() {
  }

}



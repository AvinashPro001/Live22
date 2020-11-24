import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

const routes: Routes = [
  { path: 'changepassword', component: ChangepasswordComponent },
  { path: 'edit-profile', component: EditProfileComponent },
];


@NgModule({
  imports: [
    LoadingModule.forRoot(ANIMATION_TYPES),
    FormsModule, ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ChangepasswordComponent, EditProfileComponent],
  exports: [
    RouterModule
  ]
})
export class GeneralSettingsModule { }

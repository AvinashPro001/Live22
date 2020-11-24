import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from '../../../app/common/auth.guard';


const routes: Routes = [
    {
        path: '', component: DashboardComponent,
        canActivate: [AuthGuard]
    },
  ];

@NgModule({
  imports: [
    LoadingModule.forRoot(ANIMATION_TYPES),
    FormsModule, ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DashboardComponent],
  exports: [
    RouterModule
  ]
})
export class DashboardModule { }

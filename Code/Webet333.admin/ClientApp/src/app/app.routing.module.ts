"use strict";

import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { LoginComponent } from './login/login.component';
import { Error404Component } from './error404/error404.component';
import { RecoverComponent } from './recover/recover.component';
import { LayoutComponent } from './layout/layout.component';

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: LoginComponent
            },
            {
                path: 'recover', component: RecoverComponent
            },
            // {
            //   path: 'drawer', component: DrawerComponent
            // },
            {
                path: '**', component: Error404Component
            },
        ])
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
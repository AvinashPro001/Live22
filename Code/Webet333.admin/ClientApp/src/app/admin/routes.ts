import { AuthGuard } from '../common/auth.guard';
import { LayoutComponent } from '../layout/layout.component';
import { LoginComponent } from '../login/login.component';
import { RecoverComponent } from '../recover/recover.component';
import { Error404Component } from '../error404/error404.component';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';
import { setPasswordComponent } from '../set-password/set-password.component';

export const routes = [
    {
        path: '', component: LoginComponent,
        canActivate: [AuthGuard]
    },
    
    {
        path: 'admin',
        component: LayoutComponent,
        canActivate:[AuthGuard],
        children: [
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule', canActivate: [AuthGuard] },
            { path: 'general-settings', loadChildren: './general-settings/general-settings.module#GeneralSettingsModule' },
            { path: 'customers', loadChildren: './customers/customers.module#CustomersModule' },
        ]
    },
    {
        path: 'recover', component: RecoverComponent
    },
    {
        path: 'reset-password/:id?token=token', component: ResetPasswordComponent
    },
    {
        path: 'set-password', component: setPasswordComponent
    },
    {
        path: '**', component: Error404Component
    },
];


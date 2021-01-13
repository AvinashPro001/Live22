import { BrowserModule ,Title} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateService, TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AuthGuard } from './common/auth.guard';
import { AuthService } from './common/auth.service';
import { AppComponent } from './app.component';
import { RouterModule, Router, PreloadingStrategy, Route } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { SlickModule } from 'ngx-slick';

import { CoreModule } from './core/core.module';
import { LayoutModule } from './layout/layout.module';
import { SharedModule } from './shared/shared.module';

import { LoginComponent } from './login/login.component';
import { Error404Component } from './error404/error404.component';
import { RecoverComponent } from './recover/recover.component';
import { CommonService } from './common/common.service';
import { ToasterService } from 'angular2-toaster';
import { CookieService } from 'ngx-cookie-service';
import { InterceptorService } from './common/interceptor.service';

import { AdminModule } from './admin/admin.module';
import { AdminService } from './admin/admin.service';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { setPasswordComponent } from './set-password/set-password.component';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { NgxSpinnerModule } from 'ngx-spinner';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { Observable } from 'rxjs';


export function createTranslateLoader(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        Error404Component,
        RecoverComponent,
        ResetPasswordComponent,
        setPasswordComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        CoreModule,
        LayoutModule,
        SharedModule.forRoot(),
        AdminModule,
        Ng4LoadingSpinnerModule.forRoot(),
        UiSwitchModule,
        SlickModule.forRoot(),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            }
        }),
        NgxSpinnerModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule,
        
    ],
    exports: [
        RouterModule,
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: InterceptorService,
            multi: true
        },
        AuthGuard,
        AuthService,
        AdminService,
        CommonService,
        ToasterService,
        CookieService,
        DatePipe,
        Title
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
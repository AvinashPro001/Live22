import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MenuService } from '../core/menu/menu.service';
import { TranslatorService } from '../core/translator/translator.service';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routes } from './routes';
import { menu } from './menu';
import { UiSwitchModule } from 'ngx-toggle-switch';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';


@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        RouterModule.forRoot(routes),
        CommonModule,
        NgxDatatableModule,
        UiSwitchModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule
    ],
    declarations: [
    ],
    exports: [
        RouterModule
    ],
})

export class AdminModule {
    previousUrl;
    constructor(public menuService: MenuService,
        tr: TranslatorService,
        public router: Router) {
        menuService.addMenu(menu);
    }
}



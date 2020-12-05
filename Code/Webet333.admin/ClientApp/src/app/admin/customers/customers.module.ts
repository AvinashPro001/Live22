import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Routes, RouterModule } from '@angular/router';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { CustomerListComponent } from '../customers/customer-list/customer-list.component';
import { DepositListComponent } from './deposit/deposit-list.component';
import { DepositAddComponent } from './deposit-add/deposit-add.component';
import { WithdrawListComponent } from './withdraw/withdraw-list.component';
import { WithdrawAddComponent } from './withdraw-add/withdraw-add.component';
import { TransferAddComponent } from './transfer-add/transfer-add.component';
import { TransferListComponent } from './transfer/transfer-list.component';
import { BonusListComponent } from './bonus-list/bonus-list.component';
import { PromotionListComponent } from './promotion-list/promotion-list.component';
import { AnnouncementListComponent } from './announcement-list/announcement-list.component';
import { AnnouncementAddComponent } from './announcement-add/announcement-add.component';
import { PromotionAddComponent } from './promotion-add/promotion-add.component';
import { BonusAddComponent } from './bonus-add/bonus-add.component';
import { CustomerEditComponent } from '../../admin/customers/customer-edit/customer-edit.component'
import { UiSwitchModule } from 'ngx-ui-switch';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TooltipModule } from "ngx-tooltip";
import { ConfirmationDialogService } from '../../../app/confirmation-dialog/confirmation-dialog.service';
import { ConfirmationDialogComponent } from '../../../app/confirmation-dialog/confirmation-dialog.component';
import { SliderModule } from 'angular-image-slider';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { SlickModule } from 'ngx-slick';
import { NgxPaginationModule } from 'ngx-pagination';
import { AdjustmentListComponent } from './adjustment-list/adjustment-list.component';
import { AdjustmentAddComponent } from './adjustment-add/adjustment-add.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { BankListComponent } from './bank-list/bank-list.component';
import { BankAddComponent } from './bank-add/bank-add.component';
import { BankEditComponent } from './bank-edit/bank-edit.component';
import { RefKeywordAddComponent } from './ref-keyword-add/ref-keyword-add.component';
import { MaxbetLimitComponent } from './maxbet-limit/maxbet-limit.component';
import { RefKeywordAnalyticsComponent } from './ref-keyword-analytics/ref-keyword-analytics.component';
import { PromotionEditComponent } from './promotion-edit/promotion-edit.component';
import { MaxbetMinmaxComponent } from './maxbet-minmax/maxbet-minmax.component';
import { RebateCalculateComponent } from './rebate-calculate/rebate-calculate.component';
import { RebateListComponent } from './rebate-list/rebate-list.component';
import { SelectDropDownModule } from 'ngx-select-dropdown';
import { BettingDetailsComponent } from './betting-details/betting-details.component';
import { MaxbetBettingDetailsComponent } from './maxbet-betting-details/maxbet-betting-details.component';
import { ApprovalDurationComponent } from './approval-duration/approval-duration.component';
import { TrackingListComponent } from './tracking-list/tracking-list.component';
import { BetdetailsLastupdateListComponent } from './betdetails-lastupdate-list/betdetails-lastupdate-list.component';
import { UsersDetailsComponent } from './users-details/users-details.component';
import { AnnouncementEditComponent } from './announcement-edit/announcement-edit.component';
import { PromotionApplyComponent } from './promotion-apply/promotion-apply.component';
import { DownloadLinkComponent } from './download-link/download-link.component';
import { LoseRebateCalcComponent } from './lose-rebate-calc/lose-rebate-calc.component';
import { m8LimitComponent } from './m8-limit/m8-limit.component';
import { m8MinmaxComponent } from './m8-minmax/m8-minmax.component';
import { MaxbetBettingLimitComponent } from './maxbet-betting-limit/maxbet-betting-limit.component';
import { GameLastBettingUpdateComponent } from './game-last-betting-update/game-last-betting-update.component';
import { BankWtihdrawComponent } from './bank-wtihdraw/bank-wtihdraw.component';
import { BankDepositComponent } from './bank-deposit/bank-deposit.component';
import { ManagerApproveListComponent } from './manager-approve-list/manager-approve-list.component';
import { AllGameSetBetlimitComponent } from './all-game-set-betlimit/all-game-set-betlimit.component';
import { SmsNotifyComponent } from './sms-notify/sms-notify.component';
import { PromotionGroupingListComponent } from './promotion-grouping-list/promotion-grouping-list.component';
import { PromotionGroupAddComponent } from './promotion-group-add/promotion-group-add.component';
import { PromotionGroupingEditComponent } from './promotion-grouping-edit/promotion-grouping-edit.component';
import { PromotionReportComponent } from './promotion-report/promotion-report.component';
import { BettingdetailsCheckComponent } from './bettingdetails-check/bettingdetails-check.component';
import { UsersWinloseReportComponent } from './users-winlose-report/users-winlose-report.component';
import { RebateSettingComponent } from './rebate-setting/rebate-setting.component';
import { UsersRegisterReportComponent } from './users-register-report/users-register-report.component';
import { UsersBehaviourReportsComponent } from './users-behaviour-reports/users-behaviour-reports.component';
import { GameresetPasswordReportComponent } from './gamereset-password-report/gamereset-password-report.component';

const routes: Routes = [
    { path: 'list', component: CustomerListComponent },
    { path: 'deposit-list', component: DepositListComponent },
    { path: 'deposit-add', component: DepositAddComponent },
    { path: 'withdraw-list', component: WithdrawListComponent },
    { path: 'withdraw-add', component: WithdrawAddComponent },
    { path: 'transfer-add', component: TransferAddComponent },
    { path: 'transfer-list', component: TransferListComponent },
    { path: 'customer-edit', component: CustomerEditComponent },
    { path: 'promotion-list', component: PromotionListComponent },
    { path: 'promotion-grouping-list', component: PromotionGroupingListComponent },
    { path: 'promotion-group-add', component: PromotionGroupAddComponent },
    { path: 'bonus-list', component: BonusListComponent },
    { path: 'promotion-add', component: PromotionAddComponent },
    { path: 'bonus-add', component: BonusAddComponent },
    { path: 'announcement-list', component: AnnouncementListComponent },
    { path: 'announcement-add', component: AnnouncementAddComponent },
    { path: 'adjustment-list', component: AdjustmentListComponent },
    { path: 'adjustment-add', component: AdjustmentAddComponent },
    { path: 'maintenance', component: MaintenanceComponent },
    { path: 'bank-list', component: BankListComponent },
    { path: 'bank-add', component: BankAddComponent },
    { path: 'bank-edit', component: BankEditComponent },
    { path: 'refkeyword-add', component: RefKeywordAddComponent },
    { path: 'maxbet-limit', component: MaxbetLimitComponent },
    { path: 'refkeyword-analytics', component: RefKeywordAnalyticsComponent },
    { path: 'promotion-edit', component: PromotionEditComponent },
    { path: 'maxbet-minmax', component: MaxbetMinmaxComponent },
    { path: 'rebate-calculate', component: RebateCalculateComponent },
    { path: 'rebate-list', component: RebateListComponent },
    { path: 'betting-details', component: BettingDetailsComponent },
    { path: 'maxbet-betting-details', component: MaxbetBettingDetailsComponent },
    { path: 'approval-duration', component: ApprovalDurationComponent },
    { path: 'tracking-list', component: TrackingListComponent },
    { path: 'betdetails-lastupdate-list', component: BetdetailsLastupdateListComponent },
    { path: 'users-details', component: UsersDetailsComponent },
    { path: 'announcement-edit', component: AnnouncementEditComponent },
    { path: 'promotion-apply', component: PromotionApplyComponent },
    { path: 'download-link', component: DownloadLinkComponent },
    { path: 'lose-rebate-calc', component: LoseRebateCalcComponent },
    { path: 'm8-limit', component: m8LimitComponent },
    { path: 'm8-minmax', component: m8MinmaxComponent },
    { path: 'maxbet-betting-limit', component: MaxbetBettingLimitComponent },
    { path: 'game-last-betting-update', component: GameLastBettingUpdateComponent },
    { path: 'bank-withdraw', component: BankWtihdrawComponent },
    { path: 'bank-deposit', component: BankDepositComponent },
    { path: 'manager-approvel-list', component: ManagerApproveListComponent },
    { path: 'all-game-set-betlimit', component: AllGameSetBetlimitComponent },
    { path: 'sms-notify', component: SmsNotifyComponent },
    { path: 'promotion-grouping-edit', component: PromotionGroupingEditComponent },
    { path: 'promotion-report', component: PromotionReportComponent },
    { path: 'bettingdetails-check', component: BettingdetailsCheckComponent },
    { path: 'users-winlose-report', component: UsersWinloseReportComponent },
    { path: 'rebate-setting', component: RebateSettingComponent },
    { path: 'users-register-report', component: UsersRegisterReportComponent },
    { path: 'users-behaviour-report', component: UsersBehaviourReportsComponent },
    { path: 'gamereset-password-report', component: GameresetPasswordReportComponent },
];

@NgModule({
    imports: [
        LoadingModule.forRoot(ANIMATION_TYPES),
        FormsModule, ReactiveFormsModule,
        CommonModule,
        RouterModule.forChild(routes),
        NgxDatatableModule,
        UiSwitchModule,
        NgbModule,
        TooltipModule,
        SliderModule,
        SlickModule,
        CKEditorModule,
        OwlDateTimeModule,
        OwlNativeDateTimeModule,
        NgxPaginationModule,
        SelectDropDownModule,
        ButtonsModule,
    ],
    declarations: [CustomerListComponent, DepositListComponent, WithdrawListComponent, TransferListComponent, CustomerEditComponent, DepositAddComponent, WithdrawAddComponent, ConfirmationDialogComponent, PromotionListComponent, PromotionAddComponent, BonusAddComponent, BonusListComponent, AnnouncementListComponent, TransferAddComponent, AnnouncementAddComponent, AdjustmentListComponent, AdjustmentAddComponent, MaintenanceComponent, BankListComponent, BankAddComponent, BankEditComponent, RefKeywordAddComponent, MaxbetLimitComponent, RefKeywordAnalyticsComponent, PromotionEditComponent, MaxbetMinmaxComponent, RebateCalculateComponent, RebateListComponent, BettingDetailsComponent, MaxbetBettingDetailsComponent, ApprovalDurationComponent, TrackingListComponent, BetdetailsLastupdateListComponent, UsersDetailsComponent, AnnouncementEditComponent, PromotionApplyComponent, DownloadLinkComponent, LoseRebateCalcComponent, m8LimitComponent, m8MinmaxComponent, MaxbetBettingLimitComponent, GameLastBettingUpdateComponent, BankWtihdrawComponent, BankDepositComponent, ManagerApproveListComponent, AllGameSetBetlimitComponent, SmsNotifyComponent, PromotionGroupingListComponent, PromotionGroupAddComponent, PromotionGroupingEditComponent, PromotionReportComponent, BettingdetailsCheckComponent, UsersWinloseReportComponent, RebateSettingComponent, UsersRegisterReportComponent, UsersBehaviourReportsComponent, GameresetPasswordReportComponent
    ],
    providers: [ConfirmationDialogService],
    entryComponents: [ConfirmationDialogComponent],
    exports: [
        RouterModule,
    ]
})
export class CustomersModule { }

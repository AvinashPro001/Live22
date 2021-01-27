import { link } from "fs";
import { text } from "@angular/core/src/render3/instructions";

//const CustomerDatabase = {
//    text: 'Main Menu',
//    icon: 'fa fa-angle-right',
//    submenu: [
//        {
//            text: 'Dashboard',
//            link: 'dashboard',
//            icon: 'fa fa-dashboard'
//        },
//        {
//            text: 'Customer List',
//            link: 'customers/list',
//            icon: 'fa fa-user'
//        },
//        {
//            text: 'Users Details',
//            link: 'customers/users-details',
//            icon: 'fa fa-address-card'
//        },
//    ]
//}

//const Settings = {
//    text: 'Settings',
//    icon: 'fa fa-angle-right',
//    submenu: [
//        {
//            text: 'Add Keyword',
//            link: 'customers/refkeyword-add',
//            icon: 'fa fa-bar-chart'
//        },
//        {
//            text: 'Game Maintenance',
//            link: 'customers/maintenance',
//            icon: 'fa fa-wrench'
//        },
//        {
//            text: 'Rebate Setting',
//            link: 'customers/rebate-setting',
//            icon: 'fa fa-wrench'
//        },
//        {
//            text: 'Bank',
//            link: 'customers/bank-list',
//            icon: 'fa fa-university'
//        },
//        {
//            text: 'Download App',
//            link: 'customers/download-link',
//            icon: 'fa fa-link'
//        },
//        {
//            text: 'MaxBet Game',
//            icon: 'fa fa-angle-right',
//            submenu: [
//                {
//                    text: 'MaxBet Parameters',
//                    link: 'customers/maxbet-minmax',
//                    icon: 'fa fa-cog'
//                },
//                {
//                    text: 'MaxBet Limit',
//                    link: 'customers/maxbet-limit',
//                    icon: 'fa fa-cog'
//                },
//                {
//                    text: 'Default Betting limit',
//                    link: 'customers/maxbet-betting-limit',
//                    icon: 'fa fa-cog'
//                },
//                {
//                    text: 'Maunal Betting Details',
//                    link: 'customers/maxbet-betting-details',
//                    icon: 'fa fa-cog'
//                },
//            ]
//        },
//        {
//            text: 'M8 Game',
//            icon: 'fa fa-angle-right',
//            submenu: [
//                {
//                    text: 'Default limit',
//                    link: 'customers/m8-minmax',
//                    icon: 'fa fa-cog'
//                },
//                {
//                    text: 'Change limit',
//                    link: 'customers/m8-limit',
//                    icon: 'fa fa-cog'
//                }
//            ]
//        },
//        {
//            text: 'Promotion',
//            icon: 'fa fa-angle-right',
//            submenu: [
//                {
//                    text: 'Add Promotion',
//                    link: 'customers/promotion-list',
//                    icon: 'fa fa-gift'
//                },
//                {
//                    text: 'Promotion Apply',
//                    link: 'customers/promotion-apply',
//                    icon: 'fa fa-gift'
//                },
//                {
//                    text: 'Promotion Grouping',
//                    link: 'customers/promotion-grouping-list',
//                    icon: 'fa fa-gift'
//                }
//            ]
//        },
//        {
//            text: 'Game Bet Limit',
//            link: 'customers/all-game-set-betlimit',
//            icon: 'fa fa-clock-o'
//        },
//        {
//            text: 'Announcement',
//            link: 'customers/announcement-list',
//            icon: 'fa fa-bullhorn'
//        },
//        {
//            text: 'SMS Announcement',
//            link: 'customers/sms-notify',
//            icon: 'fa fa-bullhorn'
//        },
//        {
//            text: 'VIP Level',
//            link: 'customers/vip-page-setting',
//            icon: 'fa fa-bullhorn'
//        }
//    ]
//}

//const Transactions = {
//    text: 'Transactions',
//    icon: 'fa fa-angle-right',
//    submenu: [
//        {
//            text: 'Deposit',
//            link: 'customers/deposit-list',
//            icon: 'fa fa-money',
//            target: '_self',
//        },
//        {
//            text: 'Withdraw',
//            link: 'customers/withdraw-list',
//            icon: 'fa fa-rocket',
//            target: '_self'
//        },
//        {
//            text: 'Transfer',
//            link: 'customers/transfer-list',
//            icon: 'fa fa-tasks',
//            target: '_self'
//        },
//        {
//            text: 'Bonus',
//            link: 'customers/bonus-list',
//            icon: 'fa fa-money',
//            target: '_self'
//        },
//        {
//            text: 'Adjustment',
//            link: 'customers/adjustment-list',
//            icon: 'fa fa-sliders'
//        },
//        {
//            text: 'Rebate',
//            icon: 'fa fa-angle-right',
//            submenu: [
//                {
//                    text: 'Rebate List',
//                    link: 'customers/rebate-list',
//                    icon: 'fa fa-info'
//                },
//                {
//                    text: 'Turnover Rebate',
//                    link: 'customers/rebate-calculate',
//                    icon: 'fa fa fa-leaf'
//                },
//                {
//                    text: 'Lose Rebate',
//                    link: 'customers/lose-rebate-calc',
//                    icon: 'fa fa fa-leaf'
//                }
//            ]
//        }
//    ]
//}

//const Report = {
//    text: 'Report',
//    icon: 'fa fa-angle-right',
//    submenu: [
//        {
//            text: 'Keyword Report',
//            link: 'customers/refkeyword-analytics',
//            icon: 'fa fa-bar-chart'
//        },
//        {
//            text: 'Duplication Report',
//            link: 'customers/tracking-list',
//            icon: 'fa fa-clock-o'
//        },
//        {
//            text: 'Maunal Betting Details',
//            link: 'customers/betting-details',
//            icon: 'fa fa-rocket'
//        },
//        {
//            text: 'Check Betting Details',
//            link: 'customers/bettingdetails-check',
//            icon: 'fa fa-rocket'
//        },
//        {
//            text: 'Promotion Report',
//            link: 'customers/promotion-report',
//            icon: 'fa fa-rocket'
//        },
//        {
//            text: 'User Register Report',
//            link: 'customers/users-register-report',
//            icon: 'fa fa-rocket'
//        },
//        {
//            text: 'User Behavior Report',
//            link: 'customers/users-behaviour-report',
//            icon: 'fa fa-rocket'
//        },
//        {
//            text: 'LastUpdate Betails',
//            link: 'customers/betdetails-lastupdate-list',
//            icon: 'fa fa-clock-o'
//        },
//        {
//            text: 'Game Last Details ',
//            link: 'customers/game-last-betting-update',
//            icon: 'fa fa-clock-o'
//        },
//        {
//            text: 'Approval Duration',
//            link: 'customers/approval-duration',
//            icon: 'fa fa-clock-o'
//        },
//        {
//            text: 'Manager Approv List',
//            link: 'customers/manager-approvel-list',
//            icon: 'fa fa-stack-exchange'
//        },

//        {
//            text: 'Resert Password List',
//            link: 'customers/gamereset-password-report',
//            icon: 'fa fa-stack-exchange'
//        },

//        {
//            text: 'Users Winlose Report',
//            link: 'customers/users-winlose-report',
//            icon: 'fa fa-stack-exchange'
//        },
//        {
//            text: 'Bank Withdraw',
//            link: 'customers/bank-withdraw',
//            icon: 'fa fa-info'
//        },
//        {
//            text: 'Bank Depsoit',
//            link: 'customers/bank-deposit',
//            icon: 'fa fa-info'
//        },


//    ]
//}

//#region       Assign value from localStorage
var values = JSON.parse(localStorage.getItem("currentUser"));
var CustomerDatabase = null;
var Settings = null;
var Transactions = null;
var Report = null;

if (values != undefined || values != null) {
    var CustomerDatabase = values.permissionsList[0];
    var Settings = values.permissionsList[1];
    var Transactions = values.permissionsList[2];
    var Report = values.permissionsList[3];

}

//#endregion

const menu = [
    CustomerDatabase,
    Transactions,
    Report,
    Settings
]

export { menu }
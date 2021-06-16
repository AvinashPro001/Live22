import { Component, OnInit } from '@angular/core';
import { ToasterService } from 'angular2-toaster';
import { CommonService } from '../../../common/common.service';
import { AdminService } from '../../admin.service';
import { customer } from '../../../../environments/environment';

@Component({
    selector: 'app-sbo-player-default-bet-limit',
    templateUrl: './sbo-player-default-bet-limit.component.html',
    styleUrls: ['./sbo-player-default-bet-limit.component.scss']
})

export class SboPlayerDefaultBetLimitComponent implements OnInit {
    //#region Variable

    playerDefaultBetLimit: any;

    //#endregion Variable

    constructor(
        private adminService: AdminService,
        private commonService: CommonService,
        private toasterService: ToasterService,) { }

    ngOnInit() { this.GetData();}


    async GetData() {
        this.adminService.getAll<any>(customer.getSBOPlayerDefaultBetLimit).subscribe(res => {
            this.playerDefaultBetLimit = res.data;
        });
    }

    async Update() {

        let model = [
            {
                id: this.playerDefaultBetLimit.Football_OthersMatchType_MinBetId,
                name: 'Football_OthersMatchType_MinBet',
                value: (document.getElementById("Football_OthersMatchType_MinBet") as HTMLInputElement).value,
                comment: 'SBO default player bet Limit'
            },
            {
                id: this.playerDefaultBetLimit.Football_OthersMatchType_MaxBetId,
                name: 'Football_OthersMatchType_MaxBet',
                value: (document.getElementById("Football_OthersMatchType_MaxBet") as HTMLInputElement).value,
                comment: 'SBO default player bet Limit'
            },
            {
                id: this.playerDefaultBetLimit.Football_OthersMatchType_MaxBetMatchId,
                name: 'Football_OthersMatchType_MaxBetMatch',
                value: (document.getElementById("Football_OthersMatchType_MaxBetMatch") as HTMLInputElement).value,
                comment: 'SBO default player bet Limit'
            },
            {
                id: this.playerDefaultBetLimit.Football_OverUnder_MinBetId,
                name: 'Football_OverUnder_MinBet',
                value: (document.getElementById("Football_OverUnder_MinBet") as HTMLInputElement).value,
                comment: 'SBO default player bet Limit'
            },
            {
                id: this.playerDefaultBetLimit.Football_OverUnder_MaxBetId,
                name: 'Football_OverUnder_MaxBet',
                value: (document.getElementById("Football_OverUnder_MaxBet") as HTMLInputElement).value,
                comment: 'SBO default player bet Limit'
            },
            {
                id: this.playerDefaultBetLimit.Football_OverUnder_MaxBetMatchId,
                name: 'Football_OverUnder_MaxBetMatch',
                value: (document.getElementById("Football_OverUnder_MaxBetMatch") as HTMLInputElement).value,
                comment: 'SBO default player bet Limit'
            },
            {
                id: this.playerDefaultBetLimit.Football_CorrectScore_MinBetId,
                name: 'Football_CorrectScore_MinBet',
                value: (document.getElementById("Football_CorrectScore_MinBet") as HTMLInputElement).value,
                comment: 'SBO default player bet Limit'
            },
            {
                id: this.playerDefaultBetLimit.Football_CorrectScore_MaxBetId,
                name: 'Football_CorrectScore_MaxBet',
                value: (document.getElementById("Football_CorrectScore_MaxBet") as HTMLInputElement).value,
                comment: 'SBO default player bet Limit'
            },
            {
                id: this.playerDefaultBetLimit.Football_CorrectScore_MaxBetMatchId,
                name: 'Football_CorrectScore_MaxBetMatch',
                value: (document.getElementById("Football_CorrectScore_MaxBetMatch") as HTMLInputElement).value,
                comment: 'SBO default player bet Limit'
            },
            {
                id: this.playerDefaultBetLimit.OthersSport_OthersMatchType_MinBetId,
                name: 'OthersSport_OthersMatchType_MinBet',
                value: (document.getElementById("OthersSport_OthersMatchType_MinBet") as HTMLInputElement).value,
                comment: 'SBO default player bet Limit'
            },
            {
                id: this.playerDefaultBetLimit.OthersSport_OthersMatchType_MaxBetId,
                name: 'OthersSport_OthersMatchType_MaxBet',
                value: (document.getElementById("OthersSport_OthersMatchType_MaxBet") as HTMLInputElement).value,
                comment: 'SBO default player bet Limit'
            },
            {
                id: this.playerDefaultBetLimit.OthersSport_OthersMatchType_MaxBetMatchId,
                name: 'OthersSport_OthersMatchType_MaxBetMatch',
                value: (document.getElementById("OthersSport_OthersMatchType_MaxBetMatch") as HTMLInputElement).value,
                comment: 'SBO default player bet Limit'
            },
            {
                id: this.playerDefaultBetLimit.OthersSport_OverUnder_MinBetId,
                name: 'OthersSport_OverUnder_MinBet',
                value: (document.getElementById("OthersSport_OverUnder_MinBet") as HTMLInputElement).value,
                comment: 'SBO default player bet Limit'
            },
            {
                id: this.playerDefaultBetLimit.OthersSport_OverUnder_MaxBetId,
                name: 'OthersSport_OverUnder_MaxBet',
                value: (document.getElementById("OthersSport_OverUnder_MaxBet") as HTMLInputElement).value,
                comment: 'SBO default player bet Limit'
            },
            {
                id: this.playerDefaultBetLimit.OthersSport_OverUnder_MaxBetMatchId,
                name: 'OthersSport_OverUnder_MaxBetMatch',
                value: (document.getElementById("OthersSport_OverUnder_MaxBetMatch") as HTMLInputElement).value,
                comment: 'SBO default player bet Limit'
            },
            {
                id: this.playerDefaultBetLimit.OthersSport_CorrectScore_MinBetId,
                name: 'OthersSport_CorrectScore_MinBet',
                value: (document.getElementById("OthersSport_CorrectScore_MinBet") as HTMLInputElement).value,
                comment: 'SBO default player bet Limit'
            },
            {
                id: this.playerDefaultBetLimit.OthersSport_CorrectScore_MaxBetId,
                name: 'OthersSport_CorrectScore_MaxBet',
                value: (document.getElementById("OthersSport_CorrectScore_MaxBet") as HTMLInputElement).value,
                comment: 'SBO default player bet Limit'
            },
            {
                id: this.playerDefaultBetLimit.OthersSport_CorrectScore_MaxBetMatchId,
                name: 'OthersSport_CorrectScore_MaxBetMatch',
                value: (document.getElementById("OthersSport_CorrectScore_MaxBetMatch") as HTMLInputElement).value,
                comment: 'SBO default player bet Limit'
            }
        ];

        //#region Temp

        //let model = [
        //    {
        //        stortType: 'Football',
        //        stortTypeId: 3,
        //        marketType: 'Others Match Type',
        //        marketTypeId: 0,
        //        minBet: (document.getElementById("football_minbet_otherMatchType") as HTMLInputElement).value,
        //        maxBet: (document.getElementById("football_maxbet_otherMatchType") as HTMLInputElement).value,
        //        maxBetMatch: (document.getElementById("football_maxBetMatch_otherMatchType") as HTMLInputElement).value
        //    },
        //    {
        //        stortType: 'Football',
        //        stortTypeId: 3,
        //        marketType: 'Over Under',
        //        marketTypeId: 3,
        //        minBet: (document.getElementById("football_minbet_overUnder") as HTMLInputElement).value,
        //        maxBet: (document.getElementById("football_maxbet_overUnder") as HTMLInputElement).value,
        //        maxBetMatch: (document.getElementById("football_maxBetMatch_overUnder") as HTMLInputElement).value
        //    },
        //    {
        //        stortType: 'Football',
        //        stortTypeId: 3,
        //        marketType: 'Correct Score',
        //        marketTypeId: 0,
        //        minBet: (document.getElementById("football_minbet_correctScore") as HTMLInputElement).value,
        //        maxBet: (document.getElementById("football_maxbet_correctScore") as HTMLInputElement).value,
        //        maxBetMatch: (document.getElementById("football_maxBetMatch_correctScore") as HTMLInputElement).value
        //    },
        //    {
        //        stortType: 'Others Sport',
        //        stortTypeId: 3,
        //        marketType: 'Others Match Type',
        //        marketTypeId: 0,
        //        minBet: (document.getElementById("othersSport_minbet_otherMatchType") as HTMLInputElement).value,
        //        maxBet: (document.getElementById("othersSport_maxbet_otherMatchType") as HTMLInputElement).value,
        //        maxBetMatch: (document.getElementById("othersSport_maxBetMatch_otherMatchType") as HTMLInputElement).value
        //    },
        //    {
        //        stortType: 'Others Sport',
        //        stortTypeId: 3,
        //        marketType: 'Others Match Type',
        //        marketTypeId: 0,
        //        minBet: (document.getElementById("othersSport_minbet_overUnder") as HTMLInputElement).value,
        //        maxBet: (document.getElementById("othersSport_maxbet_overUnder") as HTMLInputElement).value,
        //        maxBetMatch: (document.getElementById("othersSport_maxBetMatch_overUnder") as HTMLInputElement).value
        //    },
        //    {
        //        stortType: 'Others Sport',
        //        stortTypeId: 3,
        //        marketType: 'Others Match Type',
        //        marketTypeId: 0,
        //        minBet: (document.getElementById("othersSport_minbet_correctScore") as HTMLInputElement).value,
        //        maxBet: (document.getElementById("othersSport_maxbet_correctScore") as HTMLInputElement).value,
        //        maxBetMatch: (document.getElementById("othersSport_maxBetMatch_correctScore") as HTMLInputElement).value
        //    }
        //];

        //if (this.commonService.CheckVariable(model)) {
        //    this.toasterService.pop('error', 'Error', this.commonService.errorMessage.PleaseCheckRequestModel);
        //    return;
        //}
        //else {
        //    for (var i = 0; i < model.length; i++) {
        //        if (this.commonService.CheckVariable(model[i].maxBet)) {
        //            this.toasterService.pop('error', 'Error', this.commonService.errorMessage.PleaseEnterMaxBet);
        //            return;
        //        }

        //        if (this.commonService.CheckVariable(model[i].maxBetMatch)) {
        //            this.toasterService.pop('error', 'Error', this.commonService.errorMessage.PleaseEnterMaxBetMatch);
        //            return;
        //        }

        //        if (this.commonService.CheckVariable(model[i].minBet)) {
        //            this.toasterService.pop('error', 'Error', this.commonService.errorMessage.PleaseEnterMinBet);
        //            return;
        //        }
        //    }
        //}

        //#endregion Temp


        this.adminService.add<any>(customer.updateSBOPlayerDefaultBetLimit, model).subscribe(res => {
            this.toasterService.pop('success', 'Success', res.message);
            //this.GetData();
        }, error => {
            this.ngOnInit();
            this.toasterService.pop('error', 'Error', error.error.message);
        });

        console.log(model);
        console.log(JSON.stringify(model));
    }
}
import { Component, OnInit } from '@angular/core';

import { UserblockService } from './userblock.service';

@Component({
    selector: 'app-userblock',
    templateUrl: './userblock.component.html',
    styleUrls: ['./userblock.component.scss']
})
export class UserblockComponent implements OnInit {
    user: any;
    username: any;
    usertype: any;
    constructor(public userblockService: UserblockService) {
        this.user = {
            picture: 'assets/img/user/01.jpg'
        };
    }

    ngOnInit() {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.username = currentUser.username;
        this.usertype = currentUser.usertype;
    }

    userBlockIsVisible() {
        return this.userblockService.getVisibility();
    }
}
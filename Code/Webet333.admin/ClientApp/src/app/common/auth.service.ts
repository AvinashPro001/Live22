import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    token: string;
    constructor(private router: Router) { }
    isAuthenticate(url: string): boolean {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser !== null) {
            if (currentUser.token !== null && currentUser.token !== '') {
                if (url === '/') {
                    this.router.navigate(['admin/dashboard']);
                    return false;
                } else {
                    return true;
                }
            }
        } else {
            if (url !== '/') {
                this.router.navigate(['/']);
                return false;
            } else {
                return true;
            }
        }
    }
}

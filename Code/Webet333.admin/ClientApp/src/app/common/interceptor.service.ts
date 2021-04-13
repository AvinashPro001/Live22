import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/do';
import { Router } from '@angular/router';

import { AuthService } from './auth.service';
import { log } from 'util';
@Injectable()
export class InterceptorService implements HttpInterceptor {
    constructor(private router: Router, public auth: AuthService) {
    }
    request;
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.router.url == '/admin/dashboard') {
            history.pushState(null, null, '/admin/dashboard');
            window.onpopstate = function () {
                history.go(2);
            };
        }
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        // if (currentUser != null && currentUser.accesstoken !== '') {
        if (currentUser != null) {
            this.request = req.clone({
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + currentUser.access_token
                })
            });
        } else {
            this.request = req.clone({
                headers: new HttpHeaders({
                    'Content-Type': 'application/json'
                })
            });
        }

        return next.handle(this.request).do(event => {
            if (event instanceof HttpResponse) {
            }
        })
            .catch(err => {
                if (err.status === 401) {
                    this.router.navigate(['/']);
                    localStorage.removeItem('currentUser');
                }
                if (err.status === 403) {
                    this.router.navigate(['/maintenance']);
                }
                return Observable.throw(err);
            });
        // }

        //  return next.handle(req).do(
        //    (event: HttpEvent<any>) => {
        //     if (event instanceof HttpResponse) {
        //     }
        //    },
        //    (error: any) => {
        //      if (error instanceof HttpErrorResponse) {
        //        if (error.status === 401) {
        //         this.router.navigate(['/']);
        //        }
        //      }
        //    }
        //  );
    }
}
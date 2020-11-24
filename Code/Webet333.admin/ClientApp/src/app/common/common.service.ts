import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
@Injectable()
export class CommonService {
    authToken;
    options: HttpHeaders;

    constructor(private http: HttpClient, private router: Router) { }

    public add<T>(apiPath, data): Observable<T> {
        return this.http.post<T>(apiPath, data);
    }

    public addWithoutParam<T>(apiPath): Observable<T> {
        return this.http.post<T>(apiPath, '');
    }

    public get<T>(apiPath): Observable<T> {
        return this.http.get<T>(apiPath);
    }
}
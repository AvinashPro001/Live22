import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class AdminService {
    authToken;
    options: HttpHeaders;

    constructor(public http: HttpClient) {
    }

    formData(formData) {
        return Object.keys(formData).map(function (key) {
            return encodeURIComponent(key) + '=' + encodeURIComponent(formData[key]);
        }).join('&');
    }

    public add<T>(apiPath, data): Observable<T> {
        return this.http.post<T>(apiPath, data);
    }

    public addWithoutParam<T>(apiPath): Observable<T> {
        return this.http.post<T>(apiPath, '');
    }

    public getAll<T>(apiPath): Observable<T> {
        return this.http.get<T>(apiPath);
    }

    public get<T>(apiPath): Observable<T> {
        return this.http.get<T>(apiPath);
    }
}

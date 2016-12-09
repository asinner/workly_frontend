import { Injectable } from '@angular/core'
import { Http, Headers, RequestOptionsArgs, Response } from '@angular/http'
import { AuthStore } from '../stores/auth.store';
import { Observable } from 'rxjs/Rx';
import { AuthCookieService } from '../services/auth-cookie.service';

@Injectable()
export class XHttp {
    constructor(private http: Http, private authCookie: AuthCookieService) {
    }

    private optionsWithDefaultHeaders(options: RequestOptionsArgs = {}): RequestOptionsArgs {
        let userToken = this.authCookie.getUserToken()
        if (!userToken) return options;
        let accountToken = this.authCookie.getAccountToken();
        options.headers = options.headers || new Headers();
        options.headers.append('X-Authorization', userToken);
        if (accountToken) options.headers.append('X-Account-Authorization', accountToken);
        return options;
    }

    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        let opts = this.optionsWithDefaultHeaders(options);
        return this.http.get(url, opts)
    }

    post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        let opts = this.optionsWithDefaultHeaders(options);
        return this.http.post(url, body, opts)
    }

    put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        let opts = this.optionsWithDefaultHeaders(options);
        return this.http.put(url, body, opts)
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        let opts = this.optionsWithDefaultHeaders(options);
        return this.http.delete(url, opts)
    }
}
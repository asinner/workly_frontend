import { Injectable } from '@angular/core';
import { CookieService } from '../utils/cookie.service';

const userTokenKey = 'uat';
const accountTokenKey = 'aat';

@Injectable()
export class AuthCookieService{
    constructor(private cookie: CookieService) {}

    public setUserToken(token: string) {
        this.cookie.setItem(userTokenKey, token);        
    }

    public getUserToken() {
        return this.cookie.getItem(userTokenKey);
    }

    public deleteUserToken() {
        return this.cookie.removeItem(userTokenKey);
    }

    public setAccountToken(token: string) {
        this.cookie.setItem(accountTokenKey, token);        
    }

    public getAccountToken() {
        return this.cookie.getItem(accountTokenKey);
    }

    public deleteAccountToken() {
        return this.cookie.removeItem(accountTokenKey);
    }
}
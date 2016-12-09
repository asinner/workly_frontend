import { Injectable } from '@angular/core';
import { User } from '../data';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { ApiService } from '../services/api.service';
import { AuthStore } from '../stores/auth.store';


@Injectable()
export class ReverseAuthGuard implements CanActivate {
    constructor(private router: Router, private authStore: AuthStore) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean{
        if (this.authStore.hasUserToken()) {
            this.router.navigate(['/project/latest']);
            return false;
        }
        return true;
    }
}
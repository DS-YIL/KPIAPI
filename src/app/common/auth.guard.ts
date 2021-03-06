import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService } from '../pages/Login/Login.service';
//import { MprService } from '../services/mpr.service';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(private router: Router ,private usermanageService:LoginService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.usermanageService.currentUserValue;
       
        if (currentUser) {
            // authorised so return true
            return true;
        }
      

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/KPI/Login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}
import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import * as jwt_decode from 'jwt-decode';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        try {
            const decoded = jwt_decode(localStorage.getItem('token'));
            if(decoded) {
                return true
            }
        }
        catch(error) {
            this.router.navigate(['/']);
            
        }
    }
}
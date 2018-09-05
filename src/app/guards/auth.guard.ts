import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { AppState } from '../reducers';
import { isLoggedIn } from '../auth/auth.selectors';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private store: Store<AppState>) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        return this.store
                .pipe(
                    select(isLoggedIn),
                    tap(loggedIn => {
                        if(!loggedIn) {
                            this.router.navigateByUrl("/");
                        }
                    })
                )

    }
}
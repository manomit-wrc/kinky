import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError, pipe } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../services';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';
import { Logout } from '../auth/auth.actions';



@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
     constructor(
         private authenticationService: AuthenticationService,
         private store: Store<AppState>
        ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(request).pipe(catchError(err => {
            this.authenticationService.logout()
                .subscribe(user => {
                    if(user.code === 200) {
                        this.store.dispatch(new Logout());
                        window.location.href = "/";
                    }
                })
            const error = err.error.message || err.statusText;
            return throwError(error);
        }));

    }
}


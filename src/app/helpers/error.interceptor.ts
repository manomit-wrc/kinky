import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError, pipe } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
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

        return next.handle(request)
	    .pipe(
	        tap(event => {
	          if (event instanceof HttpResponse) {
	           // will do later
              }
              if(event instanceof HttpRequest) {
                // will do later
              }
	        }, error => {
                if(error.status === 401 || error.status === 403 || error.status === 500) {
                   localStorage.clear();
                   this.store.dispatch(new Logout());
                   window.location.href = "/";
                } 
	        })
	      )

       

    }
    
}


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    constructor(private http: HttpClient,  private router: Router) { }

    login(username: string, password: string) {
        return this.http.post<any>(`http://localhost:9000/api/users/login`, { username, password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                return user;
            }));
    }




    signup(username: string, password: string, email: string, dd: number, mm: number, yyyy: number, gender: string) {
        return this.http.post<any>(`http://localhost:9000/api/users/signup`, { username, password, email, dd, mm, yyyy, gender })
            .pipe(map(data => {
                return data;
            }));
    }
    forgot_password(email: string) {
        return this.http.post<any>(`http://localhost:9000/api/users/forgot-password`, { email })
            .pipe(map(data => {
                return data;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('token');
        window.location.href = '/';

    }

    alerts_update(alert_setting: string) {
       return this.http.post<any>(`http://localhost:9000/api/users/alert-update`, { alert_setting })
      .pipe(map(user => {
        return user;
      }));

    }
    profile_protect(profile_setting: string) {
      return this.http.post<any>(`http://localhost:9000/api/users/profile-protect-update`, { profile_setting })
      .pipe(map(user => {
        return user;
      }));
    }
    switch_account(switch_account: string) {
      return this.http.post<any>(`http://localhost:9000/api/users/switch-account-update`, { switch_account })
      .pipe(map(user => {
        return user;
      }));
    }
    delete_account(delete_account: any, other_delete_reason: any) {
      return this.http.post<any>(`http://localhost:9000/api/users/delete-account-update`, { delete_account, other_delete_reason })
      .pipe(map(user => {
        return user;
      }));
    }
    site_config_update(mobile: string , language: string, timezone: number) {
      return this.http.post<any>(`http://localhost:9000/api/users/site-config-update`, { mobile, language, timezone })
      .pipe(map(user => {
        return user;
      }));
    }

    introduction_update(preferred_introduction: string , own_introduction: string ) {
       return this.http.post<any>(`http://localhost:9000/api/users/introduction_update`, { preferred_introduction , own_introduction })
      .pipe(map(user => {
        return user;
      }));

    }

    user_details(): Observable<any> {
      return this.http.post<any>(`http://localhost:9000/api/users/user-settings`, {})
      .pipe(map(user => {
          return of(user); // create own observable
      }));
    }

    /* Api for change password */
    change_password(old_password: string , new_password: string) {
      return this.http.post<any>(`http://localhost:9000/api/users/change-password`, { old_password, new_password })
      .pipe(map(user => {
          // login successful if there's a jwt token in the response

          return user;
      }));

    }

    country() {
      return this.http.get<any>(`http://localhost:9000/api/users/Country`, {})
      .pipe(map(user => {
          // login successful if there's a jwt token in the response

          return user; //for country list
      }));

    }

    state(e: any) {
      return this.http.post<any>(`http://localhost:9000/api/users/State`, { e })
      .pipe(map(user => {
          // login successful if there's a jwt token in the response

          return user; //for state list
      }));

    }


 interest_update
 (gender: any, from_age: any, to_age: any, distance: any, country: any, state: any, contactmember: any, explicit_content: any) {
      return this.http.post<any>
      (`http://localhost:9000/api/users/interest-update`,
       { gender, from_age, to_age, distance, country, state, contactmember, explicit_content})
      .pipe(map(user => {
          // login successful if there's a jwt token in the response

          return user; //for interest update
      }));

    }

    checkActivation(link: any) {
      return this.http.post<any>(`http://localhost:9000/api/users/check-account`, { link })
        .pipe(map(data => {
          return data;
        }));
    }

    activateAccount(link: any) {
      return this.http.post<any>(`http://localhost:9000/api/users/activate-account`, { link })
        .pipe(map(data => {
          return data;
      }));
    }
    updateInstantMessage(instant_msg: any) {
      return this.http.post<any>(`http://localhost:9000/api/users/update-instant-message`, { instant_msg })
        .pipe(map(data => {
          return data;
        }))
    }


/* Check for password match*/
     MatchPassword(AC: AbstractControl) {
     const password = AC.get('password').value; // to get value in input tag
      const c_password = AC.get('c_password').value; // to get value in input tag
       if ( password != c_password ) {
           console.log('false');
           AC.get('c_password').setErrors( {MatchPassword: true} );
       } else {
           console.log('true');
           return null;
       }
   }

  }

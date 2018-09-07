import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';
import { Logout } from '../auth/auth.actions';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    constructor(private http: HttpClient,  private router: Router, private store: Store<AppState>) { }

    // login(username: string, password: string) {
    //     return this.http.post<any>(`http://localhost:9000/api/users/login`, { username, password })
    //         .pipe(map(user => {
    //             // login successful if there's a jwt token in the response
    //             return user;
    //         }));
    // }


    login(username:string, password:string): Observable<any> {
      return this.http.post<any>(`http://localhost:9000/api/users/login`, { username, password });
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
        this.store.dispatch(new Logout());
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
    personal_info_update(data) {
      return this.http.post<any>(`http://localhost:9000/api/users/personal-details-update`, {data});
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

      ethnicity() {
      return this.http.get<any>(`http://localhost:9000/api/users/Ethnicity`, {})
      .pipe(map(user => {
          // login successful if there's a jwt token in the response
          return user; //for country list
      }));

    }

      hair() {
      return this.http.get<any>(`http://localhost:9000/api/users/Hair`, {})
      .pipe(map(user => {
          // login successful if there's a jwt token in the response
          return user; //for country list
      }));

      }

      bodyhair() {
      return this.http.get<any>(`http://localhost:9000/api/users/BodyHair`, {})
      .pipe(map(user => {
          // login successful if there's a jwt token in the response
          return user; //for country list
      }));

      }

      build() {
      return this.http.get<any>(`http://localhost:9000/api/users/Build`, {})
      .pipe(map(user => {
          // login successful if there's a jwt token in the response
          return user; //for country list
      }));

      }
      height() {
      return this.http.get<any>(`http://localhost:9000/api/users/Height`, {})
      .pipe(map(user => {
          // login successful if there's a jwt token in the response
          return user; //for country list
      }));

    }


    loadMaster(): Observable<any> {
      return this.http.post<any>(`http://localhost:9000/api/users/load-masters`, { });
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

    updateAutoReplyEmail(auto_reply_subject: string, auto_reply_body: string, enable_auto_reply: boolean) {
      return this.http.post<any>(`http://localhost:9000/api/users/update-auto-reply-email`, { auto_reply_subject, auto_reply_body, enable_auto_reply })
        .pipe(map(data => {
          return data;
        }))
    }

    updatePromotion(promotion: string, promotion_chk: boolean) {
      return this.http.post<any>(`http://localhost:9000/api/users/update-promotion`, { promotion, promotion_chk })
        .pipe(map(data => {
          return data;
        }))

    }

    personal_details_save(headline:any, description:any){
      return this.http.post<any>(`http://localhost:9000/api/users/update-personal-headline`, { headline,description })
      
    }
    checkForgotPassword(link: string) {
      return this.http.post<any>(`http://localhost:9000/api/users/check-password-request`, { link })
        .pipe(map(data => {
          return data;
        }))
    }

    updateForgotPassword(password: string, link: string) {
      return this.http.post<any>(`http://localhost:9000/api/users/update-password-request`, { password, link })
        .pipe(map(data => {
          return data;
      }))
    }


/* Check for password match*/
     MatchPassword(AC: AbstractControl) {
     const password = AC.get('password').value; // to get value in input tag
      const c_password = AC.get('c_password').value; // to get value in input tag
       if ( password != c_password ) {
           
           AC.get('c_password').setErrors( {MatchPassword: true} );
       } else {
           
           return null;
       }
   }

  }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { environment } from '../../environments/environment'
import { AppState } from '../reducers';
import { Logout } from '../auth/auth.actions';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {


    apiUri = environment.apiUri;
    constructor(private http: HttpClient,  private router: Router, private store: Store<AppState>) { }

    // login(username: string, password: string) {
    //     return this.http.post<any>(`${this.apiUri}/login`, { username, password })
    //         .pipe(map(user => {
    //             // login successful if there's a jwt token in the response
    //             return user;
    //         }));
    // }


    login(username:string, password:string , ip:string): Observable<any> {

      return this.http.post<any>(`${this.apiUri}/login`, { username, password , ip});
    }

    getCurrentPosition(): Observable<any> {
      return this.http.get<any>('http://ip-api.com/json');
    }

    signup(username: string, password: string, email: string, dd: number, mm: number, yyyy: number, gender: string) {
        return this.http.post<any>(`${this.apiUri}/signup`, { username, password, email, dd, mm, yyyy, gender })
            .pipe(map(data => {
                return data;
            }));
    }
    forgot_password(email: string) {
        return this.http.post<any>(`${this.apiUri}/forgot-password`, { email })
            .pipe(map(data => {
                return data;
            }));
    }

    logout(): Observable<any> {
       return this.http.post<any>(`${this.apiUri}/logout`, {})
    }

    alerts_update(newsletter: any, message:any) {
       return this.http.post<any>(`${this.apiUri}/alert-update`, { newsletter , message })
      .pipe(map(user => {
        return user;
      }));

    }
    profile_protect(profile_setting: string) {
      return this.http.post<any>(`${this.apiUri}/profile-protect-update`, { profile_setting })
      .pipe(map(user => {
        return user;
      }));
    }
    switch_account(switch_account: string) {
      return this.http.post<any>(`${this.apiUri}/switch-account-update`, { switch_account })
      .pipe(map(user => {
        return user;
      }));
    }
    delete_account(delete_account: any, other_delete_reason: any) {
      return this.http.post<any>(`${this.apiUri}/delete-account-update`, { delete_account, other_delete_reason })
      .pipe(map(user => {
        return user;
      }));
    }
    site_config_update(mobile: string , language: string, timezone: number) {
      return this.http.post<any>(`${this.apiUri}/site-config-update`, { mobile, language, timezone })
      .pipe(map(user => {
        return user;
      }));
    }

    introduction_update(preferred_introduction: string , own_introduction: string ) {
       return this.http.post<any>(`${this.apiUri}/introduction_update`, { preferred_introduction , own_introduction })
      .pipe(map(user => {
        return user;
      }));

    }

    user_details(): Observable<any> {
      return this.http.post<any>(`${this.apiUri}/user-settings`, {})
      .pipe(map(user => {
          return of(user); // create own observable
      }));
    }
    personal_info_update(data) {
      return this.http.post<any>(`${this.apiUri}/personal-details-update`, {data});
    }

    /* Api for change password */
    change_password(old_password: string , new_password: string) {
      return this.http.post<any>(`${this.apiUri}/change-password`, { old_password, new_password })
      .pipe(map(user => {
          // login successful if there's a jwt token in the response

          return user;
      }));

    }

    country(): Observable<any> {
      return this.http.get<any>(`${this.apiUri}/Country`, {})

    }


    state(e: any) {
      return this.http.post<any>(`${this.apiUri}/State`, { e })
      .pipe(map(user => {
          // login successful if there's a jwt token in the response
          return user; //for state list
      }));

    }

      ethnicity() {
      return this.http.get<any>(`${this.apiUri}/Ethnicity`, {})
      .pipe(map(user => {
          // login successful if there's a jwt token in the response
          return user; //for country list
      }));

    }

      hair() {
      return this.http.get<any>(`${this.apiUri}/Hair`, {})
      .pipe(map(user => {
          // login successful if there's a jwt token in the response
          return user; //for country list
      }));

      }

      bodyhair() {
      return this.http.get<any>(`${this.apiUri}/BodyHair`, {})
      .pipe(map(user => {
          // login successful if there's a jwt token in the response
          return user; //for country list
      }));

      }

      build() {
      return this.http.get<any>(`${this.apiUri}/Build`, {})
      .pipe(map(user => {
          // login successful if there's a jwt token in the response
          return user; //for country list
      }));

      }
      height() {
      return this.http.get<any>(`${this.apiUri}/Height`, {})
      .pipe(map(user => {
          // login successful if there's a jwt token in the response
          return user; //for country list
      }));

    }


    loadMaster(): Observable<any> {
      return this.http.post<any>(`${this.apiUri}/load-masters`, { });
    }


 interest_update
 (looking_for_male:any,looking_for_female:any,looking_for_couple:any,looking_for_cd:any,from_age:any,to_age:any,distance:any,country:any,state:any,interest_match:any,live_country:any,explicit_content:any) {
      return this.http.post<any>
      (`${this.apiUri}/interest-update`,
       { looking_for_male,looking_for_female,looking_for_couple,looking_for_cd,from_age,to_age,distance,country,state,interest_match,live_country,explicit_content})
      .pipe(map(user => {
          // login successful if there's a jwt token in the response

          return user; //for interest update
      }));

    }

    checkActivation(link: any) {
      return this.http.post<any>(`${this.apiUri}/check-account`, { link })
        .pipe(map(data => {
          return data;
        }));
    }

    activateAccount(link: any) {
      return this.http.post<any>(`${this.apiUri}/activate-account`, { link })
        .pipe(map(data => {
          return data;
      }));
    }
    updateInstantMessage(instant_msg: any) {
      return this.http.post<any>(`${this.apiUri}/update-instant-message`, { instant_msg })
        .pipe(map(data => {
          return data;
        }))
    }

    updateAutoReplyEmail(auto_reply_subject: string, auto_reply_body: string, enable_auto_reply: boolean) {
      return this.http.post<any>(`${this.apiUri}/update-auto-reply-email`, { auto_reply_subject, auto_reply_body, enable_auto_reply })
        .pipe(map(data => {
          return data;
        }))
    }

    updatePromotion(promotion: string, promotion_chk: boolean) {
      return this.http.post<any>(`${this.apiUri}/update-promotion`, { promotion, promotion_chk })
        .pipe(map(data => {
          return data;
        }))

    }

    personal_details_save(headline:any, description:any){
      return this.http.post<any>(`${this.apiUri}/update-personal-headline`, { headline,description })

    }
    checkForgotPassword(link: string) {
      return this.http.post<any>(`${this.apiUri}/check-password-request`, { link })
        .pipe(map(data => {
          return data;
        }))
    }

    updateForgotPassword(password: string, link: string) {
      return this.http.post<any>(`${this.apiUri}/update-password-request`, { password, link })
        .pipe(map(data => {
          return data;
      }))
    }
    image_upload(imageArr: any) {
      return this.http.post<any>(`${this.apiUri}/image-upload`, { imageArr })
        .pipe(map(data => {
          return data;
      }));
    }

    fetch_online_users() {
      return this.http.post<any>(`${this.apiUri}/fetch-online-users`, {})
        .pipe(map(data => {
          return data;
      }));
    }

    verifyEmail(): Observable<any> {
      return this.http.post<any>(`${this.apiUri}/verify-email`, {});
    }

    loadLocation(): Observable<any> {
      return this.http.post<any>(`${this.apiUri}/load-location`, {});
    }

    loadCities(country: string): Observable<any> {
      return this.http.post<any>(`${this.apiUri}/load-cities`, { country })
    }
    onlineusers(): Observable<any> {
      return this.http.post<any>(`${this.apiUri}/count-online-user`, {})
    }
    friends_count(): Observable<any> {
      return this.http.post<any>(`${this.apiUri}/count_friend_list`, {})
    }

    uploadProfileImage(imageData: any): Observable<any> {
      return this.http.post<any>(`${this.apiUri}/upload-profile-image`, {imageData})
    }
    uploadProfileVideo(video_link: string, video_name: string): Observable<any> {
      return this.http.post<any>(`${this.apiUri}/upload-profile-video`, {video_link, video_name})
    }

    deleteImage(image: string): Observable<any> {
      return this.http.post<any>(`${this.apiUri}/delete-image`, {image});
    }

    moveToPrivate(imageUrl: string, access: string): Observable<any> {
      return this.http.post<any>(`${this.apiUri}/move-to-private`, {imageUrl, access});
    }
    setAsProfile(imageUrl: string): Observable<any> {
      return this.http.post<any>(`${this.apiUri}/set-as-profile`, {imageUrl});
    }
    changeImageDetails(imageUrl: string, access: string, altTag: string): Observable<any> {
      return this.http.post<any>(`${this.apiUri}/change-image-details`, {imageUrl, access, altTag});
    }

    post(post_description:string):Observable<any>{
      return this.http.post<any>(`${this.apiUri}/post_description`, {post_description});
    }
    post_list(post_description:string):Observable<any>{
      return this.http.post<any>(`${this.apiUri}/post_list`, {});
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

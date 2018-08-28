import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {AbstractControl } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {

    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
        return this.http.post<any>(`http://localhost:9000/api/users/login`, { username, password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('token', user.token);
                }

                return user;
            }));
    }

    signup(username: string, password: string, email: string, dd: number, mm: number, yyyy: number, gender: string) {
        return this.http.post<any>(`http://localhost:9000/api/users/signup`, { username, password, email, dd, mm, yyyy, gender })
            .pipe(map(data => {
                return data;
            }))
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('token');
    }

     MatchPassword(AC: AbstractControl) {
     let password = AC.get('password').value; // to get value in input tag
      let c_password = AC.get('c_password').value; // to get value in input tag
       if(password != c_password) {
           console.log('false');
           AC.get('c_password').setErrors( {MatchPassword: true} )
       } else {
           console.log('true');
           return null;
       }
   }
}

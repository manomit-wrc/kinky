import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { environment } from '../../environments/environment';
import { AppState } from '../reducers';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  apiUri = environment.apiUri;
  constructor(private http: HttpClient, private router: Router, private store: Store<AppState>) { }

  search_by_username(username) {
    return this.http.post<any>(`${this.apiUri}/search-by-username`, { username });
  }

  submit_quick_search(gender,looking_for,distance,country,state){
    return this.http.post<any>(`${this.apiUri}/submit-quick-search`, { gender,looking_for,distance,country,state });
  }

  userdetailsByid(id){
   return this.http.post<any>(`${this.apiUri}/userdetailsByid`, {id});
  }
  request_send(to_id){
   return this.http.post<any>(`${this.apiUri}/request_send`, {to_id});
  }
  fetchInvitation(){
   return this.http.post<any>(`${this.apiUri}/fetch-invetation`, {});
  }
}

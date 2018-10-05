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

  submit_quick_search(gender,looking_for_male,looking_for_female,looking_for_couple,looking_for_cd,distance,country,state){
    return this.http.post<any>(`${this.apiUri}/submit-quick-search`, { gender,looking_for_male,looking_for_female,looking_for_couple,looking_for_cd,distance,country,state });
  }
  submit_advance_search(gender,looking_for_male,looking_for_female,looking_for_couple,looking_for_cd,distance,country,state,ethnicity,smoke,safe_sex,size,build,from_age,to_age){
    return this.http.post<any>(`${this.apiUri}/submit-advance-search`, { gender,looking_for_male,looking_for_female,looking_for_couple,looking_for_cd,distance,country,state,ethnicity,smoke,safe_sex,size,build,from_age,to_age });
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
  show_invetation_list(){
   return this.http.post<any>(`${this.apiUri}/show_invetation_list`, {});
  }
  accept(from_id){
   return this.http.post<any>(`${this.apiUri}/accept`, {from_id});
  }
  reject(from_id){
   return this.http.post<any>(`${this.apiUri}/reject`, {from_id});
  }
  friend_list(){
    return this.http.post<any>(`${this.apiUri}/friend_list`, {});
  }
  friend_list_by_user(id){
    return this.http.post<any>(`${this.apiUri}/friend_list_by_user`, {id});
  }
  cancel_invetation(to_id){
    return this.http.post<any>(`${this.apiUri}/cancel_invetation`, {to_id});
  }
  friend_remove(to_id){
    return this.http.post<any>(`${this.apiUri}/friend_remove`, {to_id});
  }
  check_friends() {
    return this.http.get<any>(`${this.apiUri}/check_friends`, {});
  }
  similar_profile(to_id) {
    return this.http.post<any>(`${this.apiUri}/similar_profile`, {to_id});
  }
  saveTohotlist(hotlist, flag) {
    return this.http.post<any>(`${this.apiUri}/saveTohotlist`, {hotlist, flag});
  }
  hot_list() {
    return this.http.post<any>(`${this.apiUri}/hot_list`, {});
  }
  hot_list_by_user(id) {
    return this.http.post<any>(`${this.apiUri}/hot_list_by_user`, {id});
  }
}

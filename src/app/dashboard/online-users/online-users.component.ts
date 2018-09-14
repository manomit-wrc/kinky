import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services';
import { first, tap, debounceTime } from 'rxjs/operators';
import {noop, Subject, Observable} from "rxjs";
import { Store, select } from '@ngrx/store';
import { AppState } from '../../reducers';
import { userDetails, locationDetails } from '../../auth/auth.selectors';
import { Login } from '../../auth/auth.actions';
import { loadAllMasters } from '../dashboard.selectors';
@Component({
  selector: 'app-online-users',
  templateUrl: './online-users.component.html',
  styleUrls: ['./online-users.component.css']
})
export class OnlineUsersComponent implements OnInit {
users: any;
userFilter: any = { user: {gender: '', country: '', state: ''} };
data: any = {};
country: any;
state: any;
states: any;
countrys:any;
  constructor(
    private auth: AuthenticationService,
    private store: Store<AppState>
  ) { }

  ngOnInit() {

    this.store.pipe(
      select(loadAllMasters),
      tap(data => {
        if(data !== null) {
          this.countrys = data.countries;
        }

      })
    ).subscribe(noop);


    this.auth.fetch_online_users()
    .pipe(
      tap(data => {
    console.log(data);
    this.users = data.user;
      })
    ).subscribe(
      noop,
      () => alert('Failed')
    );


    this.store.pipe(
      select(locationDetails),
      tap(data => {
        if (this.data.country === undefined || this.data.state === undefined) {
          this.country = data.country;
          this.state = data.city;
        } else {
          this.country = this.data.country;
          this.state = this.data.state;
        }

        this.auth.loadCities(this.country)
          .pipe(
            tap(datas => {

              this.states = datas.cities;
            })
          ).subscribe(noop);
      })
    ).subscribe(noop);

  }

  onItemChange(e) {
    this.auth.loadCities(e.name)
      .pipe(
        tap(data => {
          this.state = data.cities[0];
          this.states = data.cities;
        })
      ).subscribe(noop)

  }

   getAge(DOB) {
    const today = new Date();
    const birthDate = new Date(DOB);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age = age - 1;
    }

    return age;
}

}


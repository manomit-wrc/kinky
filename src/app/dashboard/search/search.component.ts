import { Component, OnInit,Input } from '@angular/core';
import {SearchService} from '../../services/search.service';
import { first, tap } from 'rxjs/operators';
import { Observable, noop, BehaviorSubject, pipe } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../reducers';
import { locationDetails } from '../../auth/auth.selectors';
import { loadAllMasters } from '../dashboard.selectors';
import { AuthenticationService } from '../../services';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  tab: String = 'tab1';
  @Input() userObj: any ;
  username: any;
  distance_range: any = [];
  distance:any =  1;
  gender:any;
  show_profile:any;
  looking_for:any;
  count:any;
  st:any;
  states:any;
  country:any;
  state:any;
  constructor(private auth: AuthenticationService,public search: SearchService,private store: Store<AppState>) { }

  ngOnInit() {
    for (let i = 1; i <=  100; i++) {
      this.distance_range.push(i);
    }

     this.store.pipe(
      select(locationDetails),
      tap(data => {

        if(this.userObj === undefined || this.userObj.country === undefined || this.userObj.state === undefined) {

          this.count = data.country;
          this.st = data.city;
        } else {
          this.count = this.userObj.country;
          this.st = this.userObj.state;
        }

        this.auth.loadCities(this.count)
          .pipe(
            tap(data => {

              this.states = data.cities;
            })
          ).subscribe(noop)
      })
    ).subscribe(noop);

    this.store.select(loadAllMasters)
    .subscribe(masters => {
      if(masters !== null) {
        this.country = masters.countries;
        this.state = masters.states;
      }

    })
  }

  onItemChange(e) {

    this.auth.loadCities(e.name)
      .pipe(
        tap(data => {
          this.st = data.cities[0];
          this.states = data.cities;
        })
  ).subscribe(noop)
  }

  displayTab(value) {
    this.tab = value;
  }

   submit_quick_search(){
          this.search.submit_quick_search(this.gender,this.looking_for,this.show_profile,this.distance,this.count,this.st)
      .pipe(
        tap(data => {

        })
      ).subscribe(noop);

    }


  submit_username() {

    this.search.search_by_username(this.username)
    .pipe(
      tap(data => {

      })
    ).subscribe(noop);
      }

}

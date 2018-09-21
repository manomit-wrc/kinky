import { Component, OnInit,Input } from '@angular/core';
import {SearchService} from '../../services/search.service';
import { first, tap } from 'rxjs/operators';
import { Observable, noop, BehaviorSubject, pipe } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../reducers';
import { locationDetails } from '../../auth/auth.selectors';
import { loadAllMasters } from '../dashboard.selectors';
import { AuthenticationService } from '../../services';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
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
  distance:any =  '10';
  gender:any;
  show_profile:any;
  looking_for:any;
  show__user:any = false;
  count:any;
  st:any;
  states:any;
  country:any;
  state:any;
  results:any=[];
  status:any = 2;
  constructor(private router: Router,private auth: AuthenticationService,public search: SearchService,private store: Store<AppState>,private toastr: ToastrService) {
  }

  submit_username() {

    if(this.username != undefined){
      this.search.search_by_username(this.username)
      .pipe(
        tap(data => {
          this.results = data.info;
          if(data.code != 200){
            this.toastr.error("user not find");
          }else{
            this.results = data.info;

          }
        })
      ).subscribe(noop);
    }else{
      this.toastr.error("Please select a username");
    }


      }


  ngOnInit() {
    for (let i = 1; i <=  100; i++) {
      this.distance_range.push(i);
    }

    this.distance_range  = [{level:'Upto 10 Miles',value:'10'},{level:'Upto 30 Miles',value:'30'},{level:'Upto 50 Miles',value:'50'},{level:'Upto 70 Miles',value:'70'},{level:'Upto 90 Miles',value:'90'},{level:'Upto 100 Miles',value:'100'},{level:'100+',value:'101'}]

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

          this.search.submit_quick_search(this.gender,this.looking_for,this.distance,this.count,this.st)
      .pipe(
        tap(data => {



        })
      ).subscribe(noop);

    }

    goToTimeline(id){

    window.location.href = `/user-timeline/${id}`;

}

request_send(to_id){
  this.search.request_send(to_id)
  .pipe(
    tap(data => {

      if(data.code!=200){
        this.toastr.error("Something went wrong");
      }else{
        this.status = data.status;
        this.toastr.success(data.info);
      }


    })
  ).subscribe(noop);
}


      getAge(DOB) {
        var today = new Date();
        var birthDate = new Date(DOB);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age = age - 1;
        }

        return age;
    }

}

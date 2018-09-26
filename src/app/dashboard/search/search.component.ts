import { Component, OnInit,Input, Renderer } from '@angular/core';
import {SearchService} from '../../services/search.service';
import { first, tap } from 'rxjs/operators';
import { Observable, noop, BehaviorSubject, pipe } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../reducers';
import { locationDetails, userDetails } from '../../auth/auth.selectors';
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
  builds: any;
  from_age: any = 18;
  to_age: any= 35;
  ethnicity: any;
  build: any;
  smoke:any="No";
  safe_sex:any ="Never";
  size:any="Small";
  age_range:any=[];
  ethnicities: any;
  show_profile:any;
  looking_for_male:any = false;
  looking_for_female:any = false;
  looking_for_couple:any = false;
  looking_for_cd:any = false;
  show__user:any = false;
  count:any;
  st:any;
  states:any;
  country:any;
  state:any;
  results:any=[];
  status:any = 2;
  loading:any = false;
  quick:any = false;
  constructor(private router: Router,private auth: AuthenticationService,public search: SearchService,private store: Store<AppState>,private toastr: ToastrService, private renderer: Renderer) {
  }

  submit_username() {

    if(this.username != undefined){
      this.search.search_by_username(this.username)
      .pipe(
        tap(data => {
          if(data.code != 200){
            this.toastr.error("user not find");
          }else{
            this.quick= true;
            this.results = data.info;
            console.log(this.results);
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

    for (let i = 18; i <=  55; i++) {
      this.age_range.push(i);
    }

    this.distance_range  = [{level:'Upto 10 Miles',value:'10'},{level:'Upto 30 Miles',value:'30'},{level:'Upto 50 Miles',value:'50'},{level:'Upto 70 Miles',value:'70'},{level:'Upto 90 Miles',value:'90'},{level:'Upto 100 Miles',value:'100'},{level:'100+',value:'101'}]
    
     this.store.pipe(
       select(userDetails),
       tap(user => {
          this.gender = user.gender;
       })
     ).subscribe(noop);

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
        this.builds = masters.build;
        this.ethnicities = masters.ethnicity;
      }

    })
  }

  advance_search(){

    this.loading = true;
    this.search.submit_advance_search(this.gender,this.looking_for_male,this.looking_for_female,this.looking_for_couple,this.looking_for_cd,this.distance,this.count,this.st,this.ethnicity,this.smoke,this.safe_sex,this.size,this.build,this.from_age,this.to_age)
      .pipe(
        tap(data => {
          this.loading = false;
          if(data.code != 200){
            this.toastr.error("user not find");
            this.results = [];
          }else{
            this.quick= true;
            this.results = data.info;
            

          }

        })
      ).subscribe(noop);
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
      this.loading = true;

     this.search.submit_quick_search(this.gender,this.looking_for_male,this.looking_for_female,this.looking_for_couple,this.looking_for_cd,this.distance,this.count,this.st)
      .pipe(
        tap(data => {
          this.loading = false;
          if(data.code != 200){
            this.toastr.error("user not find");
            this.results = [];
          }else{
            this.quick= true;
            this.results = data.info;

          }

        })
      ).subscribe(noop);

    }

request_send(event,  to_id){
  
  let target = event.currentTarget;
  //console.log(target.classList.remove('friends-plus-icon'));
  //console.log(target);
  //console.log(target.childNodes[0].classList)
  if(target.className === "friends-plus-icon") {
    this.search.request_send(to_id)
    .pipe(
      tap(data => {

        if(data.code!=200){
          this.toastr.error("Something went wrong");
        }else{
          
          this.toastr.success(data.info);
          target.classList.remove('friends-plus-icon');
          target.childNodes[0].classList.remove('fa-plus');
          this.renderer.setElementClass(target, 'friends-cross-icon', true);
          this.renderer.setElementClass(target.childNodes[0], 'fa-close', true);
        }


      })
    ).subscribe(noop);
  }
  else {
    this.search.friend_remove(to_id)
      .pipe(
        tap(data => {
          this.toastr.success(data.msg);
          target.classList.remove('friends-cross-icon');
          target.childNodes[0].classList.remove('fa-close');
          this.renderer.setElementClass(target, 'friends-plus-icon', true);
          this.renderer.setElementClass(target.childNodes[0], 'fa-plus', true);
        })
      ).subscribe(noop)
  }
  
}


      getAge(DOB) {
        
        var today = new Date();
        var birthDate = new Date(DOB);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age = age - 1;
        }
        if(isNaN(age)) {
          return "N/A"
        }
        else {
          return age;
        }
        
    }

}

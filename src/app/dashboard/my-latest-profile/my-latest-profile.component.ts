import { Component, OnInit, Renderer } from '@angular/core';
import { AuthenticationService } from '../../services';
import { first, tap, debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable, noop } from 'rxjs';
import { Subject } from 'rxjs';

import { Store, select } from '@ngrx/store';
import { AppState } from '../../reducers';
import { userDetails } from '../../auth/auth.selectors';
import { Login } from '../../auth/auth.actions';
import { loadAllMasters } from '../dashboard.selectors';
@Component({
  selector: 'app-my-latest-profile',
  templateUrl: './my-latest-profile.component.html',
  styleUrls: ['./my-latest-profile.component.css']
})
export class MyLatestProfileComponent implements OnInit {

  private _success = new Subject<string>();
  successMessage: string;
  tab: String = 'tab1';
  gender: any;
  data: any = {};
  count: any;
  st: any;
  states: any;
  countrys: any;
  country: any;
  state: any;
  looking_for: any;
  dd: any;
  mm: any;
  yyyy: any;
  timezone: any;
  timezones: any;
  ethnicities: any;
  haircolors: any;
  bodyhairs: any;
  builds: any;
  heights: any;
  drink: any = 'NEVER';
  drugs: any = 'NONE';
  smoke: any = 'NO';
  cock_breast: any = 'SMALL';
  safesex: any = 'ALWAYS';
  body_deco: any = 'EARNINGS';
  sexuality: any = 'STRAIGHT';
  travel: any = 'CANACCOMMODATE';
  here: any = 'HAVEFUN';
  headline: any = '';
  personal_details: any = '';
  ethnicity: any;
  height: any;
  build: any;
  hair: any;
  build_hair: any;
  day: any = [];
  month: any = [];
  year: any = [];
  interested_arr: any = [];
  bodydecoration_arr: any = [];
  looking_for_arr: any = [];
  travel_arr: any = [];
  people_aged_arr: any = [];
  testArr: any = [];
  testArr1: any = [];
  testArr2: any = [];
  testArr3: any = [];
  testArr4: any = [];
  interested_arr_list: any= [];
  age_range_list: any= [];
  loading: any = false;
  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private renderer: Renderer,
    private store: Store<AppState>
  ) { }

  ngOnInit() {

    this.store.pipe(
      select(loadAllMasters),
      tap(data => {
        
        this.countrys = data.countries;
        this.timezones = data.timezones;
        this.ethnicities = data.ethnicity;
        this.haircolors = data.hair;
        this.bodyhairs = data.body_hairs;
        this.builds = data.build;
        this.heights = data.height;
        this.states = data.states;

      })
    ).subscribe(noop);

    

    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(3000)
    ).subscribe(() => this.successMessage = null)

    this.day = [

    '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17',
     '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'
    ];

    this.month = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

    for (let i = 1970; i <=  new Date().getFullYear(); i++) {
      this.year.push(i);
    }
    this.interested_arr = ['#BBW', '#BDSM', '#Bi-Sexual', '#Cougar', '#Couples', '#Cross Dresser', '#Discreet Meets',
    '#Dogging', '#Friendship', '#Gay', '#Group Meets', '#Hookups', '#Lesbian', '#Lingerie', '#Long Term Regular Meets',
    '#Long Term Relationship', '#Mature', '#MILF', '#Online Chat', '#Tatto', '#Threesomes', '#Trans', '#Webcam'];

    this.bodydecoration_arr = ['Earrings','Nose rings','Body piercing','Intimate Piercing','Tattoos','Prefer not to say'];

    this.people_aged_arr = ['#18 - 30', '#30 - 40', '#40 - 50', '#50 - 60', '#60 +'];

    this.looking_for_arr = ['Male','Female','Couple','CD / TV / TS'];

    this.travel_arr = ['Can accommodate','Will travel'];

    this.store.pipe(
      select(userDetails),
      tap(response => {
        if(response !== undefined) {
          
          this.headline = response.headline;
          this.personal_details = response.description;
          this.data = response;
          this.country = response.country !== undefined ? response.country : '';
          this.state = response.state !== undefined ? response.state : '';
          this.testArr = response.interested_in;
          this.testArr2 = response.age_range;
          this.testArr1 = response.body_decoration;
          this.testArr3 = response.looking_for;
          this.testArr4 = response.travel_arrangment;
        }

      })
    ).subscribe(
      noop
    )
  }

  displayTab(value) {
    this.tab = value;
  }

  onItemChange(e) {
    this.auth.state(e)
    .pipe(first())
    .subscribe(data => {
    this.states = data.data;


    });
  }

  personal_details_update (data) {
    this.loading = true;
    data['interested_in'] = this.testArr;
    data['age_range'] = this.testArr2;
    data['looking_for'] = this.testArr3;
    data['body_decoration'] = this.testArr1;
    data['travel_arrangment'] = this.testArr4;
    data['country'] = this.country;
    data['state'] = this.state;

  console.log(data.country, data.state);
  this.auth.personal_info_update(data)
    .pipe(
      tap(data => {
        this.loading = false;
        const info = data.info;
        this.store.dispatch(new Login({ info}))
        window.scrollTo(0,0);
        this._success.next('Information updated successfully');

      })
    )
    .subscribe(
      noop
    );
  }

  submit_personal(headline,personal_details) {
    this.loading = true;
    if (headline != "" && personal_details != "") {
       this.auth.personal_details_save(headline,personal_details)
    .pipe(
      tap(data => {
        this.loading = false;
        const info = data.info;
        this.store.dispatch(new Login({ info}))
        window.scrollTo(0,0);
        this._success.next('Information updated successfully');

      })
    )
    .subscribe(
      noop
    );
    } else {
      this.loading = false;
      //this.alerts.setMessage('Please fill the details!', 'error');
    }
  }

  setClassbody(event) {
    var target = event.currentTarget;

    if(target.parentElement.className.indexOf("detail-active") === -1) {

     this.testArr1.push(event.target.textContent);

      this.renderer.setElementClass(target.parentElement,"detail-active",true);
    }
    else {

     var index = this.testArr1.indexOf(event.target.textContent);

     if (index > -1) {
        this.testArr1.splice(index, 1);
     }
      target.parentElement.classList.remove("detail-active");
    }

  }

  setClass(event) {
    var target = event.currentTarget;

    if(target.parentElement.className.indexOf("detail-active") === -1) {

     this.testArr.push(event.target.textContent);

      this.renderer.setElementClass(target.parentElement,"detail-active",true);
    }
    else {

     var index = this.testArr.indexOf(event.target.textContent);

     if (index > -1) {
        this.testArr.splice(index, 1);
     }
      target.parentElement.classList.remove("detail-active");
    }

  }

  setClassAged(event) {
    var target = event.currentTarget;

    if(target.parentElement.className.indexOf("detail-active") === -1) {
      this.testArr2.push(event.target.textContent);
      this.renderer.setElementClass(target.parentElement,"detail-active",true);
    }
    else {
      var index = this.testArr2.indexOf(event.target.textContent);

      if (index > -1) {
         this.testArr2.splice(index, 1);
      }
      target.parentElement.classList.remove("detail-active");
    }
  }

  setClasslookingfor(event) {
    var target = event.currentTarget;

    if(target.parentElement.className.indexOf("detail-active") === -1) {
      this.testArr3.push(event.target.textContent);
      this.renderer.setElementClass(target.parentElement,"detail-active",true);
    }
    else {
      var index = this.testArr3.indexOf(event.target.textContent);

      if (index > -1) {
         this.testArr3.splice(index, 1);
      }
      target.parentElement.classList.remove("detail-active");
    }
  }

  setClasstravel(event) {
    var target = event.currentTarget;

    if(target.parentElement.className.indexOf("detail-active") === -1) {
      this.testArr4.push(event.target.textContent);
      this.renderer.setElementClass(target.parentElement,"detail-active",true);
    }
    else {
      var index = this.testArr4.indexOf(event.target.textContent);

      if (index > -1) {
         this.testArr4.splice(index, 1);
      }
      target.parentElement.classList.remove("detail-active");
    }
  }


}

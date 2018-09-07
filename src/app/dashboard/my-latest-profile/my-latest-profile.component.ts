import { Component, OnInit, Renderer } from '@angular/core';
import { AuthenticationService } from '../../services';
import { first, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable, noop } from 'rxjs';
import { AlertsService } from 'angular-alert-module';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../reducers';
import { userDetails } from '../../auth/auth.selectors';
import { Login } from '../../auth/auth.actions';
@Component({
  selector: 'app-my-latest-profile',
  templateUrl: './my-latest-profile.component.html',
  styleUrls: ['./my-latest-profile.component.css']
})
export class MyLatestProfileComponent implements OnInit {
  tab: String = 'tab1';
  gender: any;
  data: any = {};
  count: any;
  st: any;
  states: any;
  countrys: any;
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
  people_aged_arr: any = [];
  testArr: any = [];
  testArr2: any = [];
  interested_arr_list: any= [];
  age_range_list: any= [];
  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private alerts:AlertsService,
    private renderer: Renderer,
    private store: Store<AppState>
  ) { }

  ngOnInit() {

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

    this.people_aged_arr = ['#18 - 30', '#30 - 40', '#40 - 50', '#50 - 60', '#60 +'];

    this.store.pipe(
      select(userDetails),
      tap(response => {
        if(response !== undefined) {
          
          this.headline = response.headline;
          this.personal_details = response.description;
          this.data = response;
          this.testArr = response.interested_in;
          this.testArr2 = response.age_range;
        }
        
      })
    ).subscribe(
      noop
    )

    this.auth.user_details()
    .pipe(first())
    .subscribe(data => {
      this.timezones = data.value.timezones;
    });

    this.auth.country()
    .pipe(first())
    .subscribe(data => {
    
    this.countrys = data.data;
    this.count = (this.count) ? this.count : data.data[0]._id;
    this.auth.state(data.data[0]._id)
    .pipe(first())
    .subscribe(datas => {
    this.states = datas.data;
    this.st = (this.st) ? this.st : datas.data[0]._id;

    });

    });

      this.auth.ethnicity()
    .pipe(first())
    .subscribe(data => {
    this.ethnicities = data.data;


    });
      this.auth.hair()
    .pipe(first())
    .subscribe(data => {
    this.haircolors = data.data;


    });
      this.auth.bodyhair()
    .pipe(first())
    .subscribe(data => {
    this.bodyhairs = data.data;


    });
      this.auth.build()
    .pipe(first())
    .subscribe(data => {
    this.builds = data.data;


    });
      this.auth.height()
    .pipe(first())
    .subscribe(data => {
    this.heights = data.data;


    });

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
    data['interested_in'] = this.testArr;
    data['age_range'] = this.testArr2;

  this.auth.personal_info_update(data)
    .pipe(
      tap(data => {
        const info = data.info;
        this.store.dispatch(new Login({ info}))
        window.scrollTo(0,0);
        this.alerts.setMessage('Updated Successfull!', 'success');
      })
    )
    .subscribe(
      noop
    );
  }

  submit_personal(headline,personal_details) {
    if (headline != "" && personal_details != "") {
       this.auth.personal_details_save(headline,personal_details)
    .pipe(
      tap(data => {
        const info = data.info;
        this.store.dispatch(new Login({ info}))
        window.scrollTo(0,0);
        this.alerts.setMessage('Updated Successfull!', 'success');
      })
    )
    .subscribe(
      noop
    );
    } else {
      this.alerts.setMessage('Please fill the details!', 'error');
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


}

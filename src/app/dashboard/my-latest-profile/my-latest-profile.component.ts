import { Component, OnInit, Renderer } from '@angular/core';
import { AuthenticationService } from '../../services';
import { first, tap, debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable, noop } from 'rxjs';
import { Subject } from 'rxjs';

import { Store, select } from '@ngrx/store';
import { AppState } from '../../reducers';
import { userDetails, locationDetails,settingDetails } from '../../auth/auth.selectors';
import { Login, Settings } from '../../auth/auth.actions';
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
  data: any;
  count: any;
  st: any;
  states: any = [];
  countrys: any;
  country: any;
  state: any;
  looking_for: any;
  dd: any;
  mm: any;
  yyyy: any;
  dd_female: any;
  mm_female: any;
  yyyy_female: any;
  timezone: any;
  timezones: any;
  ethnicities: any;
  haircolors: any;
  bodyhairs: any;
  builds: any;
  heights: any;
  drink: any = 'I will tell you later';
  drink_female: any = 'I will tell you later';
  drugs: any = 'None';
  drugs_female: any = 'None';
  smoke: any = 'I will tell you later';
  smoke_female: any = 'I will tell you later';
  size: any = 'Prefer not to say';
  size_female: any = 'Prefer not to say';
  safe_sex: any = 'Always';
  safe_sex_female: any = 'Always';
  body_deco: any = 'Earrings';
  sexuality: any = 'Straight';
  sexuality_female: any = 'Straight';
  travel: any = 'Can accommodate';
  here: any = 'Have fun';
  headline: any = '';
  personal_details: any = '';
  ethnicity: any;
  ethnicity_female: any;
  height: any;
  height_female: any;
  build: any;
  build_female: any;
  hair: any;
  hair_female: any;
  build_hair: any;
  build_hair_female: any;
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
  testArr5: any = [];
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
        if(data !== null) {
          this.countrys = data.countries;
          this.timezones = data.timezones;
          this.ethnicities = data.ethnicity;
          this.haircolors = data.hair;
          this.bodyhairs = data.body_hairs;
          this.builds = data.build;
          this.heights = data.height;
        }


      })
    ).subscribe(noop);



    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(3000)
    ).subscribe(() => this.successMessage = null)

    for(let i=1; i<=31; i++) {
      const m = i <= 9 ? `0${i}`: i;
      this.day.push({
        label:m,
        value: i
      });
    }

    for(let i = 1; i <= 12; i++) {
      const m = i <= 9 ? `0${i}`: i;
      this.month.push({
        label:m,
        value: i
      });
    }

    for (let i = 1970; i <=  new Date().getFullYear(); i++) {
      this.year.push(i);
    }
    this.interested_arr = ['#BBW', '#BDSM', '#Bi-Sexual', '#Cougar', '#Couples', '#Cross Dresser', '#Discreet Meets',
    '#Dogging', '#Friendship', '#Gay', '#Group Meets', '#Hookups', '#Lesbian', '#Lingerie', '#Long Term Regular Meets',
    '#Long Term Relationship', '#Mature', '#MILF', '#Online Chat', '#Tatto', '#Threesomes', '#Trans', '#Webcam'];

    this.bodydecoration_arr = ['Earrings','Nose rings','Body piercing','Intimate Piercing','Tattoos','Prefer not to say'];

    this.people_aged_arr = ['#18 - 30', '#30 - 40', '#40 - 50', '#50 - 60', '#60 +'];

   // this.looking_for_arr = ['Male','Female','Couple','CD / TV / TS'];

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
          //this.testArr3 = response.looking_for;
          this.testArr4 = response.travel_arrangment;
          this.testArr5 = response.body_decoration_female;
          this.drink = response.drink !== "" ? response.drink : this.drink;
          this.smoke = response.smoke !== "" ? response.smoke: this.smoke;
          this.drugs = response.drugs !== "" ? response.drugs: this.drugs;
          this.size = response.size !== "" ? response.size: this.size;
          this.safe_sex =  response.safe_sex !== "" ? response.safe_sex: this.safe_sex;

          this.drink_female = response.drink_female !== "" ? response.drink_female : this.drink_female;
          this.smoke_female = response.smoke_female !== "" ? response.smoke_female: this.smoke_female;
          this.drugs_female = response.drugs_female !== "" ? response.drugs_female: this.drugs_female;
          this.size_female = response.size_female !== "" ? response.size_female: this.size_female;
          this.safe_sex_female =  response.safe_sex_female !== "" ? response.safe_sex_female: this.safe_sex_female;
        }

      })
    ).subscribe(
      noop
    );

    this.store.pipe(
      select(settingDetails),
      tap(response => {
        if(response !== undefined && response !== null) {
          
          this.data.looking_for_male = response.looking_for_male !== null ? response.looking_for_male : false;
          this.data.looking_for_female = response.looking_for_female !== null ? response.looking_for_female : false;
          this.data.looking_for_couple = response.looking_for_couple !== null ? response.looking_for_couple : false;
          this.data.looking_for_cd = response.looking_for_cd !== null ? response.looking_for_cd :  false;
        }

      })
    ).subscribe(
      noop
    );


    this.store.pipe(
      select(locationDetails),
      tap(data => {
        if(this.data.country === undefined || this.data.state === undefined) {
          this.country = data.country;
          this.state = data.city;
        }
        else {
          this.country = this.data.country;
          this.state = this.data.state;
        }

        this.auth.loadCities(this.country)
          .pipe(
            tap(data => {

              this.states = data.cities;
            })
          ).subscribe(noop)
      })
    ).subscribe(noop);


  }

  displayTab(value) {
    this.tab = value;
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

  personal_details_update (data) {
 this.loading = true;
    data['interested_in'] = this.testArr;
    data['age_range'] = this.testArr2;
    data['looking_for'] = this.testArr3;
    data['body_decoration'] = this.testArr1;
    data['body_decoration_female'] = this.testArr5;
    data['travel_arrangment'] = this.testArr4;
    data['country'] = this.country;
    data['state'] = this.state;
    data['drink'] = this.drink;
    data['smoke'] = this.smoke;
    data['drugs'] = this.drugs;
    data['size'] = this.size;
    data['safe_sex'] = this.safe_sex;

    data['drink_female'] = this.drink_female;
    data['smoke_female'] = this.smoke_female;
    data['drugs_female'] = this.drugs_female;
    data['size_female'] = this.size_female;
    data['safe_sex_female'] = this.safe_sex_female;

  this.auth.personal_info_update(data)
    .pipe(
      tap(data => {
        this.loading = false;
        const info = data.info;
        const settings = data.settings;
        this.store.dispatch(new Login({ info}))
        this.store.dispatch(new Settings({ settings}))
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
  setClassbodyfemale(event) {
    var target = event.currentTarget;

    if(target.parentElement.className.indexOf("detail-active") === -1) {

     this.testArr5.push(event.target.textContent);

      this.renderer.setElementClass(target.parentElement,"detail-active",true);
    }
    else {

     var index = this.testArr5.indexOf(event.target.textContent);

     if (index > -1) {
        this.testArr5.splice(index, 1);
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

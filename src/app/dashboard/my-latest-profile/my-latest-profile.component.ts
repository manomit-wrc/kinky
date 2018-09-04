import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertsService } from 'angular-alert-module';
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
  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private alerts:AlertsService
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

    this.auth.user_details()
    .pipe(first())
    .subscribe(data => {
/*       this.gender = data.value.user.gender !== undefined ? data.value.user.gender : '';
      this.count = data.value.user.country;
      this.st = data.value.user.state;
      this.looking_for = data.value.user.gender;
      this.dd = data.value.user.dd;
      this.mm = data.value.user.mm;
      this.yyyy = data.value.user.yyyy;
      this.timezone = data.value.user.timezone;
      this.timezones = data.value.timezones; */

      this.data = data.value.user;
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
  this.auth.personal_info_update(data)
    .pipe(first())
    .subscribe(data => {
      this.alerts.setMessage('Updated Successfull!', 'success');

    });
  }

  submit_personal(headline,personal_details) {
    if (headline != "" && personal_details != "") {
       this.auth.personal_details_save(headline,personal_details)
    .pipe(first())
    .subscribe(data => {
      this.alerts.setMessage('Updated Successfull!', 'success');

    });
    } else {
      this.alerts.setMessage('Please fill the details!', 'error');
    }
  }

}

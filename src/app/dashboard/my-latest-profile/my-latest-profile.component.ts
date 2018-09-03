import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-my-latest-profile',
  templateUrl: './my-latest-profile.component.html',
  styleUrls: ['./my-latest-profile.component.css']
})
export class MyLatestProfileComponent implements OnInit {
  tab: String = 'tab1';
  gender: any;
  count: any;
  st: any;
  state: any;
  country: any;
  looking_for: any;
  dd: any;
  mm: any;
  yyyy: any;
  timezone: any;
  timezones: any;

  constructor(
    private auth: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.auth.user_details()
    .pipe(first())
    .subscribe(data => {
      this.gender = data.value.info.gender !== undefined ? data.value.info.gender : '';
      this.count = data.value.info.country;
      this.st = data.value.info.state;
      this.looking_for = data.value.user.gender;
      this.dd = data.value.user.dd;
      this.mm = data.value.user.mm;
      this.yyyy = data.value.user.yyyy;
      this.timezone = data.value.info.timezone;
      this.timezones = data.value.timezones;
    });

    this.auth.country()
    .pipe(first())
    .subscribe(data => {
    this.country = data.data;
    this.count = (this.count) ? this.count : data.data[0]._id;
    this.auth.state(data.data[0]._id)
    .pipe(first())
    .subscribe(datas => {
    this.state = datas.data;
    this.st = (this.st) ? this.st : datas.data[0]._id;

    });

    });

  }

  displayTab(value) {
    this.tab = value;
  }

  onItemChange(e) {
    this.auth.state(e)
    .pipe(first())
    .subscribe(data => {
    this.state = data.data;


    });
  }

}

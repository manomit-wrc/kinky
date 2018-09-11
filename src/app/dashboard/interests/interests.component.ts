import {Component, OnInit, Input,Renderer} from '@angular/core';
import { AuthenticationService } from '../../services';
import { first, debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { loadAllMasters } from '../dashboard.selectors';
import { Subject } from 'rxjs';
import { Settings } from '../../auth/auth.actions';

@Component({
  selector: 'app-interests',
  templateUrl: './interests.component.html',
  styleUrls: ['./interests.component.css']
})
export class InterestsComponent implements OnInit {
  private _success = new Subject<string>();
  private _error = new Subject<string>();
  @Input() userObj: any ;
  gender: any; from_age: any; to_age: any; count: any;
  st: any; contactmember: any; explicit_content: any =false;
  country: any;
  state: any;
  successMessage: string;
  errorMessage: string;
  testArr:any =[];
  testArr1:any =[];
  looking_for_arr:any =[];
  members_arr:any =[];
  loading: any = false;
  age_range:any =[];
  distance_range:any=[];
  distance:any = 10;
  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private store: Store<AppState>,
    private renderer: Renderer,
    ) { }

  ngOnInit() {

    this._error.subscribe((message) => this.errorMessage = message);
    this._error.pipe(
      debounceTime(2000)
    ).subscribe(() => this.errorMessage = null);


    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(4000)
    ).subscribe(() => this.successMessage = null)

    if(this.userObj !== undefined) {

      this.testArr = this.userObj.gender;
      this.from_age = this.userObj.from_age ? this.userObj.from_age.toString() : '';
      this.to_age = this.userObj.to_age ? this.userObj.to_age.toString() : '';
      this.distance = this.userObj.distance ? this.userObj.distance.toString(): '';
      this.count = this.userObj.country;
      this.st = this.userObj.state;
      this.testArr1 = this.userObj.contactmember;
      this.explicit_content = this.userObj.explicit_content;
    }


    this.store.select(loadAllMasters)
      .subscribe(masters => {
        if(masters !== null) {
          this.country = masters.country;
          this.state = masters.states;
        }

      })

      this.looking_for_arr = ['Male','Female','Couple','CD / TV / TS'];
      this.members_arr = ['Don\'t match my interests','Live in another country',];

      for (let i = 1; i <=  54; i++) {
        this.age_range.push(i);
      }

      for (let i = 1; i <=  100; i++) {
        this.distance_range.push(i);
      }
  }

  onItemChange(e) {
    this.auth.state(e)
    .pipe(first())
    .subscribe(data => {
    this.state = data.data;


    });
  }

  update(gender, from_age, to_age, distance, country_id, state_id, contactmember, explicit_content) {
    this.loading = true;

 this.auth.interest_update(this.testArr, from_age, to_age, distance, country_id, state_id, this.testArr1, explicit_content)
    .pipe(first())
    .subscribe(data => {

      this.loading = false;
      if (data.code !== 200) {
        this._error.next(data.message);
    } else {
      const settings = data.settings;
      this.store.dispatch(new Settings({ settings }))
      this._success.next(data.message);
    }

    });
  }


  setClasslookingfor(event) {
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
  setClassmembers(event) {
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

}

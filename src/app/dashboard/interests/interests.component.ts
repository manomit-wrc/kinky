import {Component, OnInit, Input} from '@angular/core';
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
  gender: any; from_age: any; to_age: any; distance: any; count: any;
  st: any; contactmember: any; explicit_content: any;
  country: any;
  state: any;
  successMessage: string;
  errorMessage: string;
  
  loading: any = false;
  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private store: Store<AppState>
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
      this.gender = this.userObj.gender !== undefined ? this.userObj.gender : '';
      this.from_age = this.userObj.from_age ? this.userObj.from_age.toString() : '';
      this.to_age = this.userObj.to_age ? this.userObj.to_age.toString() : '';
      this.distance = this.userObj.distance ? this.userObj.distance.toString(): '';
      this.count = this.userObj.country;
      this.st = this.userObj.state;
      this.contactmember = this.userObj.contactmember ? this.userObj.contactmember.toString(): '';
      this.explicit_content = this.userObj.explicit_content;
    }
    
    
    this.store.select(loadAllMasters)
      .subscribe(masters => {
        if(masters !== null) {
          this.country = masters.country;
          this.state = masters.states;
        }
        
      })



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

 this.auth.interest_update(gender, from_age, to_age, distance, country_id, state_id, contactmember, explicit_content)
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

}

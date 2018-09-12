import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '../../services';
import { first, debounceTime } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { loadAllMasters } from '../dashboard.selectors';
import { userDetails, settingDetails } from '../../auth/auth.selectors';
import { Subject } from 'rxjs';
import { Settings } from '../../auth/auth.actions';

@Component({
  selector: 'app-siteconfigure',
  templateUrl: './siteconfigure.component.html',
  styleUrls: ['./siteconfigure.component.css']
})
export class SiteconfigureComponent implements OnInit {
  private _success = new Subject<string>();
  private _error = new Subject<string>();

  languages: any = [];
  
  email: any;
  mobile: any;
  language: any;
  timezone: any;
  successMessage: string;
  errorMessage: string;
  timezones : any;
  loading: any = false;

  constructor(
    private store: Store<AppState>,
    private auth: AuthenticationService
  ) { }

  ngOnInit() {

    this.languages = ['English', 'French', 'German', 'Spanish'];

    this._error.subscribe((message) => this.errorMessage = message);
    this._error.pipe(
      debounceTime(2000)
    ).subscribe(() => this.errorMessage = null);


    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(4000)
    ).subscribe(() => this.successMessage = null)
    
    this.store.select(loadAllMasters)
    .subscribe(masters => {
      if(masters !== null) {
        this.timezones = masters.timezones;
      }
    });
    this.store.select(userDetails)
    .subscribe(user => this.email = user.email);
    
    this.store.select(settingDetails)
      .subscribe(data => {
        if(data !== null) {
          this.language = data.language === undefined ? 'English': data.language;
          this.timezone = data.timezone === undefined ? this.timezones[0]: data.timezone;
          this.mobile = data.mobile ? data.mobile.toString(): '';
        }
        else {
          this.language = 'English';
          this.timezone = this.timezones[0];
        }
        
      
        
      })
  }

  update() {
    this.loading = true;
    this.auth.site_config_update(this.mobile, this.language, this.timezone)
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

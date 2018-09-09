import {Component, OnInit, Input} from '@angular/core';
import { AuthenticationService } from '../../services';
import { first, debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { settingDetails } from '../../auth/auth.selectors';
import { Settings } from '../../auth/auth.actions';

@Component({
  selector: 'app-alert',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit {
  
  radiogroup: string;
  private _success = new Subject<string>();
  private _error = new Subject<string>();
  successMessage: string;
  errorMessage: string;
  loading: any = false;
  constructor(
    private auth: AuthenticationService,
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

    this.store.select(settingDetails)
      .subscribe(data => {
        this.radiogroup = data.alert_setting ? data.alert_setting.toString(): '';
      })
    
  }

  update(no) {
    this.loading = true;
    this.auth.alerts_update(no)
    .pipe(first())
    .subscribe(data => {
      this.loading = false;
      if (data.code !== 200) {
        this._error.next(data.message);

    } else {
      const settings = data.settings;
      this.store.dispatch(new Settings({ settings }));
      this._success.next(data.message);

    }

    });
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '../../services';
import { first, debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { settingDetails } from '../../auth/auth.selectors';
import { Settings } from '../../auth/auth.actions';

@Component({
  selector: 'app-introduction-message',
  templateUrl: './introduction-message.component.html',
  styleUrls: ['./introduction-message.component.css']
})
export class IntroductionMessageComponent implements OnInit {
  

  preferred_introduction: any;
  own_introduction: any;
  private _success = new Subject<string>();
  private _error = new Subject<string>();
  successMessage: string;
  errorMessage: string;
  loading:any = false;

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
        if(data !== null) {
          this.preferred_introduction =  data.preferred_introduction;
          this.own_introduction =  data.own_introduction;
        }
        
      })
   
  }

  update() {
    this.loading = true;
    this.auth.introduction_update(this.preferred_introduction , this.own_introduction)
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

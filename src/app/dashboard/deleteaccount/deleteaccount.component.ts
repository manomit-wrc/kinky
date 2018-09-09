import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '../../services';
import { first, debounceTime } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { Logout } from '../../auth/auth.actions';

import { Subject } from 'rxjs';

@Component({
  selector: 'app-deleteaccount',
  templateUrl: './deleteaccount.component.html',
  styleUrls: ['./deleteaccount.component.css']
})
export class DeleteaccountComponent implements OnInit {
  @Input() userObj: any ;
  private _success = new Subject<string>();
  private _error = new Subject<string>();
  successMessage: string;
  errorMessage: string;

  delete_account: any;
  
  other_delete_reason: any;
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
      debounceTime(3000)
    ).subscribe(() => {
      this.store.dispatch(new Logout());
      window.location.href = "/";
    })

  }

  update(delete_account, other_delete_reason) {
    this.loading = true;
    this.auth.delete_account(delete_account, other_delete_reason)
    .pipe(first())
    .subscribe(data => {
      this.loading = false;
      if (data.code !== 200) {
        this._error.next(data.message);

    } else {
      this._success.next(data.message);
    }

    });
  }

}

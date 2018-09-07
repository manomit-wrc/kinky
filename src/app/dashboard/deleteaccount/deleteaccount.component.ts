import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '../../services';
import { first } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { Logout } from '../../auth/auth.actions';
@Component({
  selector: 'app-deleteaccount',
  templateUrl: './deleteaccount.component.html',
  styleUrls: ['./deleteaccount.component.css']
})
export class DeleteaccountComponent implements OnInit {
  @Input() userObj: any ;
  delete_account: any;
  successMsg: any;
  errorMsg: any;
  closeAlert = false;
  closeAlert1 = false;
  other_delete_reason: any;
  loading: any = false;
  constructor(
    private auth: AuthenticationService,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.userObj.subscribe(data => {
      this.delete_account = data.value.info.delete_account ? data.value.info.delete_account.toString() : '';
      this.other_delete_reason = data.value.info.other_delete_reason ? data.value.info.other_delete_reason : '';
    });
  }

  update(delete_account, other_delete_reason) {
    this.loading = true;
    this.auth.delete_account(delete_account, other_delete_reason)
    .pipe(first())
    .subscribe(data => {
      this.loading = false;
      if (data.code !== 200) {
        this.closeAlert = false;
        this.errorMsg = data.message;
        setTimeout(() => {
          this.closeAlert = true;
          this.errorMsg = '';
          console.log(this.closeAlert);
         }, 1500);
         this.closeAlert = false;

    } else {
      this.store.dispatch(new Logout())
      this.closeAlert1 = false;
      this.successMsg = data.message;
      setTimeout(() => {
        window.location.href = "/";
       }, 1500);
    }

    });
  }

}

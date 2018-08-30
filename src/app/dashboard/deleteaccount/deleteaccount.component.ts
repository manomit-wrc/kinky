import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '../../services';
import { first } from 'rxjs/operators';
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
  constructor(
    public auth: AuthenticationService
  ) { }

  ngOnInit() {
    this.userObj.subscribe(data => {
      this.delete_account = data.value.info.delete_account ? data.value.info.delete_account.toString(): '';
      this.other_delete_reason = data.value.info.other_delete_reason ? data.value.info.other_delete_reason : '';
    });
  }

  update(delete_account, other_delete_reason) {
    this.auth.delete_account(delete_account, other_delete_reason)
    .pipe(first())
    .subscribe(data => {
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
      this.closeAlert1 = false;
      this.successMsg = data.message;
      setTimeout(() => {
        this.closeAlert1 = true;
        this.successMsg = '';
        console.log(this.closeAlert);
       }, 1500);

    }

    });
  }

}

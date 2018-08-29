import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '../../services';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-switchaccount',
  templateUrl: './switchaccount.component.html',
  styleUrls: ['./switchaccount.component.css']
})
export class SwitchaccountComponent implements OnInit {
  @Input() userObj: any ;
  switch_account: any;
  successMsg: any;
  errorMsg: any;
  closeAlert = false;
  closeAlert1 = false;
  constructor(
    public auth: AuthenticationService
  ) { }

  ngOnInit() {
    this.userObj.subscribe(data => {
      this.switch_account = data.value.info.switch_account.toString();
    });
  }

  update(switchaccount) {
    this.auth.switch_account(switchaccount)
    .pipe(first())
    .subscribe(data => {
      if (data.code !== 200) {

        this.errorMsg = data.message;
        setTimeout(() => {
          this.closeAlert = true;
          this.errorMsg = '';
          console.log(this.closeAlert);
         }, 1500);
         this.closeAlert = false;

    } else {

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

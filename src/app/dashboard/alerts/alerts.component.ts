import {Component, OnInit, Input} from '@angular/core';
import { AuthenticationService } from '../../services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit {
  @Input() userObj: any ;
  radiogroup: string;
  successMsg: any;
  errorMsg: any;
  closeAlert = false;
  closeAlert1 = false;
  constructor(
    public auth: AuthenticationService
  ) { }

  ngOnInit() {
    this.userObj.subscribe(data => {
      this.radiogroup = data.value.info.alert_setting.toString();
      console.log(this.radiogroup);

    });
  }

  update(no) {
    this.auth.alerts_update(no)
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

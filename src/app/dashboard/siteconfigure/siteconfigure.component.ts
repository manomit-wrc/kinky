import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '../../services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-siteconfigure',
  templateUrl: './siteconfigure.component.html',
  styleUrls: ['./siteconfigure.component.css']
})
export class SiteconfigureComponent implements OnInit {
  @Input() userObj: any ;
  email: any;
  mobile: any;
  language: any;
  timezone: any;
  successMsg: any;
  errorMsg: any;
  closeAlert = false;
  closeAlert1 = false;
  constructor(
    public auth: AuthenticationService
  ) { }

  ngOnInit() {
    this.userObj.subscribe(data => {
      console.log(data.value.info.preferred_introduction);
      this.email = data.value.info.email;
      this.language = data.value.info.language;
      this.timezone = data.value.info.timezone;
      this.mobile = data.value.info.mobile.toString();
    });
  }

  update() {
    this.auth.site_config_update(this.mobile, this.language, this.timezone)
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

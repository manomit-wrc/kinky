import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '../../services';
import { first } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';

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
  timezones : any;
  loading: any = false;

  constructor(
    public auth: AuthenticationService
  ) { }

  ngOnInit() {
    const decoded = jwt_decode(localStorage.getItem('token'));

    this.userObj.subscribe(data => {

      this.email = decoded.email;
      this.language = data.value.info.language;
      this.timezone = data.value.info.timezone;
      this.timezones = data.value.timezones;

      this.mobile = data.value.info.mobile ? data.value.info.mobile.toString(): '';
    });



  }

  update() {
    this.loading = true;
    this.auth.site_config_update(this.mobile, this.language, this.timezone)
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

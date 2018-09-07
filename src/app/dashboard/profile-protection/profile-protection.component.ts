import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '../../services';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-profile-protection',
  templateUrl: './profile-protection.component.html',
  styleUrls: ['./profile-protection.component.css']
})
export class ProfileProtectionComponent implements OnInit {
  @Input() userObj: any ;
  radiogroup: any;
  successMsg: any;
  errorMsg: any;
  closeAlert = false;
  closeAlert1 = false;
  loading: any =false;
  constructor(
    public auth: AuthenticationService
  ) { }

  ngOnInit() {
    this.userObj.subscribe(data => {

      this.radiogroup = data.value.info.profile_setting ? data.value.info.profile_setting.toString(): '';

    });
  }

  update(no) {
    this.loading = true;
    this.auth.profile_protect(no)
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

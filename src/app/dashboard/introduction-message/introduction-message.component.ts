import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '../../services';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-introduction-message',
  templateUrl: './introduction-message.component.html',
  styleUrls: ['./introduction-message.component.css']
})
export class IntroductionMessageComponent implements OnInit {
  @Input() userObj: any ;

  preferred_introduction: any;
  own_introduction: any;
  successMsg: any;
  errorMsg: any;
  closeAlert = false;
  closeAlert1 = false;
  loading:any = false;

  constructor(
    public auth: AuthenticationService
  ) { }

  ngOnInit() {
    this.userObj.subscribe(data => {
      console.log(data.value.info.preferred_introduction);

      this.preferred_introduction =  data.value.info.preferred_introduction;
      this.own_introduction =  data.value.info.own_introduction;
    });
  }

  update() {
    this.loading = true;
    this.auth.introduction_update(this.preferred_introduction , this.own_introduction)
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

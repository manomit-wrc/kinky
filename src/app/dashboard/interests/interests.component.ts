import {Component, OnInit, Input} from '@angular/core';
import { AuthenticationService } from '../../services';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
@Component({
  selector: 'app-interests',
  templateUrl: './interests.component.html',
  styleUrls: ['./interests.component.css']
})
export class InterestsComponent implements OnInit {
  @Input() userObj: any ;
  gender: any; from_age: any; to_age: any; distance: any; count: any;
  st: any; contactmember: any; explicit_content: any;
  country: any;
  state: any;
  successMsg: any;
  errorMsg: any;
  closeAlert = false;
  closeAlert1 = false;
  constructor(
    private auth: AuthenticationService,
    private router: Router
    ) { }

  ngOnInit() {
    this.userObj.subscribe(data => {
      this.gender = data.value.info.gender;
      this.from_age = data.value.info.from_age ? data.value.info.from_age.toString() : '';
      this.to_age = data.value.info.to_age ? data.value.info.to_age.toString() : '';
      this.distance = data.value.info.distance ? data.value.info.distance.toString(): '';
      this.count = data.value.info.country;
      this.st = data.value.info.state;
      this.contactmember = data.value.info.contactmember ? data.value.info.contactmember.toString(): '';
      this.explicit_content = data.value.info.explicit_content;
    });

    this.auth.country()
    .pipe(first())
    .subscribe(data => {
    this.country = data.data;
    this.count = (this.count) ? this.count : data.data[0]._id;
    this.auth.state(data.data[0]._id)
    .pipe(first())
    .subscribe(datas => {
    this.state = datas.data;
    this.st = (this.st) ? this.st : datas.data[0]._id;

    });

    });



  }

  onItemChange(e) {
    this.auth.state(e)
    .pipe(first())
    .subscribe(data => {
    this.state = data.data;


    });
  }

  update(gender, from_age, to_age, distance, country_id, state_id, contactmember, explicit_content) {

 this.auth.interest_update(gender, from_age, to_age, distance, country_id, state_id, contactmember, explicit_content)
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

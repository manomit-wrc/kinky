import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services';
import { first, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../reducers';
import { userDetails } from '../../auth/auth.selectors';
import { noop } from '@angular/compiler/src/render3/view/util';
@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
name: any;
address: any;
sexuality: any;
gender: any;
age: any;
looking_for: any;
interested_in: any;
avatar:any;
height:any;
build:any;
hair:any;
body_decoration:any;
drink:any;
smoke:any;
drugs:any;
size:any;
travel_arrangements:any;
purpose:any;
  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private avt: UserService,
    private store: Store<AppState>
  ) { }

  ngOnInit() {

    this.store.select(userDetails)
    .subscribe(data => {
      this.avatar =data.avatar;
        this.name =data.username;
        this.address = data.state.name + "," +data.country.name ;
        this.gender = data.gender;
        this.sexuality = data.sexuality;
        this.age = this.getAge(data.mm +"/"+data.dd +"/"+data.yyyy );
        if (data.looking_for =='M') {
          this.looking_for = "Male";
        }else{
          this.looking_for = "Female";
        }

        this.interested_in = data.interested_in;
        this.height = data.height.name;
        this.build = data.build.name;
        this.hair = data.hair.name;
        this.body_decoration = data.body_decoration;
        this.drink = data.drink;
        this.smoke = data.smoke;
        this.drugs = data.drugs;
        this.size = data.size;
        this.travel_arrangements = data.travel_arrangment;
        this.purpose =data.purpose;
    })

    this.avt.profileImage.subscribe(img => this.avatar = img)

  }

   getAge(DOB) {
    var today = new Date();
    var birthDate = new Date(DOB);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age = age - 1;
    }

    return age;
}

}

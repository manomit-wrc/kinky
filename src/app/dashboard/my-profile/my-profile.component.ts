import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
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
    private router: Router
  ) { }

  ngOnInit() {
    this.auth.user_details()
    .pipe(first())
    .subscribe(data => {
        this.avatar =data.value.user.avatar;
        this.name =data.value.user.username;
        this.address = data.value.user.state.name + "," +data.value.user.country.name ;
        this.gender = data.value.user.gender;
        this.sexuality = data.value.user.sexuality;
        this.age = this.getAge(data.value.user.mm +"/"+data.value.user.dd +"/"+data.value.user.yyyy );
        if (data.value.user.looking_for =='M') {
          this.looking_for = "Male";
        }else{
          this.looking_for = "Female";
        }

        this.interested_in = data.value.user.interested_in;
        this.height = data.value.user.height.name;
        this.build = data.value.user.build.name;
        this.hair = data.value.user.hair.name;
        this.body_decoration = data.value.user.body_decoration;
        this.drink = data.value.user.drink;
        this.smoke = data.value.user.smoke;
        this.drugs = data.value.user.drugs;
        this.size = data.value.user.size;
        this.travel_arrangements = data.value.user.travel_arrangment;
        this.purpose =data.value.user.purpose;

    });
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

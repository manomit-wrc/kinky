import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services';
import { debounceTime, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../reducers';
import { userDetails } from '../../auth/auth.selectors';
import { noop } from '@angular/compiler/src/render3/view/util';
import { loadAllMasters } from '../dashboard.selectors';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  private _success = new Subject<string>();
  
  successMessage: string;
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
  country: any;
  states: any;
  purpose:any;
  headline:any;
  description:any;
  email_verified: boolean = false;
  isLoading: boolean = false;

  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private avt: UserService,
    private store: Store<AppState>
  ) { }

  ngOnInit() {

    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(4000)
    ).subscribe(() => this.successMessage = null)

    this.store.select(userDetails)
    .subscribe(data => {
      
      if(data.email_verified) {
        this.email_verified = true;
      }

      this.avatar = data.avatar !== undefined ? data.avatar: null;
        this.name = data.username;

        this.store.select(loadAllMasters)
          .subscribe(masters => {
            if(masters !== undefined) {
              
              if(masters !== undefined) {
                this.country = masters.country.filter(c => c._id === data.country);
                this.states = masters.states.filter( s => s._id === data.state );
                this.height = masters.height.filter( h => h._id === data.height);
                this.height = this.height[0].name;
                this.build = masters.build.filter( h => h._id === data.build);
                this.build = this.build[0].name;
                this.hair = masters.hair.filter( h => h._id === data.hair);
                this.hair = this.hair[0].name;
                this.address = this.states[0].name + "," + this.country[0].name;
              }
              else {
                this.address = "N/A, N/A";
              }
            }

          })
        this.gender = data.gender !== undefined ? data.gender : 'N/A';
        this.sexuality = data.sexuality !== undefined ? data.sexuality : 'N/A';
        this.age = this.getAge(data.mm +"/"+data.dd +"/"+data.yyyy );
        if (data.looking_for =='M') {
          this.looking_for = "Male";
        }else{
          this.looking_for = "Female";
        }

        this.interested_in = data.interested_in;
        
        this.body_decoration = data.body_decoration.join(",");
        this.drink = data.drink === undefined ? 'N/A' : data.drink;
        this.smoke = data.smoke === undefined ? 'N/A' : data.smoke;
        this.drugs = data.drugs === undefined ? 'N/A' : data.drugs;
        this.size = data.size === undefined ? 'N/A' : data.size;
        this.travel_arrangements = data.travel_arrangment.join(",");
        this.purpose = data.purpose === undefined ? 'N/A' : data.purpose;
        this.headline = data.headline === undefined ? 'N/A' : data.headline;
        this.description = data.description === undefined ? 'N/A' : data.description;
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

verifyEmail() {
  this.isLoading = true;
  this.auth.verifyEmail()
    .subscribe(data => {
      if(data.code === 200) {
        this.isLoading = false;
        this._success.next(data.message);
      }
    });
}

}

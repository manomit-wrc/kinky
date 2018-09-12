import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services';
import { debounceTime, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../reducers';
import { userDetails, locationDetails } from '../../auth/auth.selectors';
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
  city: any;
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

      this.country = data.country === undefined ? '' : data.country;
      this.city = data.state === undefined ? '' : data.state;
      
      if(data.email_verified) {
        this.email_verified = true;
      }

      this.avatar = data.avatar !== undefined ? data.avatar: null;
        this.name = data.username;

        this.store.select(loadAllMasters)
          .subscribe(masters => {
            if(masters !== undefined) {
              
              if(masters !== undefined) {
                if(data.height !== undefined) {
                  this.height = masters.height.filter( h => h._id === data.height);
                  this.height = this.height.length === 0 ? '' : this.height[0].name;
                }
                if(data.build !== undefined) {
                  this.build = masters.build.filter( h => h._id === data.build);
                  this.build = this.build.length === 0 ? '' : this.build[0].name;
                }
                if(data.hair !== undefined) {
                  this.hair = masters.hair.filter( h => h._id === data.hair);
                  this.hair = this.hair.length === 0 ? '' : this.hair[0].name;
                }
               
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
    });

    this.store.select(locationDetails)
      .subscribe(location => {
        if(this.country === "" || this.city === "") {
          this.address = `${location.city},${location.country}`
        }
        else {
          this.address = `${this.city},${this.country}`
        }
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

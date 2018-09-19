import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services';
import { debounceTime, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../reducers';
import { userDetails, locationDetails ,profileImages,profileVideos} from '../../auth/auth.selectors';
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
  sexuality_female: any;
  gender: any;
  age: any;
  age_female:any;
  looking_for_male: any;
  looking_for_female: any;
  looking_for_couple: any;
  looking_for_cd: any;
  interested_in: any;
  avatar:any;
  height:any;
  height_female:any;
  build:any;
  build_female:any;
  hair:any;
  hair_female:any;
  body_decoration:any;
  body_decoration_female:any;
  drink:any;
  drink_female:any;
  smoke:any;
  smoke_female:any;
  drugs:any;
  drugs_female:any;
  size:any;
  size_female:any;
  travel_arrangements:any;
  country: any;
  city: any;
  purpose:any;
  headline:any;
  description:any;
  email_verified: boolean = false;
  isLoading: boolean = false;
  fileArr:any;
  publicImages:any;
  publicvideos:any;
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
                if(data.height_female !== undefined) {
                  this.height_female =masters.height.filter( h => h._id === data.height_female);
                  this.height_female = this.height_female.length === 0 ? '' : this.height_female[0].name;
                }
                if(data.build !== undefined) {
                  this.build = masters.build.filter( h => h._id === data.build);
                  this.build = this.build.length === 0 ? '' : this.build[0].name;
                }
                if(data.build_female !== undefined) {
                  this.build_female = masters.build.filter( h => h._id === data.build_female);
                  this.build_female = this.build_female.length === 0 ? '' : this.build_female[0].name;
                }
                if(data.hair !== undefined) {
                  this.hair = masters.hair.filter( h => h._id === data.hair);
                  this.hair = this.hair.length === 0 ? '' : this.hair[0].name;
                }
                if(data.hair_female !== undefined) {
                  this.hair_female = masters.hair.filter( h => h._id === data.hair_female);
                  this.hair_female = this.hair_female.length === 0 ? '' : this.hair_female[0].name;
                }

              }

            }

          })
        this.gender = data.gender !== undefined ? data.gender : 'N/A';
        this.sexuality = data.sexuality !== undefined ? data.sexuality : 'N/A';
        this.sexuality_female = data.sexuality_female !== undefined ? data.sexuality_female : 'N/A';
        this.age = this.getAge(data.mm +"/"+data.dd +"/"+data.yyyy );
        this.age_female = this.getAge(data.mm_female +"/"+data.dd_female +"/"+data.yyyy_female );
        this.looking_for_male = data.looking_for_male;
        this.looking_for_female = data.looking_for_female;
        this.looking_for_couple = data.looking_for_couple;
        this.looking_for_cd = data.looking_for_cd;
        this.interested_in = data.interested_in;

        this.body_decoration = data.body_decoration.join(",");
        this.body_decoration_female = data.body_decoration_female.join(",");
        this.drink = data.drink === undefined ? 'N/A' : data.drink;
        this.drink_female = data.drink_female === undefined ? 'N/A' : data.drink_female;
        this.smoke = data.smoke === undefined ? 'N/A' : data.smoke;
        this.smoke_female = data.smoke_female === undefined ? 'N/A' : data.smoke_female;
        this.drugs = data.drugs === undefined ? 'N/A' : data.drugs;
        this.drugs_female = data.drugs_female === undefined ? 'N/A' : data.drugs_female;
        this.size = data.size === undefined ? 'N/A' : data.size;
        this.size_female = data.size_female === undefined ? 'N/A' : data.size_female;
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

    this.store.select(profileImages).subscribe(images => {
        this.fileArr = images;
        this.publicImages = this.fileArr.filter(f => f.access === 'Public');

      });

      this.store.select(profileVideos).subscribe(videos => {

          this.publicvideos = videos.filter(f => f.access === 'Public');
          console.log('====================================');
        console.log(this.publicvideos);
        console.log('====================================');
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

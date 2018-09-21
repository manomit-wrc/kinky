import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, noop, BehaviorSubject, pipe } from 'rxjs';
import {SearchService} from '../../services/search.service';
import { first, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { loadAllMasters } from '../dashboard.selectors';
import { Subject } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../reducers';
@Component({
  selector: 'app-user-timeline',
  templateUrl: './user-timeline.component.html',
  styleUrls: ['./user-timeline.component.css']
})
export class UserTimelineComponent implements OnInit {
  username:any;
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
  fileArrImages:any;
  fileArrVideos:any;
  publicImages:any;
  publicvideos:any;
  seeking_for: string = '';
  constructor(private router: ActivatedRoute,public search: SearchService,private toastr: ToastrService, private store: Store<AppState>) { }

  ngOnInit() {
    let user_id = this.router.snapshot.params.user_id;
      this.search.userdetailsByid(user_id)
      .pipe(
        tap(datas => {
          let data = datas.info;
        this.username = data.username;
         this.avatar = data.avatar !== undefined ? data.avatar: null;
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

        this.seeking_for = this.looking_for_male ? 'Male,': '';
        this.seeking_for += this.looking_for_female ? 'Female,': '';
        this.seeking_for += this.looking_for_couple ? 'Couple,': '';
        this.seeking_for += this.looking_for_cd ? ' CD/TV/TS,': '';

        this.seeking_for = this.seeking_for.substring(0, this.seeking_for.length - 1);
         this.fileArrImages = data.images;
        this.publicImages = this.fileArrImages.filter(f => f.access === 'Public');
         this.fileArrVideos = data.videos;
        this.publicvideos = this.fileArrVideos.filter(f => f.access === 'Public');

        })
  ).subscribe(noop)
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

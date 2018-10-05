import { Component, OnInit,Renderer } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, noop, BehaviorSubject, pipe } from 'rxjs';
import {SearchService} from '../../services/search.service';
import { first, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { loadAllMasters } from '../dashboard.selectors';
import { Subject } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../reducers';
import { PusherService } from '../pusher.service';
import * as jwt_decode from 'jwt-decode';
import { userDetails} from '../../auth/auth.selectors';
import { Login, Settings } from '../../auth/auth.actions';
@Component({
  selector: 'app-user-timeline',
  templateUrl: './user-timeline.component.html',
  styleUrls: ['./user-timeline.component.css']
})
export class UserTimelineComponent implements OnInit {
  from_users:any = [];
  to_users:any = [];
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
  show:any = 6;
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
  similarUsers:any=[];
  hotlist_status:any = false;
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
  friend_list:any = [];
  status:any = 2;
  active_status: boolean = false;
  session_id:any;
  userid:any;
  hot_list:any=[];
  constructor(
    private router: ActivatedRoute,
    public search: SearchService,
    private toastr: ToastrService,
    private store: Store<AppState>,
    private pusherService: PusherService,
    private renderer: Renderer
  ) { }

  ngOnInit() {

    const decoded = jwt_decode(localStorage.getItem('token'));

    this.pusherService.channel.bind("check-logged-in", data => {
      if(data.user_id === this.router.snapshot.params.user_id) {
        if(data.status === 1) {
          this.active_status = true;
        }
        else {
          this.active_status = false;
        }
      }
    })

    this.pusherService.checkLoggedin(this.router.snapshot.params.user_id);
    this.session_id = this.router.snapshot.params.user_id;
    let user_id = this.router.snapshot.params.user_id;
      this.search.userdetailsByid(user_id)
      .pipe(
        tap(datas => {
          let data = datas.info;
          this.userid  = data._id;
        this.username = data.username;
         this.avatar = data.avatar !== undefined ? data.avatar: null;
         this.address = data.state + "," + data.country;
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

          if(data.email_verified) {
            this.email_verified = true;
          }
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
        this.description = data.description === undefined ? 'N/A' : data.description.replace(new RegExp('\r?\n','g'), '<br />');;

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

  this.search.friend_list_by_user(user_id)
  .subscribe (datas => {



    this.friend_list = datas.info;

  });

  this.search.check_friends()
  .subscribe (datas => {


    this.from_users = datas.info.filter(f => f.from_user._id === user_id);
    this.to_users = datas.info.filter(f => f.to_user._id === user_id);

  });
  this.search.similar_profile(user_id)
  .subscribe (datas => {

    this.similarUsers = datas.info.filter(f => f._id !== decoded.id);

  });
  this.search.hot_list_by_user(user_id)
  .subscribe (datas => {

    this.hot_list = datas.info;

  });

  this.store.select(userDetails)
  .subscribe(data => {
    if(data.hotlist.indexOf(this.router.snapshot.params.user_id) !== -1) {
      document.querySelector('.user-timeline-left-icon-2').classList.add('active');
    }else{
      document.querySelector('.user-timeline-left-icon-2 .active').classList.remove('active');
    }
  });

  }


  request_send(event,  to_id){


     let target = event.currentTarget;

    if(target.className === "user-timeline-left-icon-1") {
      this.search.request_send(to_id)
      .pipe(
        tap(data => {

          if(data.code!=200){
            this.toastr.error("Something went wrong");
          }else{

            this.toastr.success(data.info);
            target.classList.remove('user-timeline-left-icon-1');
            this.renderer.setElementClass(target, 'user-timeline-left-icon-0', true);
          }


        })
      ).subscribe(noop);
    }
    else {

      this.search.friend_remove(to_id)
        .pipe(
          tap(data => {
            this.toastr.success(data.msg);
            target.classList.remove('user-timeline-left-icon-0');
            this.renderer.setElementClass(target, 'user-timeline-left-icon-1', true);
          })
        ).subscribe(noop);
    }

  }

  saveTohotlist(e) {
    let target = e.currentTarget;

    //this.hotlist_status = ! this.hotlist_status;

      if(target.className === "user-timeline-left-icon-2") {
        this.hotlist_status = true;
        this.renderer.setElementClass(target, 'active', true);
        this.search.saveTohotlist(this.userid,this.hotlist_status)
      .pipe(
        tap(data => {
          const info = data.info;
          this.store.dispatch(new Login({ info}))
        })
      ).subscribe(noop);

      }else{
        this.hotlist_status = false;
        target.classList.remove('active');
        this.search.saveTohotlist(this.userid,this.hotlist_status)
      .pipe(
        tap(data => {
          const info = data.info;
          this.store.dispatch(new Login({ info}))
        })
      ).subscribe(noop);
      }
      /* this.search.saveTohotlist(this.userid,this.hotlist_status)
      .pipe(
        tap(data => {

        })
      ).subscribe(noop); */

      /* if(target.className === "user-timeline-left-icon-2 active") {
        target.classList.remove('active');
      } */
      /* this.search.saveTohotlist(this.userid,this.hotlist_status)
      .pipe(
        tap(data => {

        })
      ).subscribe(noop); */


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

import { Component, OnInit,Renderer } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, noop, BehaviorSubject, pipe } from 'rxjs';
import {SearchService} from '../../services/search.service';
import { first, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { loadAllMasters,postAllMasters } from '../dashboard.selectors';
import { Subject } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../reducers';
import { PusherService } from '../pusher.service';
import * as jwt_decode from 'jwt-decode';
import { userDetails} from '../../auth/auth.selectors';
import { Login, Settings } from '../../auth/auth.actions';
import { AuthenticationService } from '../../services';
import {postMasters} from '../../dashboard/dashboard.actions';
@Component({
  selector: 'app-user-timeline',
  templateUrl: './user-timeline.component.html',
  styleUrls: ['./user-timeline.component.css']
})
export class UserTimelineComponent implements OnInit {
  from_users:any = [];
  showComment:any = false;
  to_users:any = [];
  likes:any = 0;
  like_status:any = false;
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
  user_data:any={};
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
  current_id:any;
  userid:any;
  hot_list:any=[];
  perscent:any;
  order: any = 'add_time';
  reverse:any = true;
  post_result:any;
  imageSrc:any;
  limit:any = 10;
  constructor(
    private router: ActivatedRoute,
    public search: SearchService,
    private toastr: ToastrService,
    private store: Store<AppState>,
    private pusherService: PusherService,
    private renderer: Renderer,
    private auth: AuthenticationService
  ) { }

  ngOnInit() {

    const decoded = jwt_decode(localStorage.getItem('token'));
    this.imageSrc = decoded.avatar;
    this.pusherService.checkLoggedin(this.router.snapshot.params.user_id);
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


    this.session_id = this.router.snapshot.params.user_id;
    let user_id = this.router.snapshot.params.user_id;
      this.search.userdetailsByid(user_id)
      .pipe(
        tap(datas => {
          let data = datas.info;

          this.user_data = datas.info;
          this.userid  = this.user_data._id;
          this.current_id =decoded.id;
        this.username = this.user_data.username;
         this.avatar = this.user_data.avatar !== undefined ? this.user_data.avatar: null;
         this.address = this.user_data.state + "," + this.user_data.country;
          if(this.user_data.email_verified) {
            this.email_verified = true;
          }
          this.gender = this.user_data.gender !== undefined ? this.user_data.gender : 'N/A';
        this.sexuality = this.user_data.sexuality !== undefined ? this.user_data.sexuality : 'N/A';
        this.sexuality_female = this.user_data.sexuality_female !== undefined ? this.user_data.sexuality_female : 'N/A';
        this.age = this.getAge(this.user_data.mm +"/"+this.user_data.dd +"/"+this.user_data.yyyy );
        this.age_female = this.getAge(this.user_data.mm_female +"/"+this.user_data.dd_female +"/"+this.user_data.yyyy_female );
        this.looking_for_male = this.user_data.looking_for_male;
        this.looking_for_female = this.user_data.looking_for_female;
        this.looking_for_couple = this.user_data.looking_for_couple;
        this.looking_for_cd = this.user_data.looking_for_cd;
        this.interested_in = this.user_data.interested_in;
        this.likes = this.user_data.likes.length;
        this.body_decoration = this.user_data.body_decoration.join(",");
        this.body_decoration_female = this.user_data.body_decoration_female.join(",");
        this.drink = this.user_data.drink === undefined ? 'N/A' : this.user_data.drink;
        this.drink_female = this.user_data.drink_female === undefined ? 'N/A' : this.user_data.drink_female;
        this.smoke = this.user_data.smoke === undefined ? 'N/A' : this.user_data.smoke;
        this.smoke_female = this.user_data.smoke_female === undefined ? 'N/A' : this.user_data.smoke_female;
        this.drugs = this.user_data.drugs === undefined ? 'N/A' : this.user_data.drugs;
        this.drugs_female = this.user_data.drugs_female === undefined ? 'N/A' : this.user_data.drugs_female;
        this.size = this.user_data.size === undefined ? 'N/A' : this.user_data.size;
        this.size_female = this.user_data.size_female === undefined ? 'N/A' : this.user_data.size_female;
        this.travel_arrangements = this.user_data.travel_arrangment.join(",");
        this.purpose = this.user_data.purpose === undefined ? 'N/A' : this.user_data.purpose;
        this.headline = this.user_data.headline === undefined ? 'N/A' : this.user_data.headline;
        this.description = this.user_data.description === undefined ? 'N/A' : this.user_data.description.replace(new RegExp('\r?\n','g'), '<br />');;

        this.seeking_for = this.looking_for_male ? 'Male,': '';
        this.seeking_for += this.looking_for_female ? 'Female,': '';
        this.seeking_for += this.looking_for_couple ? 'Couple,': '';
        this.seeking_for += this.looking_for_cd ? ' CD/TV/TS,': '';

        this.seeking_for = this.seeking_for.substring(0, this.seeking_for.length - 1);
         this.fileArrImages = this.user_data.images;

        this.publicImages = this.fileArrImages.filter(f => f.access === 'Public');
         this.fileArrVideos = this.user_data.videos;
        this.publicvideos = this.fileArrVideos.filter(f => f.access === 'Public');
        if(this.user_data.likes.indexOf(decoded.id) !== -1) {
          // alert(1);
           document.querySelector('.user-timeline-like-icon').classList.add('active');
         }else{
          // alert(2);
           document.querySelector('.user-timeline-like-icon .active').classList.remove('active');
         }

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

  this.search.match_perscent(user_id)
  .subscribe (datas => {
  this.perscent = Math.round(datas.info);

  });

  this.store.select(userDetails)
  .subscribe(data => {
    if(data.hotlist.indexOf(this.router.snapshot.params.user_id) !== -1) {
      document.querySelector('.user-timeline-left-icon-2').classList.add('active');
    }else{
      document.querySelector('.user-timeline-left-icon-2 .active').classList.remove('active');
    }
  });

  this.store.select(loadAllMasters)
  .subscribe(masters => {

      if(masters !== undefined) {
        if(this.user_data.height !== undefined) {
          this.height = masters.height.filter( h => h._id === this.user_data.height);
          this.height = this.height.length === 0 ? '' : this.height[0].name;

        }
        if(this.user_data.height_female !== undefined) {
          this.height_female =masters.height.filter( h => h._id === this.user_data.height_female);
          this.height_female = this.height_female.length === 0 ? '' : this.height_female[0].name;
        }
        if(this.user_data.build !== undefined) {
          this.build = masters.build.filter( h => h._id === this.user_data.build);
          this.build = this.build.length === 0 ? '' : this.build[0].name;
        }
        if(this.user_data.build_female !== undefined) {
          this.build_female = masters.build.filter( h => h._id === this.user_data.build_female);
          this.build_female = this.build_female.length === 0 ? '' : this.build_female[0].name;
        }
        if(this.user_data.hair !== undefined) {
          this.hair = masters.hair.filter( h => h._id === this.user_data.hair);
          this.hair = this.hair.length === 0 ? '' : this.hair[0].name;
        }
        if(this.user_data.hair_female !== undefined) {
          this.hair_female = masters.hair.filter( h => h._id === this.user_data.hair_female);
          this.hair_female = this.hair_female.length === 0 ? '' : this.hair_female[0].name;
        }

      }


  })


  this.auth.post_list_by_user(this.session_id)
  .subscribe(data => {
    this.post_result = data.info;


    for(let i=0;i<this.post_result.length;i++){
      this.post_result[i].index = i;
      if(this.post_result[i].like.length > 0) {
        this.post_result[i].like_count = this.post_result[i].like.length;

        let likeExistByMe = this.post_result[i].like.filter(lk => lk === this.current_id);
        if(likeExistByMe.length > 0) {
          this.post_result[i].like_class = "active";
        }
        else {
          this.post_result[i].like_class = "";
        }
      }
      else {
        this.post_result[i].like_count = 0;
        this.post_result[i].like_class = "";
      }

     }

  });



  }


  loadmore() {
    this.limit += 10;
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

      this.search.friend_remove(to_id,to_id)
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



  }
  like(e){
    let target = e.currentTarget;

    //this.hotlist_status = ! this.hotlist_status;

      if(target.className === "user-timeline-like-icon") {
        this.likes +=1;
        this.like_status = true;
        this.renderer.setElementClass(target, 'active', true);
        this.search.saveToLikes(this.userid,this.like_status)
      .pipe(
        tap(data => {
          const info = data.info;

        })
      ).subscribe(noop);

      }else{
        this.likes -=1;
        this.like_status = false;
        target.classList.remove('active');
        this.search.saveToLikes(this.userid,this.like_status)
      .pipe(
        tap(data => {
          const info = data.info;

        })
      ).subscribe(noop);
      }


  }

  like_post(post_id, index, like_class){
    if(like_class !== "") {
      this.post_result[index].like_class = "";
      this.post_result[index].like = this.post_result[index].like.filter(item => item !== this.current_id);
      this.post_result[index].like_count = this.post_result[index].like.length;
      this.like_status = false;
    }
    else {
      this.like_status = true;
      this.post_result[index].like_class = "active";
      this.post_result[index].like.push(this.current_id);
      this.post_result[index].like_count = this.post_result[index].like.length;
    }
       this.search.postLike(this.current_id,this.like_status,post_id)
       .subscribe(datas => {
           if(datas.code === 200){
            this.auth.post_list_by_user(this.session_id)
            .subscribe(data => {
              this.post_result = data.info;


              for(let i=0;i<this.post_result.length;i++){
                this.post_result[i].index = i;
                if(this.post_result[i].like.length > 0) {
                  this.post_result[i].like_count = this.post_result[i].like.length;

                  let likeExistByMe = this.post_result[i].like.filter(lk => lk === this.current_id);
                  if(likeExistByMe.length > 0) {
                    this.post_result[i].like_class = "active";
                  }
                  else {
                    this.post_result[i].like_class = "";
                  }
                }
                else {
                  this.post_result[i].like_count = 0;
                  this.post_result[i].like_class = "";
                }

               }

            });
    }

    });

  }

  showcom(length){

    if(length!=0 && this.showComment!=true){
   this.showComment = true;
    }else{
      this.showComment = false;
    }
  }

  onKey(e,id){
    if(e.keyCode =='13'){
      alert(e.target.value + id);
      this.auth.post_comment(e.target.value,id)
      .subscribe(datas => {
        if(datas.code === 200){
          this.auth.post_list_by_user(this.session_id)
          .subscribe(data => {
            e.target.value = "";
            this.post_result = data.info;
          });
        }
      });
    }
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

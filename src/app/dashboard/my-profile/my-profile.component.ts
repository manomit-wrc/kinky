import { SearchService } from '../../services/search.service';
import { Component, OnInit} from '@angular/core';
import { AuthenticationService } from '../../services';
import { debounceTime, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../user.service';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../reducers';
import { userDetails, locationDetails ,profileImages,profileVideos} from '../../auth/auth.selectors';
import { noop } from '@angular/compiler/src/render3/view/util';
import { loadAllMasters,postAllMasters } from '../dashboard.selectors';
import { postMasters } from '../dashboard.actions';
import { Subject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import * as jwt_decode from 'jwt-decode';
import {ModalModule} from "ngx-modal";
declare var $: any;

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  private _success = new Subject<string>();
  show = 6;
  showComment:any = false;
  posts:any;
  content_type:any;
  tab: String = 'tab1';
  successMessage: string;
  comment_text:any;
  hot_list:any=[];
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
  fileArrvid:any;
  publicImages:any;
  publicvideos:any;
  seeking_for: string = '';
  friend_list:any= [];
  post_description:any = "";
  session_id: string = '';
  likes: any;
  post_data: any = false;
  post_result: any[];
  order: any = 'add_time';
  reverse:any = true;
  like:any = 0;
  like_status:any = false;
  limit:any = 10;
  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private avt: UserService,
    public search: SearchService,
    private store: Store<AppState>,
    private toastr: ToastrService
  ) { }

  ngOnInit() {

    this.search.hot_list()
  .subscribe (datas => {
   this.hot_list = datas.info;
  });

    const decoded = jwt_decode(localStorage.getItem('token'));
    this.session_id = decoded.id;

    this.search.friend_list()
      .subscribe (datas => {
        this.friend_list = datas.info;
      });




    $(document).ready(function() {
      var $owl = $('.owl-carousel');

      $owl.children().each( function( index ) {
        $(this).attr( 'data-position', index ); // NB: .attr() instead of .data()
      });

      $owl.owlCarousel({
        center: true,
        loop: true,
        items:3,
      });

      $(document).on('click', '.owl-item>div', function() {
        $owl.trigger('to.owl.carousel', $(this).data( 'position' ) );
      });
    });


    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(4000)
    ).subscribe(() => this.successMessage = null)

    this.store.select(userDetails)
    .subscribe(data => {


      this.likes = data.likes.length;
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
        this.description = data.description === undefined ? 'N/A' : data.description.replace(new RegExp('\r?\n','g'), '<br />');

        this.seeking_for = this.looking_for_male ? 'Male,': '';
        this.seeking_for += this.looking_for_female ? 'Female,': '';
        this.seeking_for += this.looking_for_couple ? 'Couple,': '';
        this.seeking_for += this.looking_for_cd ? ' CD/TV/TS,': '';

        this.seeking_for = this.seeking_for.substring(0, this.seeking_for.length - 1);
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
        this.fileArrvid = videos;
          this.publicvideos = videos.filter(f => f.access === 'Public');

        });


      if(localStorage.getItem("posts") === "null" || localStorage.getItem("posts") === null) {

              this.auth.post_list()
                .subscribe(datas => {
                  const posts = datas.info;
                  this.post_result = posts;
                  this.loadAllPosts();
                  this.store.dispatch(new postMasters({ posts }));
              });
      }
      else {
        this.store.select(postAllMasters).subscribe(posts => {
          this.post_result = posts;
          this.loadAllPosts();
         });
      }
  }

  loadmore() {
   this.limit += 10;
  }

  showcom(length){

    if(length!=0 && this.showComment!=true){
   this.showComment = true;
    }else{
      this.showComment = false;
    }
  }

  like_post(post_id, index, like_class){
    if(like_class !== "") {
      this.post_result[index].like_class = "";
      this.post_result[index].like = this.post_result[index].like.filter(item => item !== this.session_id);
      this.post_result[index].like_count = this.post_result[index].like.length;
      this.like_status = false;
    }
    else {
      this.like_status = true;
      this.post_result[index].like_class = "active";
      this.post_result[index].like.push(this.session_id);
      this.post_result[index].like_count = this.post_result[index].like.length;
    }
       this.search.postLike(this.session_id,this.like_status,post_id)
       .subscribe(datas => {
           if(datas.code === 200){
       this.auth.post_list()
      .subscribe(data => {
        const posts = data.info;
        this.store.dispatch(new postMasters({ posts }));
      });
    }

    });

  }

  friend_remove(id, requested_id) {

    this.search.friend_remove(id, requested_id)
    .subscribe(datas => {
        this.toastr.success(datas.msg);
        this.friend_list = datas.info;
        window.location.reload();
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

displayTab(value) {
  this.tab = value;
}



content_click(url,type,myModal){
localStorage.setItem("content",url);
this.content_type = type;
myModal.close();
}

post(){
 // alert(localStorage.getItem("content"));
 if(this.post_description !=""){
   this.post_data = true;
  this.auth.post(this.post_description,localStorage.getItem("content"),this.content_type)
  .subscribe(data => {
    localStorage.removeItem("content");
    this.content_type = "";
    if(data.code === 200) {
      this.auth.post_list()
      .subscribe(datas => {
        this.post_data = false;;
        const posts = datas.info;
        this.post_description = "";
        this.store.dispatch(new postMasters({ posts }));
      });

    }
  });
 }else{
  this.toastr.error("Please write something.");
 }

}

onKey(e,id){
if(e.keyCode =='13'){
  this.auth.post_comment(e.target.value,id)
  .subscribe(datas => {
    if(datas.code === 200){
      this.auth.post_list()
      .subscribe(data => {
        e.target.value = "";
        const posts = data.info;
        this.store.dispatch(new postMasters({ posts }));
      });
    }
  });
}
}

loadAllPosts() {
  for(let i=0;i<this.post_result.length;i++){
    this.post_result[i].index = i;
    if(this.post_result[i].like.length > 0) {
      this.post_result[i].like_count = this.post_result[i].like.length;

      let likeExistByMe = this.post_result[i].like.filter(lk => lk === this.session_id);
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



}

}

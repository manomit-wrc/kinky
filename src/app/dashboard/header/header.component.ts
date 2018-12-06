import { Component, OnInit,Renderer } from '@angular/core';
import { AuthenticationService } from '../../services';
import { AppState } from '../../reducers';
import { countUser, emailVerified } from '../../auth/auth.selectors';
import { UserService } from '../user.service';
import { Logout } from '../../auth/auth.actions';
import { ToastrService } from 'ngx-toastr';
import { PusherService } from '../pusher.service';
import * as jwt_decode from 'jwt-decode';
import { userDetails} from '../../auth/auth.selectors';
import { Store, select } from '@ngrx/store';
import { first, tap } from 'rxjs/operators';
import { Observable, noop, BehaviorSubject, pipe } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  avatar: string = '';
  is_email_verified = 0;
  count: any;
  count_friend:any;
  count_friend_request:any;
  isLoading: any = false;
  count_noti:any;
  constructor(
    private route: Router,
    private auth: AuthenticationService,
    private renderer: Renderer,
    private avt: UserService,
    private store: Store<AppState>,
    private toastr: ToastrService,
    private pusherService: PusherService
  ) { }

  ngOnInit() {

    this.avt.profileImage.subscribe(img => this.avatar = img);

  /*   this.store.select(countUser)
    .subscribe(data => {
      this.count = data;
    }); */

    this.store.select(emailVerified)
      .subscribe(isEmailVerified => {
        this.is_email_verified = isEmailVerified;
      });

    this.auth.onlineusers()
    .subscribe(user => {
      this.count = user.count;
    });

    this.auth.friends_count()
    .subscribe(user => {
      this.count_friend = user.count;
    });
    this.auth.friends_request_count()
    .subscribe(user => {
      this.count_friend_request = user.count;
    });



    this.auth.noti()
    .subscribe(user => {
      this.count_noti = user.info;
    });


  }

  onAnchorClick(event) {
    var target = event.currentTarget;
    if(target.parentElement.className.indexOf("photo-edit-icon-active") === -1) {
      this.renderer.setElementClass(target.parentElement, "photo-edit-icon-active", true);
      target.parentElement.nextSibling.style.display = "block";
    }
    else {
      target.parentElement.classList.remove("photo-edit-icon-active");
      target.parentElement.nextSibling.style.display = "none";
    }

  }

  verifyEmail(){
    this.isLoading = true;
    this.auth.verifyEmail()
      .subscribe(data => {
        if(data.code === 200) {
          this.isLoading = false;
          this.toastr.success('Please check your email!');
        }
      });
  }


   logout() {

     this.auth.logout()
      .subscribe(user => {
        const decoded = jwt_decode(localStorage.getItem('token'));
        this.pusherService.checkLoggedin(decoded.id);
          this.store.dispatch(new Logout());
        if(user.code === 200) {

          window.location.href = "/";
         //this.route.navigate(['/'])
        }
      })


  }

}

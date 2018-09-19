import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { countUser, emailVerified } from '../../auth/auth.selectors';
import { UserService } from '../user.service';
import { Logout } from '../../auth/auth.actions';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  avatar: string = '';
  is_email_verified = 0;
  count: any;
  isLoading: any = false;
  constructor(
    private auth: AuthenticationService,
    private avt: UserService,
    private store: Store<AppState>,
    private toastr: ToastrService
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
      })

    this.auth.onlineusers()
    .subscribe(user =>{
      this.count = user.count;
    })


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
        if(user.code === 200) {
          this.store.dispatch(new Logout());
          window.location.href = "/";
        }
      })


  }

}

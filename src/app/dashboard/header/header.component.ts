import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { countUser } from '../../auth/auth.selectors';
import { UserService } from '../user.service';
import { Logout } from '../../auth/auth.actions';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  avatar: string = '';
  constructor(
    private auth: AuthenticationService, 
    private avt: UserService,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.avt.profileImage.subscribe(img => this.avatar = img);

  /*   this.store.select(countUser)
    .subscribe(data => {
      this.count = data;
    }); */

    this.auth.onlineusers()
    .subscribe(user =>{
      this.count = user.count;
    })


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

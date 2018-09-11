import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../reducers';
import { profileImg, userDetails } from '../../auth/auth.selectors';
import { tap } from 'rxjs/operators';
import { noop } from '@angular/compiler/src/render3/view/util';
import { UserService } from '../user.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  avatar: string = '';
  constructor(private auth: AuthenticationService, private avt: UserService) { }

  ngOnInit() {
    this.avt.profileImage.subscribe(img => this.avatar = img);
  }

  logout() {
    //this.auth.logout();

    this.auth.logout()
    .subscribe(data => {
    })
  }

}

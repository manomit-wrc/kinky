import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services';
import { first, tap, debounceTime } from 'rxjs/operators';
import {noop, Subject} from "rxjs";
@Component({
  selector: 'app-online-users',
  templateUrl: './online-users.component.html',
  styleUrls: ['./online-users.component.css']
})
export class OnlineUsersComponent implements OnInit {
users : any;
  constructor(
    private auth: AuthenticationService,
  ) { }

  ngOnInit() {

    this.auth.fetch_online_users()
    .pipe(
      tap(data => {
    console.log(data);
    this.users = data.user;
      })
    ).subscribe(
      noop,
      () => alert('Failed')
    );

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


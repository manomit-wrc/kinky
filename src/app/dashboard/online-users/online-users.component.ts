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

  constructor(
    private auth: AuthenticationService,
  ) { }

  ngOnInit() {

    this.auth.fetch_online_users()
    .pipe(
      tap(data => {
        alert();
console.log(data);
      })
    ).subscribe(
      noop,
      () => alert('Failed')
    );

  }

}


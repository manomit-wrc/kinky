import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, noop, BehaviorSubject, pipe } from 'rxjs';
import { AuthenticationService } from '../../services';
import { first, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {

  constructor(
    private router: ActivatedRoute,
    private auth: AuthenticationService,
  ) { }

  ngOnInit() {
    this.auth.message_list()
    .pipe(
      tap(data => {


      })
    ).subscribe(noop);
  }

}

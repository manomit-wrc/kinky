import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, noop, BehaviorSubject, pipe } from 'rxjs';
import { AuthenticationService } from '../../services';
import { first, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import * as jwt_decode from 'jwt-decode';
@Component({
  selector: 'app-message-chat',
  templateUrl: './message-chat.component.html',
  styleUrls: ['./message-chat.component.css']
})
export class MessageChatComponent implements OnInit {
  message_text:any;
  session_id: any;
  messageList:any = [];
  user_id:any;
  order: any = 'requested_add';
  reverse:any = false;
  constructor(
    private router: ActivatedRoute,
    private auth: AuthenticationService,
  ) { }

  ngOnInit() {
    this.session_id = this.router.snapshot.params.user_id;

    const decoded = jwt_decode(localStorage.getItem('token'));
    this.user_id= decoded.id;
    this.auth.message_list_by_user(this.session_id)
    .pipe(
      tap(data => {
    this.messageList = data.info;

      })
    ).subscribe(noop);
  }

  submit_message() {
    this.auth.submit_message(this.session_id,this.message_text,'','','')
    .pipe(
      tap(data => {
        if(data.code ===200){
          this.message_text = "";
          this.auth.message_list_by_user(this.session_id)
    .pipe(
      tap(datas => {
    this.messageList = datas.info;

      })
    ).subscribe(noop);
        }
      })
    ).subscribe(noop);
  }
}

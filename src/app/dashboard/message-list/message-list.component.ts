import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { noop } from 'rxjs';
import { AuthenticationService } from '../../services';
import { tap } from 'rxjs/operators';


@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {

  messageList: any;

  constructor(
    private router: ActivatedRoute,
    private auth: AuthenticationService,
  ) { }

  ngOnInit() {
    this.auth.message_list()
    .pipe(
      tap(data => {
        this.messageList = data.messageList;
        
      })
    ).subscribe(noop);
  }

}

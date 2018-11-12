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
  limit:any = 10;
  order:any = 'requset_add';
  reverse:any = false;
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


  removeAll(id){
    if(confirm("Are you sure to delete")) {
      this.auth.removeAllMesasage(id)
      .pipe(
        tap(data => {

          if(data.code ===200){
            this.auth.message_list()
    .pipe(
      tap(datas => {
        this.messageList = datas.messageList;
      })
    ).subscribe(noop);
          }

        })
      ).subscribe(noop);
    }

  }

  loadMore(){
this.limit +=10;
  }

}

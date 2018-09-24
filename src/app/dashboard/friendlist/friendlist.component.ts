import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, noop, BehaviorSubject, pipe } from 'rxjs';
import {SearchService} from '../../services/search.service';
import { first, tap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../reducers';
@Component({
  selector: 'app-friendlist',
  templateUrl: './friendlist.component.html',
  styleUrls: ['./friendlist.component.css']
})
export class FriendlistComponent implements OnInit {
results:any  =[];
list:any  =[];
friend_list:any = [];
  constructor(private router: ActivatedRoute,public search: SearchService,private toastr: ToastrService, private store: Store<AppState>) { }
  tab: String = 'tab1';
  ngOnInit() {
        this.search.fetchInvitation()
        .pipe(
          tap(datas => {
            this.results = datas.info;
          })
    ).subscribe(noop);

        this.search.show_invetation_list()
        .pipe(
          tap(datas => {
            this.list = datas.info;
          })
    ).subscribe(noop);
        this.search.friend_list()
        .pipe(
          tap(datas => {
            this.friend_list = datas.info;
          })
    ).subscribe(noop);

  }

  displayTab(value) {
    this.tab = value;
  }

  accept(id){
    this.search.accept(id)
    .pipe(
      tap(datas => {
        this.toastr.success(datas.msg);
        this.results = datas.info;
      })
).subscribe(noop);
  }

  reject(id){
    this.search.reject(id)
    .pipe(
      tap(datas => {
        this.toastr.success(datas.msg);
        this.results = datas.info;
        window.location.reload();
      })
).subscribe(noop);
  }

  cancel_invetation(id){
    this.search.cancel_invetation(id)
    .pipe(
      tap(datas => {
        this.toastr.success(datas.msg);
        this.list = datas.info;
        window.location.reload();
      })
).subscribe(noop);
  }
  friend_remove(id){
    this.search.friend_remove(id)
    .pipe(
      tap(datas => {
        this.toastr.success(datas.msg);
        this.friend_list = datas.info;
        window.location.reload();
      })
).subscribe(noop);
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

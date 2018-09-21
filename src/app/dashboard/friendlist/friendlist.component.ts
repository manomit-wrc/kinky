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

  constructor(private router: ActivatedRoute,public search: SearchService,private toastr: ToastrService, private store: Store<AppState>) { }
  tab: String = 'tab1';
  ngOnInit() {
        this.search.fetchInvitation()
        .pipe(
          tap(datas => {
            this.results = datas.info;

          })
    ).subscribe(noop);

  }

  displayTab(value) {
    this.tab = value;
  }

}

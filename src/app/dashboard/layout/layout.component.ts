import { Component, OnInit, AfterViewInit, Renderer2, ElementRef } from '@angular/core';
import { PusherService } from '../pusher.service';
import * as jwt_decode from 'jwt-decode';
import { AuthenticationService } from '../../services';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../reducers';
import { postMasters } from '../dashboard.actions';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit, AfterViewInit {
  constructor(
    private renderer: Renderer2,
    private elRef: ElementRef,
    private pusherService: PusherService,
    private auth: AuthenticationService,
    private store: Store<AppState>,
  ) { }

  ngOnInit() {
    //alert("Loading");
    const decoded = jwt_decode(localStorage.getItem('token'));
    this.pusherService.checkLoggedin(decoded.id);

    this.auth.post_list()
    .subscribe(datas => {
console.log('====================================');
console.log(datas);
console.log('====================================');
      const posts = datas.info;
      this.store.dispatch(new postMasters({ posts }));
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {

      this.renderer.selectRootElement(this.elRef.nativeElement.querySelector('.loader-wrap')).style.display = 'none';
    }, 2000);
  }

}

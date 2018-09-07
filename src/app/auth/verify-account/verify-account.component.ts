import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../services';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { Login } from '../auth.actions';

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.css']
})
export class VerifyAccountComponent implements OnInit {
  message: string = '';
  code: boolean = false;
  isLoading: boolean = false;
  constructor( 
    private route: ActivatedRoute, 
    private auth: AuthenticationService, 
    private router: Router ,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    
    this.auth.checkActivation(this.route.snapshot.params.link)
    .subscribe(data => {
      if(data.code === 200) {
        this.code = true;
      }
      this.message = data.message;
    })
  }

  verify() {
    this.isLoading = true;
    this.auth.activateAccount(this.route.snapshot.params.link)
    .subscribe(data => {
      this.isLoading = false;
      if(data.code === 200) {
        const info = data.info;
        localStorage.setItem('token', data.token);
        this.store.dispatch(new Login({ info }));
        window.location.href = "/my-profile";
      }
      else {
        this.code = false;
        this.message = data.message;
      }
    })
  }

}

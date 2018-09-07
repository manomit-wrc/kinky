import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services';
import { first, tap, debounceTime } from 'rxjs/operators';
import {noop, Subject} from "rxjs";
import { Router } from '@angular/router';

import * as jwt_decode from 'jwt-decode';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { Login } from '../auth.actions';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private _error = new Subject<string>();
  errorMessage: string;

  loginForm: FormGroup;
  loading = false;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthenticationService,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    
    this._error.subscribe((message) => this.errorMessage = message);
    
    this._error.pipe(
      debounceTime(2000)
    ).subscribe(() => this.errorMessage = null);

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    try {
      const decoded = jwt_decode(localStorage.getItem('token'));
      if (decoded) {
        this.router.navigateByUrl('/my-profile');
      }
    } catch (error) {

    }
  }

  get f() { return this.loginForm.controls; }

  onLoginSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    this.loading = true;

    this.auth.login(this.f.username.value, this.f.password.value)
      .pipe(
        tap(data => {
          localStorage.setItem("token", data.token);
          const info = data.info;
          this.loading = false;
          if ( data.code !== 200) {
           
            this._error.next(data.message);
     } else {
            this.store.dispatch(new Login({ info }));
            //this.router.navigateByUrl('/my-profile');
            window.location.href = "/my-profile";
          }
        })
      ).subscribe(
        noop,
        () => alert('Login Failed')
      );


  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services';
import { first, tap, debounceTime } from 'rxjs/operators';
import {noop, Subject} from "rxjs";
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { Login, Settings,Count } from '../auth.actions';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private _error = new Subject<string>();
  errorMessage: string;
  ipaddress:any='';
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthenticationService,
    private router: Router,
    private store: Store<AppState>,
    private http:HttpClient
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
     this.http.get<{ip: String}>('https://jsonip.com')
      .subscribe( datas => {
        this.ipaddress = datas.ip;
        this.auth.login(this.f.username.value, this.f.password.value, this.ipaddress)
          .pipe(
            tap(data => {

              localStorage.setItem("token", data.token);
              const info = data.info;
              const settings = data.settings;
              const counts = data.count;
              this.loading = false;
              if ( data.code !== 200) {
                this.loading = false;
                this._error.next(data.message);
         } else {
                this.store.dispatch(new Login({ info }));
                this.store.dispatch(new Settings({ settings }))
                this.store.dispatch(new Count({ counts }))
                window.location.href = "/my-profile";
              }
            })
          ).subscribe(
            noop,
            (err) => {
            this.loading = false;
            console.log(err);
            alert('Login Failed');
            }

          );
      });


  }

}

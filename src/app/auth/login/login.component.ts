import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services';
import { first, tap, debounceTime } from 'rxjs/operators';
import {noop, Subject} from "rxjs";
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import * as jwt_decode from 'jwt-decode';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../reducers';
import { Login, Settings,Count } from '../auth.actions';
import { getIPAddress,locationDetails } from '../auth.selectors';
import { postMasters } from '../../dashboard/dashboard.actions';

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
  lat:any = 0;
  lon:any = 0;
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
      debounceTime(1000)
    ).subscribe(() => this.errorMessage = null);

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.store.pipe(
      select(getIPAddress),
      tap(data => {
        if(data !== undefined) {

          this.ipaddress = data.query;
        }

      })
    ).subscribe(noop);

    try {
      const decoded = jwt_decode(localStorage.getItem('token'));
      if (decoded) {
        this.router.navigateByUrl('/my-profile');
      }
    } catch (error) {

    }

    this.store.pipe(
      select(locationDetails),
      tap(data => {
        if(data !== undefined) {
          this.lat = data.lat;
          this.lon = data.lon;
        }
      })
    ).subscribe(noop);
  }

  get f() { return this.loginForm.controls; }

   onLoginSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    this.loading = true;
    this.auth.login(this.f.username.value, this.f.password.value, this.ipaddress , this.lat , this.lon)
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
          this.auth.post_list()
          .subscribe(datas => {
            const posts = datas.info;
            this.store.dispatch(new postMasters({ posts }));
          });
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

  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services';
import { debounceTime } from 'rxjs/operators';
import { Subject} from "rxjs";

import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { Login, Settings } from '../auth.actions';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  private _success = new Subject<string>();
  private _error = new Subject<string>();
  successMessage: string;
  errorMessage: string;

  signupForm: FormGroup;


  signupLoading = false;

  signupSubmitted = false;
  day:any =[];
  month:any =[];
  year:any =[];

  gender: string = '';
  isShow: boolean = false;
  termsConditions = false;
  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthenticationService,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit() {

    this.day = [

      '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17',
       '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'
      ];

      this.month = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

      for (let i = 1970; i <=  new Date().getFullYear(); i++) {
        this.year.push(i);
      }

    this._error.subscribe((message) => this.errorMessage = message);
    this._error.pipe(
      debounceTime(2000)
    ).subscribe(() => this.errorMessage = null);


    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(4000)
    ).subscribe(() => this.successMessage = null)

    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      DD: ['', Validators.compose([Validators.required, Validators.maxLength(2), Validators.min(1), Validators.max(31)])],
      MM: ['', Validators.compose([Validators.required, Validators.maxLength(2), Validators.min(1), Validators.max(12)])],
      YYYY: ['', Validators.compose([Validators.required, Validators.maxLength(4), Validators.max(2018)])]
    });


  }

  get signup() { return this.signupForm.controls; }


  getSex(value) {
    this.gender = value;

  }
  nextForm() {

    if (this.gender === '') {
      this._error.next('Please choose your sex');
    } else {
      this.isShow = true;
    }
  }

  terms(e) {
    if (e.target.checked) {
      this.termsConditions = true;
    } else {
      this.termsConditions = false;
    }
  }

  onSignupSubmit() {
    this.signupSubmitted = true;
    if (this.signupForm.invalid) {

      return;
    }
    if (!this.termsConditions) {

      this._error.next('Please select terms and conditions');
      return;
    }

   this.signupLoading = true;
    this.auth.signup(
      this.signup.username.value,
      this.signup.password.value,
      this.signup.email.value,
      this.signup.DD.value,
      this.signup.MM.value,
      this.signup.YYYY.value,
      this.gender)
    .subscribe(data => {
      this.signupLoading = false;
      if (data.code === 200) {
        localStorage.setItem("token", data.token);
        const info = data.info;
        const settings = data.settings;
        this.store.dispatch(new Login({ info }));
        this.store.dispatch(new Settings({ settings }));
        window.location.href = "/settings";
      } else {
        this._error.next(data.message);
        }
    });
  }


}

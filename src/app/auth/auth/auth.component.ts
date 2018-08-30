import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AlertsService } from 'angular-alert-module';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  loginForm: FormGroup;
  signupForm: FormGroup;
  forgotForm: FormGroup;
  loading = false;
  signupLoading = false;
  submitted = false;
  signupSubmitted = false;
  forgotSubmitted = false;
  error = '';
  errorMsg: any;
  closeAlert = false;
  gender: string = '';
  isShow: boolean = false;
  termsConditions = false;

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthenticationService,
    private router: Router,
    private alerts: AlertsService
  ) { }

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      DD: ['', Validators.compose([Validators.required, Validators.maxLength(2), Validators.min(1), Validators.max(31)])],
      MM: ['', Validators.compose([Validators.required, Validators.maxLength(2), Validators.min(1), Validators.max(12)])],
      YYYY: ['', Validators.compose([Validators.required, Validators.maxLength(4), Validators.max(2018)])]
    });

    this.forgotForm = this.formBuilder.group({
      email: ['', Validators.required],
    });

    try {
      const decoded = jwt_decode(localStorage.getItem('token'));
      if (decoded) {
        this.router.navigate(['settings']);
      }
    } catch (error) {

    }
  }

  get f() { return this.loginForm.controls; }

  get signup() { return this.signupForm.controls; }

  get forgotpassword() { return this.forgotForm.controls; }

  getSex(value) {
    this.gender = value;

  }
  nextForm() {

    if (this.gender === '') {
      this.alerts.setMessage('Please select your gender!', 'error');
    } else {
      this.isShow = true;
    }
  }

  onLoginSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    this.loading = true;
    this.auth.login(this.f.username.value, this.f.password.value)
    .pipe(first())
    .subscribe(data => {
      localStorage.setItem('token', data.token);
      if ( data.code !== 200) {
        this.loading = false;
          this.errorMsg = data.message;
          setTimeout(() => {
            this.closeAlert = true;
            this.errorMsg = '';
            console.log(this.closeAlert);
           }, 1500);
           this.closeAlert = false;

      } else {
        this.router.navigate(['settings']);
      }
    });
  }

  terms(e) {
    if(e.target.checked) {
      this.termsConditions = true;
    }
    else {
      this.termsConditions = false;
    }
  }

  onSignupSubmit() {
    this.signupSubmitted = true;
    if (this.signupForm.invalid) {

      return;
    }
    if (!this.termsConditions) {
      this.alerts.setMessage("Please checked terms and conditions",'error');
      return;
    }
    window.scrollTo(0, 0);
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
        this.alerts.setMessage(data.message, 'success');
      } else {
        this.alerts.setMessage(data.message, 'error');
        }
    });
  }

  onForgotSubmit() {
    this.forgotSubmitted = true;
    if (this.forgotForm.invalid) {

      return;
    }
    this.loading = true;
    this.auth.forgot_password(this.forgotpassword.email.value)
    .pipe(first())
    .subscribe(data => {
      this.loading = false;
      if ( data.code !== 200) {


        this.alerts.setMessage('Please insert correct your email or username!', 'error');

      } else {

        this.alerts.setMessage('Please check your email for change your passowrd', 'success');
        this.router.navigate(['/']);
      }
    });
  }



}

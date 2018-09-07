import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services';
import { first, tap, debounceTime } from 'rxjs/operators';
import {noop, Subject} from "rxjs";

import { Router } from '@angular/router';

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
  
  
  gender: string = '';
  isShow: boolean = false;
  termsConditions = false;
  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {

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
        this._success.next(data.message);
      } else {
        this._error.next(data.message);
        }
    });
  }


}

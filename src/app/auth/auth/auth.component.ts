import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AlertsService } from 'angular-alert-module';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  loginForm: FormGroup;
  signupForm: FormGroup;
  loading = false;
  signupLoading = false;
  submitted = false;
  signupSubmitted = false;
  error = '';
  errorMsg:any;
  closeAlert = false;
  gender: string = '';
  isShow: boolean = false;

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
    })


  }

  get f() { return this.loginForm.controls; }

  get signup() { return this.signupForm.controls; }

  getSex(value) {
    this.gender = value;
    
  }
  nextForm() {
    
    if(this.gender === '') {
      this.alerts.setMessage('Please select your gender!','error');
    }
    else {
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
        this.router.navigate(['/settings']);
      }
    });
  }

  onSignupSubmit() {
    this.signupSubmitted = true;
    if(this.signupForm.invalid) {
      
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
      console.log(data);
    })
  }

}

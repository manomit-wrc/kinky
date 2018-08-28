import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

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

  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthenticationService,
    private router: Router
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
      YYYY: ['', Validators.compose([Validators.required, Validators.maxLength(4)])]
    });


  }

  get f() { return this.loginForm.controls; }

  get signup() { return this.signupForm.controls; }

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
    if (this.signupForm.invalid) {
      console.log(this.signupForm);
      return;
    }
  }

}

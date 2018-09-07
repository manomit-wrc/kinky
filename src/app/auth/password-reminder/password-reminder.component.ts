import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first, tap, debounceTime } from 'rxjs/operators';
import { AuthenticationService } from '../../services';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-password-reminder',
  templateUrl: './password-reminder.component.html',
  styleUrls: ['./password-reminder.component.css']
})
export class PasswordReminderComponent implements OnInit {

  private _success = new Subject<string>();
  private _error = new Subject<string>();
  successMessage: string;
  errorMessage: string;

  forgotForm: FormGroup;
  forgotSubmitted = false;
  loading = false;

  constructor(private formBuilder: FormBuilder,
    private auth: AuthenticationService,) { }

  ngOnInit() {

    this._error.subscribe((message) => this.errorMessage = message);
    this._error.pipe(
      debounceTime(2000)
    ).subscribe(() => this.errorMessage = null);


    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(4000)
    ).subscribe(() => this.successMessage = null)

    this.forgotForm = this.formBuilder.group({
      email: ['', Validators.required],
    });
  }

  get forgotpassword() { return this.forgotForm.controls; }

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
      if(!data.success) {
        this._error.next(data.message);
      }
      else {
        this._success.next(data.message);
      }
      
    });
  }

}

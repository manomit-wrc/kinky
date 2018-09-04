import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services';
import { AlertsService } from 'angular-alert-module';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  success: boolean = false;
  message: string = '';
  forgotForm: FormGroup;
  submitted = false;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private auth: AuthenticationService ,
    private formBuilder: FormBuilder,
    private alerts: AlertsService
  ) { }

  ngOnInit() {
    this.forgotForm = this.formBuilder.group({
      password: ['', Validators.required],
      c_password: ['', Validators.required]
    }, {
      validator: this.auth.MatchPassword 
    });
    this.auth.checkForgotPassword(this.route.snapshot.params.link)
      .subscribe(data => {
        this.success = data.success;
        this.message = data.message;
      })
  }

  get f() { return this.forgotForm.controls; }

  onForgotSubmit() {
    this.submitted = true;
    if (this.forgotForm.invalid) {
      
      return;
    }
    this.loading = true;
    this.auth.updateForgotPassword(this.f.password.value, this.route.snapshot.params.link)
      .subscribe(data => {
        this.alerts.setMessage(data.message, 'success');
        setTimeout(() => {
          window.location.href = "/";
        }, 3000);
      })
  }

}

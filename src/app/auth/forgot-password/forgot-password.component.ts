import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { AuthenticationService } from '../../services';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  private _success = new Subject<string>();
  success: boolean = false;
  message: string;
  successMessage: string;
  forgotForm: FormGroup;
  submitted = false;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private auth: AuthenticationService ,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {

    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(3000)
    ).subscribe(() => {
      this.successMessage = null;
      window.location.href = "/";
    })

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
      });
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
        this._success.next(data.message);
      });
  }

}

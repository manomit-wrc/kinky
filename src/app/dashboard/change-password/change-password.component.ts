import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,AbstractControl } from '@angular/forms';
import { AuthenticationService } from '../../services';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changePassForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  errorMsg:any;
  closeAlert = false;
  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.changePassForm = this.formBuilder.group({
      password: ['', Validators.compose([Validators.required, Validators.maxLength(20), Validators.min(1), Validators.minLength(5)])],
      c_password: ['', Validators.compose([Validators.required, Validators.maxLength(20), Validators.min(1), Validators.minLength(5)])],
    }, {
      validator: this.auth.MatchPassword // your validation method
    });
  }

  get changePassword() { return this.changePassForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.changePassForm.invalid) {
        return;
    }
    this.loading = true;

}


}

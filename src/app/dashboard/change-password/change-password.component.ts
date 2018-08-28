import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  successMsg: any;
  errorMsg: any;
  closeAlert = false;
  closeAlert1 = false;
  gender: any;
  constructor(
    private formBuilder: FormBuilder,
    private auth: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.changePassForm = this.formBuilder.group({
      old_password: ['', Validators.required],
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
    this.auth.change_password(this.changePassword.old_password.value, this.changePassword.password.value)
    .pipe(first())
    .subscribe(data => {
      this.loading = false;
      if (data.code !== 200) {
        this.loading = false;
          this.errorMsg = data.message;
          setTimeout(() => {
            this.closeAlert = true;
            this.errorMsg = '';
            console.log(this.closeAlert);
           }, 1500);
           this.closeAlert = false;

      } else {
        this.changePassForm.reset();
        this.successMsg = data.message;
        setTimeout(() => {
          this.closeAlert1 = true;
          this.successMsg = '';
          console.log(this.closeAlert);
         }, 1500);

      }
    });

}


}

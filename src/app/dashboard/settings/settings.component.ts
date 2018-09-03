import { Component,  OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AlertsService } from 'angular-alert-module';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  autReplyForm: FormGroup;
  details$: Observable<any>;
  tab: string = 'tab1';
  switch: any;
  instant_msg: any;
  autoReplySubmitted = false;
  more_settings = false;
  autReplyLoading = false;
  auto_reply_subject: string = '';
  auto_reply_body: string = '';
  enable_auto_reply: boolean = false;
  promotionLoading: boolean = false;
  promotion_chk: boolean = false;
  promotion: string = '3';

  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private alerts: AlertsService,
    private formBuilder: FormBuilder
  ) { }

  async ngOnInit() {
    this.autReplyForm = this.formBuilder.group({
      auto_reply_subject: ['', Validators.required],
      auto_reply_body: ['', Validators.required],
      enable_auto_reply: [false, Validators.required]
    });
 this.details$ = this.auth.user_details();
 
 this.details$
    .pipe(first())
    .subscribe(data => {
      
      this.switch = data.value.info.gender !== undefined ? data.value.info.gender : '';
      this.instant_msg = data.value.info.instant_msg !== undefined ? data.value.info.instant_msg.toString() : '0';
      this.auto_reply_subject = data.value.info.auto_reply_subject !== undefined ? data.value.info.auto_reply_subject: '';
      this.auto_reply_body = data.value.info.auto_reply_body !== undefined ? data.value.info.auto_reply_body: '';
      this.enable_auto_reply = data.value.info.enable_auto_reply !== undefined ? data.value.info.enable_auto_reply: false;
      this.promotion = data.value.info.promotion !== undefined ? data.value.info.promotion : '3';
      this.promotion_chk = data.value.info.promotion_chk !== undefined ? data.value.info.promotion_chk : false;
    })
 
  }

  get f() { return this.autReplyForm.controls; }

  displayTab(value) {
    this.tab = value;
  }

  updateInstantMsg(value) {
    this.auth.updateInstantMessage(value)
      .subscribe(data => {
        if(data.code === 200) {
          this.alerts.setMessage('Instant Messenger settings updated successfully', 'success');
        }
      })
  }
  onAutoReplySubmit() {
    this.autoReplySubmitted = true;
    if (this.autReplyForm.invalid) {

      return;
    }
    this.autReplyLoading = true;
    this.auth.updateAutoReplyEmail(this.f.auto_reply_subject.value, this.f.auto_reply_body.value, this.f.enable_auto_reply.value)
      .subscribe(data => {
        this.autReplyLoading = false;
        this.alerts.setMessage('Auto reply email settings updated successfully', 'success');
      })
  }
  toggleSetting() {
    this.more_settings = !this.more_settings;
    
  }

  onUpdatePromotion(promotion, promotion_chk) {
    this.promotionLoading = true;
    this.auth.updatePromotion(promotion, promotion_chk)
      .subscribe(data => {
        window.scrollTo(0,0);
        this.promotionLoading = false;
        this.alerts.setMessage('Promotion settings updated successfully', 'success');
      })
  }

}

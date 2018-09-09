import { Component,  OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../services';
import { first, tap, debounceTime } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppState } from '../../reducers';
import { userDetails, settingDetails } from '../../auth/auth.selectors';
import { Subject } from 'rxjs';
import { Settings } from '../../auth/auth.actions';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  private _success = new Subject<string>();
  private _error = new Subject<string>();
  
  autReplyForm: FormGroup;
  details: any;
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

  successMessage: string;
  errorMessage: string;

  constructor(
    private auth: AuthenticationService,
    private router: Router,
    private formBuilder: FormBuilder,
    private store: Store<AppState>
  ) { }

  ngOnInit() {

    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(4000)
    ).subscribe(() => this.successMessage = null)

    this.autReplyForm = this.formBuilder.group({
      auto_reply_subject: ['', Validators.required],
      auto_reply_body: ['', Validators.required],
      enable_auto_reply: [false, Validators.required]
    });

    this.store.select(settingDetails)
    .subscribe(data => {
      if(data !== null) {
        this.details = data;
        this.switch = data.gender !== undefined ? data.gender : '';
        this.instant_msg = data.instant_msg !== undefined ? data.instant_msg.toString() : '0';
        this.auto_reply_subject = data.auto_reply_subject !== undefined ? data.auto_reply_subject: '';
        this.auto_reply_body = data.auto_reply_body !== undefined ? data.auto_reply_body: '';
        this.enable_auto_reply = data.enable_auto_reply !== undefined ? data.enable_auto_reply: false;
        this.promotion = data.promotion !== undefined ? data.promotion : '3';
        this.promotion_chk = data.promotion_chk !== undefined ? data.promotion_chk : false;
      }
      else {
        
        this.switch = '';
        this.instant_msg =  '0';
        this.auto_reply_subject = '';
        this.auto_reply_body = '';
        this.enable_auto_reply = false;
        this.promotion = '3';
        this.promotion_chk = false;
      }
      
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
          window.scrollTo(0,0);
          const settings = data.settings;
          this.store.dispatch(new Settings({ settings }))
          this._success.next(data.message);
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
        window.scrollTo(0,0);
        const settings = data.settings;
        this.store.dispatch(new Settings({ settings }))
        this._success.next(data.message);
      })
  }
  toggleSetting() {
    this.more_settings = !this.more_settings;
    
  }

  onUpdatePromotion(promotion, promotion_chk) {
    this.promotionLoading = true;
    this.auth.updatePromotion(promotion, promotion_chk)
      .subscribe(data => {
        
        this.promotionLoading = false;
        window.scrollTo(0,0);
        const settings = data.settings;
        this.store.dispatch(new Settings({ settings }))
        this._success.next(data.message);
      })
  }

}

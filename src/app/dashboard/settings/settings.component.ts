import { Component,  OnInit } from '@angular/core';
import { AuthenticationService } from '../../services';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  details$: Observable<any>;
  tab: string = 'tab1';
  switch: any;
  instant_msg: any;
  constructor(
    private auth: AuthenticationService,
    private router: Router
  ) { }

  async ngOnInit() {
 
 this.details$ = this.auth.user_details();
 this.auth.user_details()
 .pipe(first())
 .subscribe(data => {
    this.switch = data.value.info.gender !== undefined ? data.value.info.gender : '';
    this.instant_msg = data.value.info.instant_msg !== undefined ? data.value.info.instant_msg : '0';
 });

  }

  displayTab(value) {
    this.tab = value;
  }

  updateInstantMsg(value) {
    this.auth.updateInstantMessage(value)
      .subscribe(data => {
        console.log(data);
      })
  }

}

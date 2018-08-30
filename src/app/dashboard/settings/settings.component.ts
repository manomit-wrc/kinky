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
  constructor(
    private auth: AuthenticationService,
    private router: Router
  ) { }

  async ngOnInit() {
 
 this.details$ = this.auth.user_details();
 this.auth.user_details()
 .pipe(first())
 .subscribe(data => {

this.switch = data.value.info.gender;

 });

  }

  displayTab(value) {
    this.tab = value;
  }

}

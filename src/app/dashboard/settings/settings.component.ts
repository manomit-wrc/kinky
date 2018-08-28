import { Component,  OnInit } from '@angular/core';
import { AuthenticationService } from '../../services';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  details: any;
  userObj: any;
  constructor(
    private auth: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.userObj = {
      key: 'value'
    };
    alert("In Parent Component");

    this.auth.user_details()
    .subscribe(data => {
     this.details = data.info;

    });


  }

}

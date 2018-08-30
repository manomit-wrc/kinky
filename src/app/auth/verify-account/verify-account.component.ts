import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../services';

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrls: ['./verify-account.component.css']
})
export class VerifyAccountComponent implements OnInit {
  message: string = '';
  code: boolean = false;
  isLoading: boolean = false;
  constructor( private route: ActivatedRoute, private auth: AuthenticationService, private router: Router ) { }

  ngOnInit() {
    
    this.auth.checkActivation(this.route.snapshot.params.link)
    .subscribe(data => {
      if(data.code === 200) {
        this.code = true;
      }
      this.message = data.message;
    })
  }

  verify() {
    this.isLoading = true;
    this.auth.activateAccount(this.route.snapshot.params.link)
    .subscribe(data => {
      this.isLoading = false;
      if(data.code === 200) {
        localStorage.setItem('token', data.token);
        this.router.navigate(['settings']);
      }
      else {
        this.code = false;
        this.message = data.message;
      }
    })
  }

}

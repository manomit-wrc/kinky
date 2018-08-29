import {Component, OnInit, Input} from '@angular/core';
import { AuthenticationService } from '../../services';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
@Component({
  selector: 'app-interests',
  templateUrl: './interests.component.html',
  styleUrls: ['./interests.component.css']
})
export class InterestsComponent implements OnInit {
  @Input() userObj: any ;
  gender: string = '';
  country: any = '';
  state: any = '';
  constructor(
    private auth: AuthenticationService,
    private router: Router
    ) { }

  ngOnInit() {
    this.userObj.subscribe(data => {
      this.gender = data.value.info.gender;
    });

    this.auth.country()
    .pipe(first())
    .subscribe(data => {
    this.country = data.data;
    this.auth.state(data.data[0]._id)
    .pipe(first())
    .subscribe(datas => {
    this.state = datas.data;

    });

    });



  }

  onItemChange(e) {
    this.auth.state(e)
    .pipe(first())
    .subscribe(data => {
    this.state = data.data;

    });
  }

}

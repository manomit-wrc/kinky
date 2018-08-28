import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-interests',
  templateUrl: './interests.component.html',
  styleUrls: ['./interests.component.css']
})
export class InterestsComponent implements OnInit {
  @Input() userObj: any ;
  email: string = '';
  constructor() { }

  ngOnInit() {
    this.userObj.subscribe(data => {
      
      this.email = data.value.info.email;
    })
  }

}

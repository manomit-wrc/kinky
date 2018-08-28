import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-interests',
  templateUrl: './interests.component.html',
  styleUrls: ['./interests.component.css']
})
export class InterestsComponent implements OnInit {
  @Input() userObj: any ;
  constructor() { }

  ngOnInit() {
    alert("In Child component");
    console.log(this.userObj);
  }

}

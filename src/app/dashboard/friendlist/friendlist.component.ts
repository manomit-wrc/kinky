import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-friendlist',
  templateUrl: './friendlist.component.html',
  styleUrls: ['./friendlist.component.css']
})
export class FriendlistComponent implements OnInit {

  constructor() { }
  tab: String = 'tab1';
  ngOnInit() {
  }

  displayTab(value) {
    this.tab = value;
  }

}

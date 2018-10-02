import { Component, OnInit, AfterViewInit, Renderer2, ElementRef } from '@angular/core';
import { PusherService } from '../pusher.service';
import * as jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit, AfterViewInit {
  constructor( 
    private renderer: Renderer2, 
    private elRef: ElementRef,
    private pusherService: PusherService
  ) { }

  ngOnInit() {
    //alert("Loading");
    const decoded = jwt_decode(localStorage.getItem('token'));
    this.pusherService.checkLoggedin(decoded.id);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      
      this.renderer.selectRootElement(this.elRef.nativeElement.querySelector('.loader-wrap')).style.display = 'none';
    }, 2000);
  }

}

import { Component, OnInit, AfterViewInit, Renderer2, ElementRef } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit, AfterViewInit {
  constructor( private renderer: Renderer2, private elRef: ElementRef ) { }

  ngOnInit() {
    //alert("Loading");
  }

  ngAfterViewInit() {
    setTimeout(() => {
      
      this.renderer.selectRootElement(this.elRef.nativeElement.querySelector('.loader-wrap')).style.display = 'none';
    }, 2000);
  }

}

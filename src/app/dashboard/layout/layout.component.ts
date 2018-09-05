import { Component, OnInit, AfterViewInit, Renderer2, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import { AuthenticationService } from '../../services';
import { tap } from 'rxjs/operators';
import { noop } from 'rxjs';
import { LoadMaster } from '../dashboard.actions';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit, AfterViewInit {
  constructor( 
    private renderer: Renderer2, 
    private elRef: ElementRef,
    private store: Store<AppState>,
    private auth: AuthenticationService 
  ) { }

  ngOnInit() {
    //alert("Loading");
    this.auth.loadMaster()
      .pipe(
        tap(masters => {
          this.store.dispatch(new LoadMaster({ masters }))
        })
      )
      .subscribe(
        noop
      )
  }

  ngAfterViewInit() {
    setTimeout(() => {
      
      this.renderer.selectRootElement(this.elRef.nativeElement.querySelector('.loader-wrap')).style.display = 'none';
    }, 3000);
  }

}

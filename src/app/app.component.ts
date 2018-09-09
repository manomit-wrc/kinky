import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { noop } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from './reducers';
import { AuthenticationService } from './services';
import { loadMasters } from './dashboard/dashboard.actions'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private store: Store<AppState>,
    private auth: AuthenticationService) {}

  ngOnInit() {

    
    this.auth.loadMaster()
    .pipe(tap(masters => {
      this.store.dispatch(new loadMasters({ masters }));
    })).subscribe(noop)
  }
}

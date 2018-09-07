import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers';
import { profileImg } from '../auth/auth.selectors';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private image = new BehaviorSubject('');
  profileImage = this.image.asObservable();
  constructor(private store: Store<AppState>) { 
    this.store.select(profileImg)
      .subscribe(data => {
        this.image.next(data);
    })
  }
}

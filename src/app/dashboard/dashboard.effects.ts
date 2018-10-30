import { Injectable } from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {DashboardActionTypes, loadMasters, postMasters} from './dashboard.actions';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';
import {defer, of} from 'rxjs';

@Injectable()
export class DashboardEffects {

  @Effect({dispatch:false})
  masters$ = this.actions$.pipe(
    ofType<loadMasters>(DashboardActionTypes.LOAD_MASTERS),
    tap(action => localStorage.setItem("masters", JSON.stringify(action.payload.masters)))
  );

  @Effect({ dispatch: false })
  posts$ = this.actions$.pipe(
  ofType<postMasters>(DashboardActionTypes.POST_MASTERS),
  tap(action => localStorage.setItem("posts", JSON.stringify(action.payload.posts)))
)


  @Effect()
  init$ = defer(() => {

    const masterData = localStorage.getItem("masters");
    const postData = localStorage.getItem("posts");

    if (masterData || postData) {
       return of(
         new loadMasters({masters:JSON.parse(masterData)}),
         new postMasters({posts:JSON.parse(postData)})

        );
    }


  });





  constructor(private actions$: Actions, private router:Router) {


  }

}

import { Injectable } from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {DashboardActionTypes, loadMasters} from './dashboard.actions';
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

  @Effect()
  init$ = defer(() => {

    const masterData = localStorage.getItem("masters");

    if (masterData) {
       return of(new loadMasters({masters:JSON.parse(masterData)}));
    }
    

  });

  constructor(private actions$: Actions, private router:Router) {


  }

}
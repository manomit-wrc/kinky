import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {throwError} from 'rxjs';
import {catchError, concatMap, exhaustMap, filter, map, mergeMap, withLatestFrom} from "rxjs/operators";
import * as fromActions from './dashboard.actions';
import { AuthenticationService } from '../services/authentication.service';




@Injectable()
export class DashboardEffects {
  constructor(
    private actions$: Actions,
    private auth: AuthenticationService
  ) {}      

  @Effect() 
  loadAllCourses$ = this.actions$
  .pipe(
    ofType<fromActions.loadCountries>(fromActions.DashboardActionTypes.LOAD_COUNTRIES),
    mergeMap(action => this.auth.country()),
    map(countries => new fromActions.loadCountriesSuccess({countries})),
    catchError(err => {
      console.log('error loading course ', err);
      return throwError(err);
    })
  );

}

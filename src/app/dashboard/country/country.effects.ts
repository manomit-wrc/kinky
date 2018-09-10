import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import { AllCountriesLoaded, AllCountriesRequested, CountryActionTypes } from './country.actions';
import {throwError} from 'rxjs';
import {catchError, concatMap, exhaustMap, filter, map, mergeMap, withLatestFrom} from "rxjs/operators";
import { AuthenticationService } from '../../services/authentication.service';
import { AppState } from '../../reducers';
import {select, Store} from '@ngrx/store';
import { allCountriesLoaded } from './country.selectors';


@Injectable()
export class CountryEffects {

  @Effect()
  loadAllCountries$ = this.actions$
    .pipe(
      ofType<AllCountriesRequested>(CountryActionTypes.AllCountriesRequested),
      withLatestFrom(this.store.pipe(select(allCountriesLoaded))),
      filter(([action, allCountriesLoaded]) => !allCountriesLoaded),
      mergeMap(() => this.auth.country()),
      map(countries => new AllCountriesLoaded({countries})),
      catchError(err => {
        console.log('error loading all countries ', err);
        return throwError(err);
      })
  );

  constructor(private actions$ :Actions, private auth: AuthenticationService,
    private store: Store<AppState>) {

  }
}

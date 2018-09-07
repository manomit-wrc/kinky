import { Action } from '@ngrx/store';

export enum DashboardActionTypes {
  LOAD_COUNTRIES = '[Load Countries ] Action',
  LOAD_COUNTRIES_SUCCESS = '[Load Countries Suceess] Action'
}


export class loadCountries implements Action {
  readonly type = DashboardActionTypes.LOAD_COUNTRIES;
}

export class loadCountriesSuccess implements Action {
  readonly type = DashboardActionTypes.LOAD_COUNTRIES_SUCCESS;
  constructor ( public payload: { countries: any }) {}
}

export type DashboardActions = loadCountries | loadCountriesSuccess;

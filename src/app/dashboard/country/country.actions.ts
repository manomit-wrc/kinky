import { Action } from '@ngrx/store';
import { Country } from '../models/country';

export enum CountryActionTypes {
  AllCountriesRequested = '[Countries] All Countries Requested',
  AllCountriesLoaded = '[Countries API] All Countries Loaded',
}

export class AllCountriesRequested implements Action {
  readonly type = CountryActionTypes.AllCountriesRequested;
}

export class AllCountriesLoaded implements Action {

  readonly type = CountryActionTypes.AllCountriesLoaded;

  constructor(public payload: { countries: Country[] }) {

  }

}

export type CountryActions = AllCountriesRequested | AllCountriesLoaded;

import {createFeatureSelector, createSelector} from '@ngrx/store';

import {CountryState} from './country.reducer';

import * as fromCountries from './country.reducer';

export const selectCountriesState = createFeatureSelector<CountryState>("country");

export const selectAllCountries = createSelector(
    selectCountriesState,
    fromCountries.selectAllCountries
);

export const allCountriesLoaded = createSelector(
    selectCountriesState,
    countriesState => countriesState.allCountriesLoaded
);
  
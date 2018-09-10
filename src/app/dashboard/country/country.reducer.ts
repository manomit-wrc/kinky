import { Country } from '../models/country';
import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import { CountryActions, CountryActionTypes } from './country.actions';


export const adapter = createEntityAdapter<Country>();

export interface CountryState extends EntityState<Country> {
  allCountriesLoaded: boolean;
}




export const initialCoursesState: CountryState = adapter.getInitialState({
  allCountriesLoaded: false
});
  

export function countriesReducer(state = initialCoursesState , action: CountryActions): CountryState {

  switch(action.type) {

    case CountryActionTypes.AllCountriesLoaded:

      return adapter.addAll(action.payload.countries, {...state, allCountriesLoaded:true});

    default: {

      return state;
    }

  }
}
export const {
  selectIds,
  selectEntities,
  selectTotal,
  selectAll

} = adapter.getSelectors();

export const selectAllCountries = selectAll;

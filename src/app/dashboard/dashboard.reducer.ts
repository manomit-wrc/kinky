import { Action, createFeatureSelector, createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { DashboardActions, DashboardActionTypes } from './dashboard.actions';

export interface DashboardState extends EntityState<any> {
	countries: any;
}

export const adapter: EntityAdapter<any> = createEntityAdapter<any>();



export const initialState: DashboardState = adapter.getInitialState({ 
  countries: undefined
});

export function dashBoardReducer(state = initialState, action: DashboardActions): DashboardState {
  switch(action.type) {
    case DashboardActionTypes.LOAD_COUNTRIES_SUCCESS: {
      return adapter.addAll(action.payload.countries,{...state });
    }
       
    default: {
      return state;
    }
  }	
}


export const {
  selectAll: selectAllCountries
} = adapter.getSelectors();



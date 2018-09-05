import { Action } from '@ngrx/store';
import { DashboardActions, DashboardActionTypes } from './dashboard.actions'

export interface DashboardState {
  masters: any
}

export const initialDashboardState: DashboardState = {
  masters: undefined
};

export function dashBoardReducer(state = initialDashboardState, action: DashboardActions): DashboardState {
  switch (action.type) {

    case DashboardActionTypes.LoadMasterAction:
      return {
        ...state,
        masters: action.payload.masters
      };

    default:
      return state;
  
  }
}

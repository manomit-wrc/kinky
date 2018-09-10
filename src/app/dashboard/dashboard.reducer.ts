import { DashboardActions, DashboardActionTypes} from './dashboard.actions';

export interface DashboardState {
  masters: any;
}

export const initialState: DashboardState = {
  masters: undefined
}

export function dashBoardReducer(state = initialState, action: DashboardActions): DashboardState {
  switch(action.type) {
    case DashboardActionTypes.LOAD_MASTERS:
      return {
        ...state,
        masters: action.payload.masters
      }
  }
}
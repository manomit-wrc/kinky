import { DashboardActions, DashboardActionTypes} from './dashboard.actions';
import { Action } from '@ngrx/store';

export interface DashboardState {
  masters: any;
  posts:any;
}

export const initialState: DashboardState = {
  masters: undefined,
  posts:undefined
}

export function dashBoardReducer(state = initialState, action: DashboardActions): DashboardState {
  switch(action.type) {
    case DashboardActionTypes.LOAD_MASTERS:
      return {
        ...state,
        masters: action.payload.masters
      };
    case DashboardActionTypes.POST_MASTERS:
      
      return {
        ...state,
        posts: action.payload.posts
      };
  }
}

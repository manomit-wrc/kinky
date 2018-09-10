import { Action } from '@ngrx/store';
import { AuthActions, AuthActionTypes} from './auth.actions';

export interface AuthState {
  loggedIn: boolean,
  user: any,
  images: any,
  settings: any
}

export const initialAuthState: AuthState = {
  loggedIn: false,
  user: undefined,
  images: undefined,
  settings: undefined
};

export function authReducer(state = initialAuthState,
                            action: AuthActions): AuthState {
  switch (action.type) {

    case AuthActionTypes.LoginAction:
      return {
        ...state,
        loggedIn: true,
        user: action.payload.info
      };

    case AuthActionTypes.LogoutAction:
        return {
          ...state,
          loggedIn: false,
          user: undefined
        };
    case AuthActionTypes.USER_SETTINGS:
        return {
          ...state,
          settings: action.payload.settings
        }

    default:
      return state;
  }
}
import { Action } from '@ngrx/store';
import { AuthActions, AuthActionTypes} from './auth.actions';

export interface AuthState {
  loggedIn: boolean,
  user: any,
  images: any
}

export const initialAuthState: AuthState = {
  loggedIn: false,
  user: undefined,
  images: undefined
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

    default:
      return state;
  }
}
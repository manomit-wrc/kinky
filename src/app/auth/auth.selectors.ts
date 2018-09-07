import {createSelector} from '@ngrx/store';


export const selectAuthState = state => state.auth;


export const isLoggedIn = createSelector(
  selectAuthState,
  auth => auth.loggedIn
);


export const isLoggedOut = createSelector(
  isLoggedIn,
  loggedIn => !loggedIn
);

export const userDetails = createSelector(
  selectAuthState,
  auth => auth.user
)

export const profileImg = createSelector(
  selectAuthState,
  auth => auth.user.avatar
)

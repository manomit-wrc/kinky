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

export const settingDetails = createSelector(
  selectAuthState,
  auth => auth.settings
)

export const profileImg = createSelector(
  selectAuthState,
  auth => auth.user !== undefined ? auth.user.avatar: null
)

export const locationDetails = createSelector(
  selectAuthState,
  auth => auth.location
)

export const countUser = createSelector(
  selectAuthState,
  auth => auth.counts !== undefined ? auth.counts: null
)

export const profileImages = createSelector(
  selectAuthState,
  auth => auth.user.images
)

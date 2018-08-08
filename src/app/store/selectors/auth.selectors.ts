import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';
import * as fromAuth from '../reducers/auth.reducer';

export const selectAuthenticated = createSelector(
  fromFeature.selectAuthenticationState,
  fromAuth.getAuthenticated
);

export const selectAuthenticationLoading = createSelector(
  fromFeature.selectAuthenticationState,
  fromAuth.getLoading
);

export const selectAuthenticationLoaded = createSelector(
  fromFeature.selectAuthenticationState,
  fromAuth.getLoaded
);

export const selectLoggingOut = createSelector(
  fromFeature.selectAuthenticationState,
  fromAuth.getLoggingOut
);

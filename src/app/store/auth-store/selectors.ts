import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './state';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectCurrentUser = createSelector(
  selectAuthState,
  (state: AuthState) => state.currentUser
);

export const selectCurrentUserData = createSelector(
  selectAuthState,
  (state: AuthState) => state.currentUserData
);

export const selectUserDataLoading = createSelector(
  selectAuthState,
  (state: AuthState) => state.userDataLoading
);

export const selectLoggingOut = createSelector(
  selectAuthState,
  (state: AuthState) => state.loggingOut
);

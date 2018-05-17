import { createSelector } from '@ngrx/store';
import * as fromFeature from '../reducers';
import * as fromLogin from '../reducers/login.reducer';

export const selectLoggingIn = createSelector(
  fromFeature.selectLoginState,
  fromLogin.getLoggingIn
);

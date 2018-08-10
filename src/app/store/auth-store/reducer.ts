import { merge } from 'ramda';
import { AuthActionsTypes, AuthActionsUnion } from './actions';
import { AuthState, initialState } from './state';

export function authReducer(
  state: AuthState = initialState,
  action: AuthActionsUnion
): AuthState {
  switch (action.type) {
    case AuthActionsTypes.SetCurrentUser: {
      return merge(state, { currentUser: action.payload.user });
    }
    case AuthActionsTypes.Logout: {
      return merge(state, { loggingOut: true });
    }
    case AuthActionsTypes.LogoutSuccess: {
      return merge(state, { loggingOut: false, currentUser: null });
    }
    case AuthActionsTypes.LogoutFail: {
      return merge(state, { loggingOut: false });
    }
    default: {
      return state;
    }
  }
}

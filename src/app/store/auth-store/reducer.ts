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
    case AuthActionsTypes.LoadCurrentUserData: {
      return merge(state, { userDataLoading: true });
    }
    case AuthActionsTypes.LoadCurrentUserDataSuccess: {
      return merge(state, {
        userDataLoading: false,
        currentUserData: action.payload.data
      });
    }
    case AuthActionsTypes.LoadCurrentUserDataFail: {
      return merge(state, { userDataLoading: false });
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

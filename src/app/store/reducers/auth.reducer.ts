import { AuthActionsTypes, AuthActionsUnion } from './../actions/auth.actions';

export interface AuthState {
  authenticated: boolean;
  loading: boolean;
  loaded: boolean;
}

export const initialState: AuthState = {
  authenticated: false,
  loading: false,
  loaded: false
};

export function authReducer(
  state: AuthState = initialState,
  action: AuthActionsUnion
): AuthState {
  switch (action.type) {
    case AuthActionsTypes.Authenticate: {
      return {
        ...state,
        loading: true
      };
    }
    case AuthActionsTypes.AuthenticationSuccess: {
      return {
        ...state,
        loading: false,
        authenticated: true,
        loaded: true
      };
    }
    case AuthActionsTypes.AuthenticationFail: {
      return {
        ...state,
        loading: false,
        authenticated: false,
        loaded: true
      };
    }
    case AuthActionsTypes.Logout: {
      return state;
    }
    case AuthActionsTypes.LogoutSuccess: {
      return {
        ...state,
        authenticated: false
      };
    }
    case AuthActionsTypes.LogoutFail: {
      return state;
    }
    default: {
      return state;
    }
  }
}

export const getAuthenticated = (state: AuthState) => state.authenticated;
export const getLoading = (state: AuthState) => state.loading;
export const getLoaded = (state: AuthState) => state.loaded;

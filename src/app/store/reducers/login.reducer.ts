import { LoginActionsUnion, LoginActionsTypes } from '../actions/login.actions';

export interface LoginState {
  loggingIn: boolean;
}

export const initialState: LoginState = {
  loggingIn: false
};

export function loginReducer(
  state: LoginState = initialState,
  action: LoginActionsUnion
) {
  switch (action.type) {
    case LoginActionsTypes.Login: {
      return {
        ...state,
        loggingIn: true
      };
    }
    case LoginActionsTypes.LoginSuccess: {
      return {
        ...state,
        loggingIn: false
      };
    }
    case LoginActionsTypes.LoginFail: {
      return {
        ...state,
        loggingIn: false
      };
    }
    default: {
      return state;
    }
  }
}

export const getLoggingIn = (state: LoginState) => state.loggingIn;

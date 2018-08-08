import { LoginActionsUnion } from '../actions/login.actions';

export const initialState = {};

export function loginReducer(state = initialState, action: LoginActionsUnion) {
  switch (action.type) {
    default: {
      return state;
    }
  }
}

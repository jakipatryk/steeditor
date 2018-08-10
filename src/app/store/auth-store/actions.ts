import { Action } from '@ngrx/store';

export enum AuthActionsTypes {
  SetCurrentUser = '[Auth] Set Current User',
  Login = '[Auth] Login',
  Logout = '[Auth] Logout',
  LogoutSuccess = '[Auth] Logout Success',
  LogoutFail = '[Auth] Logout Fail'
}

export class SetCurrentUser implements Action {
  public readonly type = AuthActionsTypes.SetCurrentUser;

  constructor(public payload: { user: string | null }) {}
}

export class Login implements Action {
  public readonly type = AuthActionsTypes.Login;
}

export class Logout implements Action {
  public readonly type = AuthActionsTypes.Logout;
}

export class LogoutSuccess implements Action {
  public readonly type = AuthActionsTypes.LogoutSuccess;
}

export class LogoutFail implements Action {
  public readonly type = AuthActionsTypes.LogoutFail;
}

export type AuthActionsUnion =
  | SetCurrentUser
  | Login
  | Logout
  | LogoutSuccess
  | LogoutFail;

export const setCurrentUser = (user: string | null): SetCurrentUser =>
  new SetCurrentUser({ user });

export const login = (): Login => new Login();

export const logout = (): Logout => new Logout();

export const logoutSuccess = (): LogoutSuccess => new LogoutSuccess();

export const logoutFail = (): LogoutFail => new LogoutFail();

export const authActionCreators = {
  setCurrentUser,
  login,
  logout,
  logoutSuccess,
  logoutFail
};

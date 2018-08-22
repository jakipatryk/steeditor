import { Action } from '@ngrx/store';
import { UserData } from './models';

export enum AuthActionsTypes {
  SetCurrentUser = '[Auth] Set Current User',
  LoadCurrentUserData = '[Auth] Load Current User Data',
  LoadCurrentUserDataSuccess = '[Auth] Load Current User Data Success',
  LoadCurrentUserDataFail = '[Auth] Load Current User Data Fail',
  Login = '[Auth] Login',
  Logout = '[Auth] Logout',
  LogoutSuccess = '[Auth] Logout Success',
  LogoutFail = '[Auth] Logout Fail'
}

export class SetCurrentUser implements Action {
  public readonly type = AuthActionsTypes.SetCurrentUser;

  constructor(public payload: { user: string | null }) {}
}

export class LoadCurrentUserData implements Action {
  public readonly type = AuthActionsTypes.LoadCurrentUserData;
}

export class LoadCurrentUserDataSuccess implements Action {
  public readonly type = AuthActionsTypes.LoadCurrentUserDataSuccess;

  constructor(public payload: { data: UserData }) {}
}

export class LoadCurrentUserDataFail implements Action {
  public readonly type = AuthActionsTypes.LoadCurrentUserDataFail;

  constructor(public payload: { error: any }) {}
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
  | LoadCurrentUserData
  | LoadCurrentUserDataSuccess
  | LoadCurrentUserDataFail
  | Login
  | Logout
  | LogoutSuccess
  | LogoutFail;

export const setCurrentUser = (user: string | null): SetCurrentUser =>
  new SetCurrentUser({ user });

export const loadCurrentUserData = (): LoadCurrentUserData =>
  new LoadCurrentUserData();

export const loadCurrentUserDataSuccess = (
  data: UserData
): LoadCurrentUserDataSuccess => new LoadCurrentUserDataSuccess({ data });

export const loadCurrentUserDataFail = (error: any): LoadCurrentUserDataFail =>
  new LoadCurrentUserDataFail({ error });

export const login = (): Login => new Login();

export const logout = (): Logout => new Logout();

export const logoutSuccess = (): LogoutSuccess => new LogoutSuccess();

export const logoutFail = (): LogoutFail => new LogoutFail();

export const authActionCreators = {
  setCurrentUser,
  loadCurrentUserData,
  loadCurrentUserDataSuccess,
  loadCurrentUserDataFail,
  login,
  logout,
  logoutSuccess,
  logoutFail
};

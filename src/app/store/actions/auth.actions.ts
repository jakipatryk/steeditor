import { SuperAction, SuperActionWithPayload } from './../../shared/interfaces';

// ACTIONS CONSTANTS

export enum AuthActionsTypes {
  Authenticate = '[Root/Auth] Authentication',
  AuthenticationSuccess = '[Root/Auth] Authentication Success',
  AuthenticationFail = '[Root/Auth] Authentication Fail',
  Logout = '[Root/Auth] Logout',
  LogoutSuccess = '[Root/Auth] Logout Success',
  LogoutFail = '[Root/Auth] Logout Fail'
}

// ACTION TYPESCRIPT TYPES

export type Authenticate = SuperAction<AuthActionsTypes.Authenticate>;
export type AuthenticationSuccess = SuperAction<
  AuthActionsTypes.AuthenticationSuccess
>;
export type AuthenticationFail = SuperAction<
  AuthActionsTypes.AuthenticationFail
>;
export type Logout = SuperAction<AuthActionsTypes.Logout>;
export type LogoutSuccess = SuperAction<AuthActionsTypes.LogoutSuccess>;
export type LogoutFail = SuperAction<AuthActionsTypes.LogoutFail>;
export type AuthActionsUnion =
  | Authenticate
  | AuthenticationSuccess
  | AuthenticationFail
  | Logout
  | LogoutSuccess
  | LogoutFail;

// ACTION CREATORS

export const authenticate = (): Authenticate => ({
  type: AuthActionsTypes.Authenticate
});

export const authenticationSuccess = (): AuthenticationSuccess => ({
  type: AuthActionsTypes.AuthenticationSuccess
});

export const authenticationFail = (): AuthenticationFail => ({
  type: AuthActionsTypes.AuthenticationFail
});

export const logout = (): Logout => ({
  type: AuthActionsTypes.Logout
});

export const logoutSuccess = (): LogoutSuccess => ({
  type: AuthActionsTypes.LogoutSuccess
});

export const logoutFail = (): LogoutFail => ({
  type: AuthActionsTypes.LogoutFail
});

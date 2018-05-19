import { SuperAction } from './../../shared/interfaces';

// ACTIONS CONSTANTS

export enum LoginActionsTypes {
  Login = '[Root/Login] Login',
  LoginCallback = '[Root/Login] Login Callback',
  LoginSuccess = '[Root/Login] Login Success',
  LoginFail = '[Root/Login] Login Fail'
}

// ACTION TYPESCRIPT TYPES

export type Login = SuperAction<LoginActionsTypes.Login>;
export type LoginCallback = SuperAction<LoginActionsTypes.LoginCallback>;
export type LoginSuccess = SuperAction<LoginActionsTypes.LoginSuccess>;
export type LoginFail = SuperAction<LoginActionsTypes.LoginFail>;
export type LoginActionsUnion =
  | Login
  | LoginCallback
  | LoginSuccess
  | LoginFail;

// ACTION CREATORS

export const login = (): Login => ({ type: LoginActionsTypes.Login });

export const loginCallback = (): LoginCallback => ({
  type: LoginActionsTypes.LoginCallback
});

export const loginSuccess = (): LoginSuccess => ({
  type: LoginActionsTypes.LoginSuccess
});

export const loginFail = (): LoginFail => ({
  type: LoginActionsTypes.LoginFail
});

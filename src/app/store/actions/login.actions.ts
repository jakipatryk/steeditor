import { SuperAction } from './../../shared/interfaces';

// ACTIONS CONSTANTS

export enum LoginActionsTypes {
  Login = '[Root/Login] Login'
}

// ACTION TYPESCRIPT TYPES

export type Login = SuperAction<LoginActionsTypes.Login>;
export type LoginActionsUnion = Login;

// ACTION CREATORS

export const login = (): Login => ({ type: LoginActionsTypes.Login });

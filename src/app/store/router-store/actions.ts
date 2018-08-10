import { NavigationExtras } from '@angular/router';
import { Action } from '@ngrx/store';

export enum RouterActionsTypes {
  GO = '[Router] Go',
  BACK = '[Router] Back',
  FORWARD = '[Router] Forward'
}

export class Go implements Action {
  public readonly type = RouterActionsTypes.GO;
  constructor(
    public payload: {
      path: any[];
      query?: object;
      extras?: NavigationExtras;
    }
  ) {}
}

export class Back implements Action {
  public readonly type = RouterActionsTypes.BACK;
}

export class Forward implements Action {
  public readonly type = RouterActionsTypes.FORWARD;
}

export type RouterActionsUnion = Go | Back | Forward;

export const go = (to: {
  path: any[];
  query?: object;
  extras?: NavigationExtras;
}) => new Go(to);

export const back = () => new Back();

export const forward = () => new Forward();

export const routerActionCreators = {
  go,
  back,
  forward
};

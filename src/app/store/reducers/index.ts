import {
  ActivatedRouteSnapshot,
  Params,
  RouterStateSnapshot
} from '@angular/router';
import * as fromRouter from '@ngrx/router-store';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromAuth from './auth.reducer';
import * as fromLogin from './login.reducer';

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
  params: Params;
}

export interface State {
  routerReducer: fromRouter.RouterReducerState<RouterStateUrl>;
  authentication: fromAuth.AuthState;
  login: fromLogin.LoginState;
}

export const reducers: ActionReducerMap<State> = {
  routerReducer: fromRouter.routerReducer,
  authentication: fromAuth.authReducer,
  login: fromLogin.loginReducer
};

export class CustomSerializer
  implements fromRouter.RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    const { url } = routerState;
    const { queryParams } = routerState.root;

    let state: ActivatedRouteSnapshot = routerState.root;
    while (state.firstChild) {
      state = state.firstChild;
    }
    const { params } = state;

    return { url, queryParams, params };
  }
}

export const getRouterState = createFeatureSelector<
  fromRouter.RouterReducerState<RouterStateUrl>
>('routerReducer');

export const selectAuthenticationState = (state: State) => state.authentication;

export const selectLoginState = (state: State) => state.login;

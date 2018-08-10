import { RouterReducerState } from '@ngrx/router-store';
import { createFeatureSelector } from '@ngrx/store';
import { RouterStateUrl } from './serializer';

export const selectRouterState = createFeatureSelector<
  RouterReducerState<RouterStateUrl>
>('router');

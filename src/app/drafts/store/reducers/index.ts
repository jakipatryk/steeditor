import * as fromDrafts from './drafts.reducer';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

export interface State {
  draftEntities: fromDrafts.DraftsState;
}

export const reducers: ActionReducerMap<State> = {
  draftEntities: fromDrafts.draftsReducer
};

export const selectDraftsState = createFeatureSelector<State>('drafts');

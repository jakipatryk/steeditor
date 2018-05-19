import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromBroadcast from './broadcast.reducer';
import * as fromDrafts from './drafts.reducer';

export interface State {
  draftEntities: fromDrafts.DraftsState;
  broadcast: fromBroadcast.BroadcastState;
}

export const reducers: ActionReducerMap<State> = {
  draftEntities: fromDrafts.draftsReducer,
  broadcast: fromBroadcast.broadcastReducer
};

export const selectDraftsState = createFeatureSelector<State>('drafts');

import { merge } from 'ramda';
import { DraftsActionsTypes, DraftsActionsUnion } from './actions';
import { draftsAdapter, DraftsState, initialState } from './state';
import { Update } from '@ngrx/entity';

export function draftsReducer(
  state: DraftsState = initialState,
  action: DraftsActionsUnion
): DraftsState {
  switch (action.type) {
    case DraftsActionsTypes.LoadDrafts: {
      return merge(state, { loading: true, loaded: false });
    }
    case DraftsActionsTypes.LoadDraftsSuccess: {
      return merge(draftsAdapter.addAll(action.payload.drafts, state), {
        loading: false,
        loaded: true
      });
    }
    case DraftsActionsTypes.LoadDraftsFail: {
      return merge(state, { loading: false, loaded: false });
    }
    case DraftsActionsTypes.CreateDraftSuccess: {
      return draftsAdapter.addOne(action.payload.draft, state);
    }
    case DraftsActionsTypes.UpdateDraftSuccess: {
      return draftsAdapter.upsertOne(action.payload.draft, state);
    }
    case DraftsActionsTypes.RemoveDraftSuccess: {
      return draftsAdapter.removeOne(action.payload.id, state);
    }
    case DraftsActionsTypes.BroadcastDraft: {
      return merge(state, { broadcasting: true });
    }
    case DraftsActionsTypes.BroadcastDraftSuccess: {
      return merge(state, { broadcasting: false });
    }
    case DraftsActionsTypes.BroadcastDraftFail: {
      return merge(state, { broadcasting: false });
    }
    default: {
      return state;
    }
  }
}

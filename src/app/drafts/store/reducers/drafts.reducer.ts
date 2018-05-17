import {
  DraftsActionsTypes,
  DraftsActionsUnion
} from '../actions/drafts.actions';
import { Draft } from './../../models/draft.model';
import { deleteEntity } from '../../../shared/utils';

export interface DraftsState {
  entities: { [K: string]: Draft };
  loading: boolean;
  loaded: boolean;
}

export const initialState: DraftsState = {
  entities: {},
  loading: false,
  loaded: false
};

export function draftsReducer(
  state: DraftsState = initialState,
  action: DraftsActionsUnion
): DraftsState {
  switch (action.type) {
    case DraftsActionsTypes.LoadDrafts: {
      return {
        ...state,
        loading: true
      };
    }
    case DraftsActionsTypes.LoadDraftsSuccess: {
      return {
        ...state,
        loading: false,
        loaded: true,
        entities: {
          ...state.entities,
          ...action.payload
        }
      };
    }
    case DraftsActionsTypes.LoadDraftsFail: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
    case DraftsActionsTypes.CreateDraftSuccess: {
      return {
        ...state,
        entities: {
          ...state.entities,
          [action.payload.id]: action.payload
        }
      };
    }
    case DraftsActionsTypes.UpdateDraftSuccess: {
      return {
        ...state,
        entities: {
          ...state.entities,
          [action.payload.id]: action.payload
        }
      };
    }
    case DraftsActionsTypes.RemoveDraftSuccess: {
      return {
        ...state,
        entities: deleteEntity(state.entities, action.payload)
      };
    }
    default: {
      return state;
    }
  }
}

export const getDraftsEntities = (state: DraftsState) => state.entities;
export const getDraftsLoading = (state: DraftsState) => state.loading;
export const getDraftsLoaded = (state: DraftsState) => state.loaded;
export const getDraftById = (id: number) => (state: DraftsState) =>
  state.entities[id];

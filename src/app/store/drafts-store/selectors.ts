import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectRouterState } from '../router-store';
import { draftsAdapter, DraftsState } from './state';

export const selectDraftsState = createFeatureSelector<DraftsState>('drafts');

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = draftsAdapter.getSelectors();

export const selectAllDrafts = createSelector(selectDraftsState, selectAll);

export const selectDraftsEntities = createSelector(
  selectDraftsState,
  selectEntities
);

export const selectDraftsIds = createSelector(selectDraftsState, selectIds);

export const selectDraftsTotal = createSelector(selectDraftsState, selectTotal);

export const selectCurrentDraft = createSelector(
  selectDraftsEntities,
  selectRouterState,
  (entities, router) =>
    router.state && entities[parseInt(router.state.params.draftId, 10)]
);

export const selectLoading = createSelector(
  selectDraftsState,
  (state: DraftsState) => state.loading
);
export const selectLoaded = createSelector(
  selectDraftsState,
  (state: DraftsState) => state.loaded
);
export const selectBroadcasting = createSelector(
  selectDraftsState,
  (state: DraftsState) => state.broadcasting
);

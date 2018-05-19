import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../store';
import * as fromFeature from '../reducers';
import * as fromDrafts from '../reducers/drafts.reducer';

export const selectDraftsEntitiesState = createSelector(
  fromFeature.selectDraftsState,
  (state: fromFeature.State) => state.draftEntities
);

export const selectDraftsEntities = createSelector(
  selectDraftsEntitiesState,
  fromDrafts.getDraftsEntities
);

export const selectDraftsLoaded = createSelector(
  selectDraftsEntitiesState,
  fromDrafts.getDraftsLoaded
);

export const selectDraftsLoading = createSelector(
  selectDraftsEntitiesState,
  fromDrafts.getDraftsLoading
);

export const selectAllDrafts = createSelector(
  selectDraftsEntities,
  entities => {
    return Object.keys(entities).map(id => entities[parseInt(id, 10)]);
  }
);

export const selectCurrentDraft = createSelector(
  selectDraftsEntities,
  fromRoot.getRouterState,
  (entities, router) =>
    router.state && entities[parseInt(router.state.params.draftId, 10)]
);

export const selectDraftById = (id: number) =>
  createSelector(selectDraftsEntitiesState, fromDrafts.getDraftById(id));

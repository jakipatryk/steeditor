import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectRouterState } from '../router-store';
import { templatesAdapter, TemplatesState } from './state';

export const selectTemplatesState = createFeatureSelector<TemplatesState>(
  'templates'
);

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = templatesAdapter.getSelectors();

export const selectAllTemplates = createSelector(
  selectTemplatesState,
  selectAll
);

export const selectTemplatesEntities = createSelector(
  selectTemplatesState,
  selectEntities
);

export const selectTemplatesIds = createSelector(
  selectTemplatesState,
  selectIds
);

export const selectTemplatesTotal = createSelector(
  selectTemplatesState,
  selectTotal
);

export const selectCurrentTemplate = createSelector(
  selectTemplatesEntities,
  selectRouterState,
  (entities, router) =>
    router.state && entities[parseInt(router.state.params.templateId, 10)]
);

export const selectTemplatesLoading = createSelector(
  selectTemplatesState,
  (state: TemplatesState) => state.loading
);

export const selectTemplatesLoaded = createSelector(
  selectTemplatesState,
  (state: TemplatesState) => state.loaded
);

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { selectRouterState } from '../router-store';
import { postsAdapter, PostsState } from './state';

export const selectPostsState = createFeatureSelector<PostsState>('posts');

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = postsAdapter.getSelectors();

export const selectAllPosts = createSelector(selectPostsState, selectAll);

export const selectPostsEntities = createSelector(
  selectPostsState,
  selectEntities
);

export const selectPostsIds = createSelector(selectPostsState, selectIds);

export const selectPostsTotal = createSelector(selectPostsState, selectTotal);

export const selectCurrentPost = createSelector(
  selectPostsEntities,
  selectRouterState,
  (entities, router) =>
    router.state && entities[parseInt(router.state.params.postId, 10)]
);

export const selectPostsLoading = createSelector(
  selectPostsState,
  (state: PostsState) => state.loading
);

export const selectPostsBroadcasting = createSelector(
  selectPostsState,
  (state: PostsState) => state.broadcasting
);

export const selectPostsLastCheckedId = createSelector(
  selectPostsState,
  (state: PostsState) => state.lastCheckedId
);

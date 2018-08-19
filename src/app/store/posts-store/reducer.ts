import { merge } from 'ramda';
import { PostsActionsTypes, PostsActionsUnion } from './actions';
import { initialState, postsAdapter, PostsState } from './state';

export function postsReducer(
  state: PostsState = initialState,
  action: PostsActionsUnion
): PostsState {
  switch (action.type) {
    case PostsActionsTypes.LoadPosts: {
      return merge(state, { loading: true });
    }
    case PostsActionsTypes.LoadPostsSuccess: {
      return merge(postsAdapter.upsertMany(action.payload.posts, state), {
        loading: false,
        lastCheckedId: action.payload.lastCheckedId
      });
    }
    case PostsActionsTypes.LoadPostsFail: {
      return merge(state, { loading: false });
    }
    case PostsActionsTypes.SyncPost: {
      return merge(state, { loading: true });
    }
    case PostsActionsTypes.SyncPostSuccess: {
      return merge(postsAdapter.upsertOne(action.payload.post, state), {
        loading: false
      });
    }
    case PostsActionsTypes.SyncPostFail: {
      return merge(state, { loading: false });
    }
    case PostsActionsTypes.BroadcastPost: {
      return merge(state, { broadcasting: true });
    }
    case PostsActionsTypes.BroadcastPostSuccess: {
      return merge(state, { broadcasting: false });
    }
    case PostsActionsTypes.BroadcastPostFail: {
      return merge(state, { broadcasting: false });
    }
    default: {
      return state;
    }
  }
}

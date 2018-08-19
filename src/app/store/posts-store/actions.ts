import { Action } from '@ngrx/store';
import { SteeditorPost } from '../../../core';
import { BroadcastResult } from '../../steemconnect/services/steemconnect-broadcast.service';
import { Post } from './models';

export enum PostsActionsTypes {
  LoadPosts = '[Posts] Load Posts',
  LoadPostsSuccess = '[Posts] Load Posts Success',
  LoadPostsFail = '[Posts] Load Posts Fail',
  SyncPost = '[Posts] Sync Post',
  SyncPostSuccess = '[Posts] Sync Post Success',
  SyncPostFail = '[Posts] Sync Post Fail',
  BroadcastPost = '[Posts] Broadcast Post',
  BroadcastPostSuccess = '[Posts] Broadcast Post Success',
  BroadcastPostFail = '[Posts] Broadcast Post Fail'
}

export class LoadPosts implements Action {
  public readonly type = PostsActionsTypes.LoadPosts;

  constructor(public payload: { startWithId: number; limit: number }) {}
}

export class LoadPostsSuccess implements Action {
  public readonly type = PostsActionsTypes.LoadPostsSuccess;

  constructor(public payload: { posts: Array<Post>; lastCheckedId: number }) {}
}

export class LoadPostsFail implements Action {
  public readonly type = PostsActionsTypes.LoadPostsFail;

  constructor(public payload: { error: any }) {}
}

export class SyncPost implements Action {
  public readonly type = PostsActionsTypes.SyncPost;

  constructor(public payload: { id: number }) {}
}

export class SyncPostSuccess implements Action {
  public readonly type = PostsActionsTypes.SyncPostSuccess;

  constructor(public payload: { post: Post }) {}
}

export class SyncPostFail implements Action {
  public readonly type = PostsActionsTypes.SyncPostFail;

  constructor(public payload: { error: any }) {}
}

export class BroadcastPost implements Action {
  public readonly type = PostsActionsTypes.BroadcastPost;

  constructor(
    public payload: {
      updatedPost: SteeditorPost;
      originalPost: Post;
    }
  ) {}
}

export class BroadcastPostSuccess implements Action {
  public readonly type = PostsActionsTypes.BroadcastPostSuccess;

  constructor(public payload: { response: BroadcastResult }) {}
}

export class BroadcastPostFail implements Action {
  public readonly type = PostsActionsTypes.BroadcastPostFail;

  constructor(public payload: { error: any }) {}
}

export type PostsActionsUnion =
  | LoadPosts
  | LoadPostsFail
  | LoadPostsSuccess
  | SyncPost
  | SyncPostSuccess
  | SyncPostFail
  | BroadcastPost
  | BroadcastPostFail
  | BroadcastPostSuccess;

export const loadPosts = (startWithId: number, limit: number): LoadPosts =>
  new LoadPosts({ startWithId, limit });

export const loadPostsSuccess = (
  posts: Array<Post>,
  lastCheckedId: number
): LoadPostsSuccess => new LoadPostsSuccess({ posts, lastCheckedId });

export const loadPostsFail = (error: any): LoadPostsFail =>
  new LoadPostsFail({ error });

export const syncPost = (id: number): SyncPost => new SyncPost({ id });

export const syncPostSuccess = (post: Post): SyncPostSuccess =>
  new SyncPostSuccess({ post });

export const syncPostFail = (error: any): SyncPostFail =>
  new SyncPostFail({ error });

export const broadcastPost = (
  updatedPost: SteeditorPost,
  originalPost: Post
): BroadcastPost => new BroadcastPost({ updatedPost, originalPost });

export const broadcastPostSuccess = (
  response: BroadcastResult
): BroadcastPostSuccess => new BroadcastPostSuccess({ response });

export const broadcastPostFail = (error: any): BroadcastPostFail =>
  new BroadcastPostFail({ error });

export const postsActionCreators = {
  loadPosts,
  loadPostsSuccess,
  loadPostsFail,
  syncPost,
  syncPostSuccess,
  syncPostFail,
  broadcastPost,
  broadcastPostSuccess,
  broadcastPostFail
};

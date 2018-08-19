import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Post } from './models';

export interface PostsState extends EntityState<Post> {
  lastCheckedId: number;
  loading: boolean;
  broadcasting: boolean;
}

export const postsAdapter: EntityAdapter<Post> = createEntityAdapter<Post>();

export const initialState: PostsState = postsAdapter.getInitialState({
  lastCheckedId: null,
  loading: false,
  broadcasting: false
});

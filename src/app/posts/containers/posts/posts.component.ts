import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { first, tap } from 'rxjs/operators';
import {
  Post,
  postsActionCreators,
  selectAllPosts,
  selectPostsLastCheckedId,
  selectPostsLoading
} from '../../../store/posts-store';
import { State } from '../../../store/root-state';
import { routerActionCreators } from '../../../store/router-store';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostsComponent implements OnInit {
  posts$: Observable<Post[]>;
  loading$: Observable<boolean>;
  lastCheckedId$: Observable<number>;

  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.store.dispatch(postsActionCreators.loadPosts(0, 8));
    this.loading$ = this.store.select(selectPostsLoading);
    this.posts$ = this.store.select(selectAllPosts);
    this.lastCheckedId$ = this.store.select(selectPostsLastCheckedId);
  }

  editPost(id: number) {
    this.store.dispatch(routerActionCreators.go({ path: ['/posts', id] }));
  }

  loadMorePosts() {
    this.lastCheckedId$
      .pipe(
        first(),
        tap(id =>
          this.store.dispatch(
            postsActionCreators.loadPosts(
              id === 1 ? id : id - 1,
              id === 1 ? 2 : 8
            )
          )
        )
      )
      .subscribe();
  }
}

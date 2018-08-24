import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { any, equals, reverse, take } from 'ramda';
import { combineLatest, Observable } from 'rxjs';
import { map, share } from 'rxjs/operators';
import {
  Draft,
  draftsActionCreators,
  selectAllDrafts,
  selectLoading
} from '../../../store/drafts-store';
import {
  Post,
  postsActionCreators,
  selectAllPosts,
  selectPostsLoading
} from '../../../store/posts-store';
import { State } from '../../../store/root-state';
import {
  selectAllTemplates,
  selectTemplatesLoading,
  Template,
  templatesActionCreators
} from '../../../store/templates-store';
import {
  authActionCreators,
  selectCurrentUserData,
  selectUserDataLoading,
  UserData
} from './../../../store/auth-store';
import { routerActionCreators } from './../../../store/router-store';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
  drafts$: Observable<Draft[]>;
  posts$: Observable<Post[]>;
  templates$: Observable<Template[]>;
  userData$: Observable<UserData>;
  isAnythingLoading$: Observable<boolean>;

  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.isAnythingLoading$ = combineLatest(
      this.store.select(selectUserDataLoading),
      this.store.select(selectPostsLoading),
      this.store.select(selectTemplatesLoading),
      this.store.select(selectLoading)
    ).pipe(
      share(),
      map(any(equals(true)))
    );

    this.store.dispatch(authActionCreators.loadCurrentUserData());
    this.store.dispatch(postsActionCreators.loadPosts(0, 3));
    this.store.dispatch(draftsActionCreators.loadDrafts());
    this.store.dispatch(templatesActionCreators.loadTemplates());

    this.userData$ = this.store.select(selectCurrentUserData).pipe(share());
    this.posts$ = this.store.select(selectAllPosts).pipe(map(take(3)));
    this.drafts$ = this.store.select(selectAllDrafts).pipe(
      map(reverse),
      map(take(3))
    );
    this.templates$ = this.store.select(selectAllTemplates).pipe(map(take(3)));
  }

  navigateTo(what: 'posts' | 'templates' | 'drafts', id?: number) {
    if (id) {
      this.store.dispatch(routerActionCreators.go({ path: [what, id] }));
    } else {
      this.store.dispatch(routerActionCreators.go({ path: [what] }));
    }
  }
}

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { complement, isNil, mapObjIndexed, mergeDeepRight } from 'ramda';
import { Observable } from 'rxjs';
import { filter, first, map } from 'rxjs/operators';
import { steeditorizePost, SteeditorPost } from '../../../../core';
import { createEditorConfig, EditorConfig } from '../../../editor';
import {
  Post,
  postsActionCreators,
  selectCurrentPost,
  selectPostsBroadcasting
} from '../../../store/posts-store';
import { State } from '../../../store/root-state';

@Component({
  selector: 'app-post-editor',
  templateUrl: './post-editor.component.html',
  styleUrls: ['./post-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostEditorComponent implements OnInit {
  post$: Observable<Post>;
  editorConfig$: Observable<EditorConfig>;
  isBroadcasting$: Observable<boolean>;

  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.post$ = this.store.select(selectCurrentPost);
    this.editorConfig$ = this.post$.pipe(
      filter(complement(isNil)),
      map(post => post.entry),
      map(steeditorizePost),
      map(mapObjIndexed(value => ({ value }))),
      map((fields: any) =>
        createEditorConfig({
          fields: mergeDeepRight(fields, {
            beneficiaries: { disabled: true },
            percentSteemDollars: {
              max: fields.percentSteemDollars.value
            },
            maxAcceptedPayout: {
              max: fields.maxAcceptedPayout.value
            }
          })
        })
      )
    );
    this.isBroadcasting$ = this.store.select(selectPostsBroadcasting);
  }

  broadcast(post: SteeditorPost) {
    this.store.dispatch(
      postsActionCreators.broadcastPost(post, this.currentPost)
    );
  }

  private get currentPost(): Post {
    let currentPost;
    this.post$.pipe(first()).subscribe(post => (currentPost = post));
    return currentPost;
  }
}

import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { mapObjIndexed, merge, omit } from 'ramda';
import { Observable } from 'rxjs';
import { first, map, withLatestFrom } from 'rxjs/operators';
import { SteeditorPost } from '../../../../core';
import { createEditorConfig, EditorConfig } from '../../../editor';
import { selectCurrentUser } from '../../../store/auth-store';
import {
  selectBroadcasting,
  selectCurrentDraft
} from '../../../store/drafts-store';
import { State } from '../../../store/root-state';
import { Draft } from './../../../store/drafts-store';
import { draftsActionCreators } from './../../../store/drafts-store/actions';

@Component({
  selector: 'app-editor-container',
  templateUrl: './editor-container.component.html',
  styleUrls: ['./editor-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditorContainerComponent implements OnInit {
  draft$: Observable<Draft>;
  currentUser$: Observable<string | null>;
  isBroadcasting$: Observable<boolean>;
  editorConfig$: Observable<EditorConfig>;

  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.draft$ = this.store.select(selectCurrentDraft);
    this.currentUser$ = this.store.select(selectCurrentUser);
    this.isBroadcasting$ = this.store.select(selectBroadcasting);
    this.editorConfig$ = this.draft$.pipe(
      map(
        mapObjIndexed(
          (value, key) =>
            key === 'tags' && typeof value === 'string'
              ? { value: value.split(' ') }
              : { value }
        )
      ),
      map(draft => ({ fields: omit(['id'], draft) })),
      withLatestFrom(this.currentUser$),
      map(
        ([fields, user]) =>
          user
            ? createEditorConfig(fields)
            : createEditorConfig(merge(fields, { submitButtonDisabled: true }))
      )
    );
  }

  updateDraft(post: SteeditorPost): void {
    this.store.dispatch(
      draftsActionCreators.updateDraft({ ...post, id: this.currentDraft.id })
    );
  }

  broadcast(post: SteeditorPost): void {
    this.store.dispatch(
      draftsActionCreators.broadcastDraft({ ...post, id: this.currentDraft.id })
    );
  }

  private get currentDraft(): Draft {
    let currentDraft;
    this.draft$.pipe(first()).subscribe(draft => (currentDraft = draft));
    return currentDraft;
  }
}

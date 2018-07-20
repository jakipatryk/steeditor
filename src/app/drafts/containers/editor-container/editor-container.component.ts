import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { mapObjIndexed, omit } from 'ramda';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { SteeditorPost } from '../../../../core';
import { createEditorConfig, EditorConfig } from '../../../editor';
import * as fromRootStore from '../../../store';
import * as fromFeatureStore from '../../store';
import { BroadcastState } from '../../store/reducers/broadcast.reducer';
import { AuthState } from './../../../store/reducers/auth.reducer';
import { Draft } from './../../models/draft.model';

@Component({
  selector: 'app-editor-container',
  templateUrl: './editor-container.component.html',
  styleUrls: ['./editor-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditorContainerComponent implements OnInit {
  draft$: Observable<Draft>;
  authState$: Observable<AuthState>;
  broadcastState$: Observable<BroadcastState>;
  editorConfig$: Observable<EditorConfig>;

  constructor(private store: Store<fromRootStore.State>) {}

  ngOnInit() {
    this.draft$ = this.store.select(fromFeatureStore.selectCurrentDraft);
    this.authState$ = this.store.select(
      fromRootStore.selectAuthenticationState
    );
    this.broadcastState$ = this.store.select(
      fromFeatureStore.selectBroadcastState
    );
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
      map(fields => createEditorConfig(fields))
    );
  }

  updateDraft(post: SteeditorPost): void {
    this.store.dispatch(
      fromFeatureStore.updateDraft({ ...post, id: this.currentDraft.id })
    );
  }

  broadcast(post: SteeditorPost): void {
    this.store.dispatch(fromFeatureStore.broadcast(post));
  }

  private get currentDraft(): Draft {
    let currentDraft;
    this.draft$.pipe(first()).subscribe(draft => (currentDraft = draft));
    return currentDraft;
  }
}

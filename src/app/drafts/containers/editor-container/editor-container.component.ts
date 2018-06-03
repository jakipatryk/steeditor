import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
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

  constructor(private store: Store<fromRootStore.State>) {}

  ngOnInit() {
    this.draft$ = this.store.select(fromFeatureStore.selectCurrentDraft);
    this.authState$ = this.store.select(
      fromRootStore.selectAuthenticationState
    );
    this.broadcastState$ = this.store.select(
      fromFeatureStore.selectBroadcastState
    );
  }

  updateDraft(draft: Draft) {
    this.store.dispatch(fromFeatureStore.updateDraft(draft));
  }

  broadcastDraft(draft: Draft) {
    this.store.dispatch(fromFeatureStore.broadcast(draft));
  }
}

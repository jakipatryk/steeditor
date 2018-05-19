import { AuthState } from './../../../store/reducers/auth.reducer';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromRootStore from '../../../store';
import * as fromFeatureStore from '../../store';
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

  constructor(private store: Store<fromRootStore.State>) {}

  ngOnInit() {
    this.draft$ = this.store.select(fromFeatureStore.selectCurrentDraft);
    this.authState$ = this.store.select(
      fromRootStore.selectAuthenticationState
    );
  }

  updateDraft(draft: Draft) {
    this.store.dispatch(fromFeatureStore.updateDraft(draft));
  }

  broadcastDraft(draft: Draft) {
    this.store.dispatch(fromFeatureStore.broadcast(draft));
  }
}

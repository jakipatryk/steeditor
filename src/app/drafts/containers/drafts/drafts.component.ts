import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  Draft,
  draftsActionCreators,
  selectAllDrafts,
  selectLoaded,
  selectLoading
} from '../../../store/drafts-store';
import { State } from '../../../store/root-state';
import { routerActionCreators } from './../../../store/router-store';

@Component({
  selector: 'app-drafts',
  templateUrl: './drafts.component.html',
  styleUrls: ['./drafts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DraftsComponent implements OnInit {
  drafts$: Observable<Draft[]>;
  areLoading$: Observable<boolean>;
  areLoaded$: Observable<boolean>;

  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.drafts$ = this.store.select(selectAllDrafts);
    this.areLoading$ = this.store.select(selectLoading);
    this.areLoaded$ = this.store.select(selectLoaded);
    this.store.dispatch(draftsActionCreators.loadDrafts());
  }

  editDraft(id: number) {
    this.store.dispatch(routerActionCreators.go({ path: ['/drafts', id] }));
  }

  removeDraft(id: number) {
    this.store.dispatch(draftsActionCreators.removeDraft(id));
  }

  createDraft() {
    this.store.dispatch(draftsActionCreators.createDraft());
  }
}

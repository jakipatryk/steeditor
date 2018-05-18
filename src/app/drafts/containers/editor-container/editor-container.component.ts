import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromStore from '../../store';
import { Draft } from './../../models/draft.model';

@Component({
  selector: 'app-editor-container',
  templateUrl: './editor-container.component.html',
  styleUrls: ['./editor-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditorContainerComponent implements OnInit {
  draft$: Observable<Draft>;

  constructor(private store: Store<fromStore.State>) {}

  ngOnInit() {
    this.draft$ = this.store.select(fromStore.selectCurrentDraft);
  }

  updateDraft(draft: Draft) {
    this.store.dispatch(fromStore.updateDraft(draft));
  }

  broadcastDraft(draft: Draft) {
    this.store.dispatch(fromStore.broadcast(draft));
  }
}

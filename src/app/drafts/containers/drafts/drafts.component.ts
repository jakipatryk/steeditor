import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromRootStore from '../../../store';
import { NewDraftDialogComponent } from '../../components/new-draft-dialog/new-draft-dialog.component';
import * as fromTemplates from '../../templates';
import { Draft } from './../../models/draft.model';
import * as fromFeatureStore from './../../store';

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

  constructor(
    public dialog: MatDialog,
    private store: Store<fromFeatureStore.State>
  ) {}

  ngOnInit() {
    this.drafts$ = this.store.select(fromFeatureStore.selectAllDrafts);
    this.areLoading$ = this.store.select(fromFeatureStore.selectDraftsLoading);
    this.areLoaded$ = this.store.select(fromFeatureStore.selectDraftsLoaded);
    this.store.dispatch(fromFeatureStore.loadDrafts());
  }

  editDraft(id: number) {
    this.store.dispatch(new fromRootStore.Go({ path: ['/drafts', id] }));
  }

  removeDraft(id: number) {
    this.store.dispatch(fromFeatureStore.removeDraft(id));
  }

  openNewDraftDialog() {
    this.dialog
      .open(NewDraftDialogComponent, {
        data: {
          all: [...fromTemplates.all],
          entities: { ...fromTemplates.entities }
        },
        width: '400px'
      })
      .afterClosed()
      .subscribe(result => {
        // clicking out of the dialog window returns undefined
        // we want to dispatch an action only if user clicked 'Create':
        if (result) {
          this.store.dispatch(fromFeatureStore.createDraft(result));
        }
      });
  }
}

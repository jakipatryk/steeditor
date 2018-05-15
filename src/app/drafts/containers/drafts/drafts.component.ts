import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { NewDraftDialogComponent } from '../../components/new-draft-dialog/new-draft-dialog.component';
import * as fromTemplates from '../../templates';
import { Draft } from './../../models/draft.model';
import * as fromStore from './../../store';
import * as fromRoot from '../../../store';
import { selectAllDrafts } from './../../store/selectors/drafts.selectors';

@Component({
  selector: 'app-drafts',
  templateUrl: './drafts.component.html',
  styleUrls: ['./drafts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DraftsComponent implements OnInit {
  drafts$: Observable<Draft[]>;

  constructor(
    public dialog: MatDialog,
    private store: Store<fromStore.State>
  ) {}

  ngOnInit() {
    this.drafts$ = this.store.select(selectAllDrafts);
    this.store.dispatch(fromStore.loadDrafts());
  }

  editDraft(id: number) {
    this.store.dispatch(new fromRoot.Go({ path: ['/drafts', id] }));
  }

  removeDraft(id: number) {
    this.store.dispatch(fromStore.removeDraft(id));
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
          this.store.dispatch(fromStore.createDraft(result));
        }
      });
  }
}

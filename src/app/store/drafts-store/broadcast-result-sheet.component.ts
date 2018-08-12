import { Component, Inject, OnInit } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { first, tap } from 'rxjs/operators';
import { State } from '../root-state';
import { BroadcastResult } from './../../steemconnect/services/steemconnect-broadcast.service';
import { routerActionCreators } from './../router-store/actions';
import { draftsActionCreators, DraftsActionsTypes } from './actions';
import { Draft } from './models';
import { selectCurrentDraft } from './selectors';

@Component({
  selector: 'app-broadcast-result-sheet',
  template: `
  <mat-nav-list>
  <a [href]="linkToPost" mat-list-item>
    <span mat-line>Open your post</span>
    <span mat-line>See your post on Busy.org</span>
  </a>
  <a mat-list-item (click)="removeDraft()">
    <span mat-line>Remove draft</span>
  </a>
</mat-nav-list>
`
})
export class BroadcastResultSheetComponent implements OnInit {
  currentDraft$: Observable<Draft>;

  get linkToPost(): string {
    return `https://busy.org/@${this.data.result.operations[0][1].author}/${
      this.data.result.operations[0][1].permlink
    }`;
  }

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) private data: { result: BroadcastResult },
    private bottomSheetRef: MatBottomSheetRef<BroadcastResultSheetComponent>,
    private store: Store<State>,
    private actions: Actions
  ) {}

  ngOnInit() {
    this.currentDraft$ = this.store.select(selectCurrentDraft);
  }

  removeDraft() {
    this.actions
      .pipe(
        ofType(DraftsActionsTypes.RemoveDraftSuccess),
        first(),
        tap(() =>
          this.store.dispatch(routerActionCreators.go({ path: ['/drafts'] }))
        ),
        tap(() => this.bottomSheetRef.dismiss())
      )
      .subscribe();
    this.store.dispatch(draftsActionCreators.removeDraft(this.currentDraft.id));
  }

  private get currentDraft(): Draft {
    let currentDraft;
    this.currentDraft$.pipe(first()).subscribe(draft => (currentDraft = draft));
    return currentDraft;
  }
}

import { Component, Inject } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { BroadcastResult } from './../../steemconnect/services/steemconnect-broadcast.service';

@Component({
  selector: 'app-broadcast-result-sheet',
  template: `
  <mat-nav-list>
  <a [href]="linkToPost" mat-list-item>
    <span mat-line>Open updated post</span>
    <span mat-line>See your updated post on Busy.org</span>
  </a>
</mat-nav-list>
`
})
export class BroadcastResultSheetComponent {
  get linkToPost(): string {
    return `https://busy.org/@${this.data.result.operations[0][1].author}/${
      this.data.result.operations[0][1].permlink
    }`;
  }

  constructor(
    @Inject(MAT_BOTTOM_SHEET_DATA) private data: { result: BroadcastResult }
  ) {}
}

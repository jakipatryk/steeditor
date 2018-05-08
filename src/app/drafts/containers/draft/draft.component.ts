import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-draft',
  templateUrl: './draft.component.html',
  styleUrls: ['./draft.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DraftComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  onFormChanges(event) {
    console.log(event);
  }
}

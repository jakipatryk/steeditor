import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { Draft } from '../../../store/drafts-store';

@Component({
  selector: 'app-recent-drafts',
  templateUrl: './recent-drafts.component.html',
  styleUrls: ['./recent-drafts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecentDraftsComponent {
  @Input()
  drafts: Array<Draft>;
  @Output()
  selectedId = new EventEmitter<number>();
  @Output()
  seeAll = new EventEmitter<void>();

  selectDraft(id: number): void {
    this.selectedId.emit(id);
  }

  seeMore(): void {
    this.seeAll.emit();
  }
}

import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { Draft } from './../../models/draft.model';

@Component({
  selector: 'app-draft-card',
  templateUrl: './draft-card.component.html',
  styleUrls: ['./draft-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DraftCardComponent {
  @Input() draft: Draft;
  @Output() edit = new EventEmitter<number>();
  @Output() remove = new EventEmitter<number>();

  onEdit(id: number) {
    this.edit.emit(id);
  }

  onRemove(id: number) {
    this.remove.emit(id);
  }
}

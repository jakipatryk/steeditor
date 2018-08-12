import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { Template } from '../../../store/templates-store';

@Component({
  selector: 'app-template-card',
  templateUrl: './template-card.component.html',
  styleUrls: ['./template-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TemplateCardComponent {
  @Input()
  template: Template;
  @Output()
  edit = new EventEmitter<number>();
  @Output()
  remove = new EventEmitter<number>();

  onEdit(id: number) {
    this.edit.emit(id);
  }

  onRemove(id: number) {
    this.remove.emit(id);
  }
}

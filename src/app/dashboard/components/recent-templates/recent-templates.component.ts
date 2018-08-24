import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { Template } from '../../../store/templates-store';

@Component({
  selector: 'app-recent-templates',
  templateUrl: './recent-templates.component.html',
  styleUrls: ['./recent-templates.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecentTemplatesComponent {
  @Input()
  templates: Array<Template>;
  @Output()
  selectedId = new EventEmitter<number>();
  @Output()
  seeAll = new EventEmitter<void>();

  selectTemplate(id: number): void {
    this.selectedId.emit(id);
  }

  seeMore(): void {
    this.seeAll.emit();
  }
}

import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { Post } from '../../../store/posts-store';

@Component({
  selector: 'app-recent-posts',
  templateUrl: './recent-posts.component.html',
  styleUrls: ['./recent-posts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecentPostsComponent {
  @Input()
  posts: Array<Post>;
  @Output()
  selectedId = new EventEmitter<number>();
  @Output()
  seeAll = new EventEmitter<void>();

  selectPost(id: number): void {
    this.selectedId.emit(id);
  }

  seeMore(): void {
    this.seeAll.emit();
  }
}

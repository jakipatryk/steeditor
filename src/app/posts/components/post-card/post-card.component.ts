import {
  ChangeDetectionStrategy,
  Component,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { always, o, prop, tryCatch } from 'ramda';
import { getImages } from '../../../../core/steemize/withJsonMetadata';
import { Post } from '../../../store/posts-store';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostCardComponent {
  @Input()
  post: Post;
  @Output()
  edit = new EventEmitter<number>();

  get thumbnail(): string {
    const imagesFromMetadata = tryCatch(
      o(prop('image'), JSON.parse),
      always(null)
    )(this.post.entry.json_metadata);
    const imagesFromBody = getImages(this.post.entry.body);
    return imagesFromMetadata && imagesFromMetadata.length > 0
      ? `https://steemitimages.com/0x0/${imagesFromMetadata[0]}`
      : imagesFromBody.length > 0
        ? `https://steemitimages.com/0x0/${imagesFromBody[0]}`
        : null;
  }

  editPost() {
    this.edit.emit(this.post.id);
  }
}

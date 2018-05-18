import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-post-thumbnail',
  templateUrl: './post-thumbnail.component.html',
  styleUrls: ['./post-thumbnail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostThumbnailComponent {
  @Input() parent: FormGroup;
  matcher = new ErrorStateMatcher();
}

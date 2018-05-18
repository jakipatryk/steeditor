import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-post-contents',
  templateUrl: './post-contents.component.html',
  styleUrls: ['./post-contents.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostContentsComponent {
  @Input() parent: FormGroup;
  matcher = new ErrorStateMatcher();
}

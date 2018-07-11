import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input
} from '@angular/core';
import { MarkdownService } from 'ngx-markdown';
import { pipe, replace } from 'ramda';

@Component({
  selector: 'app-post-preview',
  templateUrl: './post-preview.component.html',
  styleUrls: ['./post-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostPreviewComponent implements OnInit {
  @Input() postBody: string;

  constructor(private markdownService: MarkdownService) {}

  ngOnInit() {
    this.markdownService.renderer.image = pipe(
      this.markdownService.renderer.image,
      replace(/src=/, 'style="max-width: 100%;" src=')
    );
  }
}

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  Input,
  SecurityContext,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { TdTextEditorComponent } from '@covalent/text-editor';
import { replace } from 'ramda';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { REMARKABLE } from '../../../core/remarkable';
import {
  FileUploadResponse,
  FileUploadService
} from './../../../core/services/file-upload.service';

@Component({
  selector: 'app-body-partial-form',
  templateUrl: './body-partial-form.component.html',
  styleUrls: ['./body-partial-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class BodyPartialFormComponent {
  @Input()
  parentForm: FormGroup;

  isUploading = false;
  options = {
    status: ['lines', 'words'],
    spellChecker: false,
    renderingConfig: { codeSyntaxHighlighting: true },
    previewRender: text => {
      const startingHTML = this.remarkable.render(text);
      const secureHTML = this.sanitizer.sanitize(
        SecurityContext.HTML,
        startingHTML
      );
      const improvedHTML = replace(
        /<img/g,
        '<img style="max-width: 100%;"',
        secureHTML
      );
      return improvedHTML;
    },
    toolbar: [
      {
        name: 'heading',
        className: 'mic-text_fields',
        action: editor => editor.toggleHeadingSmaller(),
        title: 'Heading'
      },
      {
        name: 'bold',
        className: 'mic-format_bold',
        action: editor => editor.toggleBold(),
        title: 'Bold'
      },
      {
        name: 'italic',
        className: 'mic-format_italic',
        action: editor => editor.toggleItalic(),
        title: 'Italic'
      },
      {
        name: 'strikethrough',
        className: 'mic-format_strikethrough editor-toolbar__section-end',
        action: editor => editor.toggleStrikethrough(),
        title: 'Strikethrough'
      },
      {
        name: 'unordered-list',
        className: 'mic-format_list_bulleted',
        action: editor => editor.toggleUnorderedList(),
        title: 'Unordered List'
      },
      {
        name: 'ordered-list',
        className: 'mic-format_list_numbered editor-toolbar__section-end',
        action: editor => editor.toggleOrderedList(),
        title: 'Ordered List'
      },
      {
        name: 'link',
        className: 'mic-insert_link',
        action: editor => editor.drawLink(),
        title: 'Insert Link'
      },
      {
        name: 'image',
        className: 'mic-insert_photo',
        action: () => this.fileInput.nativeElement.click(),
        title: 'Insert Image'
      },
      {
        name: 'code',
        className: 'mic-code editor-toolbar__section-end',
        action: editor => editor.toggleCodeBlock(),
        title: 'Code'
      },
      {
        name: 'preview',
        className: 'mic-visibility no-disable',
        action: editor => editor.togglePreview(),
        title: 'Preview'
      },
      {
        name: 'side-by-side',
        className: 'mic-chrome_reader_mode no-disable',
        action: editor => editor.toggleSideBySide(),
        title: 'Side-By-Side View'
      },
      {
        name: 'fullscreen',
        className: 'mic-fullscreen no-disable',
        action: editor => editor.toggleFullScreen(),
        title: 'Fullscreen'
      }
    ]
  };

  @ViewChild('fileInput')
  private fileInput: ElementRef<HTMLInputElement>;

  @ViewChild('textEditor')
  private textEditor: TdTextEditorComponent;

  get bodyControl(): AbstractControl {
    return this.parentForm.get('body');
  }

  constructor(
    private fileUploadService: FileUploadService,
    private snackBar: MatSnackBar,
    private changeDetector: ChangeDetectorRef,
    private sanitizer: DomSanitizer,
    @Inject(REMARKABLE) private remarkable: any
  ) {}

  uploadAndInsertImage(event) {
    this.isUploading = true;

    if (event.target) {
      const file: File = event.target.files[0];
      this.fileUploadService
        .uploadFile(file)
        .pipe(
          tap((result: FileUploadResponse) => {
            const selection = this.textEditor.simpleMDE.codemirror.getSelection();
            this.textEditor.simpleMDE.codemirror.replaceSelection(
              `![${selection || result.name}](${result.url})`
            );
            this.isUploading = false;
            this.changeDetector.detectChanges();
          }),
          catchError(err => {
            this.snackBar.open(err, 'Dismiss', {
              duration: 4000
            });
            this.isUploading = false;
            return of(err);
          })
        )
        .subscribe();
    }
  }
}

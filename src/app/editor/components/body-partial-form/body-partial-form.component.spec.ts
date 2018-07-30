import {
  ChangeDetectionStrategy,
  Component,
  DebugElement,
  ViewChild
} from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditorMaterialModule } from './../../editor-material/editor-material.module';
import { BodyPartialFormComponent } from './body-partial-form.component';
import { FileUploadService } from '../../../core/services/file-upload.service';
import { of } from 'rxjs';

@Component({
  selector: `app-host-component`,
  template: `<app-body-partial-form [parentForm]="parentForm"></app-body-partial-form>`
})
class TestHostComponent {
  @ViewChild(BodyPartialFormComponent)
  bodyPartialFormComponent: BodyPartialFormComponent;

  parentForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.parentForm = this.formBuilder.group({
      body: ['', Validators.required]
    });
  }
}

fdescribe('#EditorModule BodyPartialFormComponent', () => {
  let hostFixture: ComponentFixture<TestHostComponent>;
  let hostComponent: TestHostComponent;
  let component: BodyPartialFormComponent;

  beforeEach(async(() => {
    const fileUploadServiceStub: Partial<FileUploadService> = {
      uploadFile: (file: File) =>
        of({ name: 'super-image', url: 'https://ipfs.busy.org/423orfendfjsd' })
    };
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        EditorMaterialModule
      ],
      declarations: [TestHostComponent, BodyPartialFormComponent],
      providers: [
        { provide: FileUploadService, useValue: fileUploadServiceStub }
      ]
    })
      // `OnPush` change detection lets run change detection manually only once,
      // that's why for tests `Default` change detection has to be set
      .overrideComponent(BodyPartialFormComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    hostFixture = TestBed.createComponent(TestHostComponent);
    hostComponent = hostFixture.componentInstance;
    component = hostComponent.bodyPartialFormComponent;

    hostFixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('#bodyControl should be pointing on `parentForm.controls.body`', () => {
    expect(component.bodyControl).toBe(hostComponent.parentForm.controls.body);
  });

  it('#formatH1 should insert a `#` symbol before selected text', () => {
    component.bodyControl.setValue('abcdefghijklmnoprst');
    component.bodyTextarea.nativeElement.selectionStart = 0;
    component.bodyTextarea.nativeElement.selectionEnd = 5;
    component.formatH1();

    expect(component.bodyControl.value).toEqual('# abcdefghijklmnoprst');
  });

  it('#formatH2 should insert a `##` symbol before selected text', () => {
    component.bodyControl.setValue('abcdefghijklmnoprst');
    component.bodyTextarea.nativeElement.selectionStart = 0;
    component.bodyTextarea.nativeElement.selectionEnd = 5;
    component.formatH2();

    expect(component.bodyControl.value).toEqual('## abcdefghijklmnoprst');
  });

  it('#formatH3 should insert a `###` symbol before selected text', () => {
    component.bodyControl.setValue('abcdefghijklmnoprst');
    component.bodyTextarea.nativeElement.selectionStart = 0;
    component.bodyTextarea.nativeElement.selectionEnd = 5;
    component.formatH3();

    expect(component.bodyControl.value).toEqual('### abcdefghijklmnoprst');
  });

  it('#formatH4 should insert a `#` symbol before selected text', () => {
    component.bodyControl.setValue('abcdefghijklmnoprst');
    component.bodyTextarea.nativeElement.selectionStart = 0;
    component.bodyTextarea.nativeElement.selectionEnd = 5;
    component.formatH4();

    expect(component.bodyControl.value).toEqual('#### abcdefghijklmnoprst');
  });

  it('#formatBold should insert a `**` symbol before and after selected text', () => {
    component.bodyControl.setValue('abcdefghijklmnoprst');
    component.bodyTextarea.nativeElement.selectionStart = 2;
    component.bodyTextarea.nativeElement.selectionEnd = 5;
    component.formatBold();

    expect(component.bodyControl.value).toEqual('ab**cde**fghijklmnoprst');
  });

  it('#formatItalic should insert a `*` symbol before and after selected text', () => {
    component.bodyControl.setValue('abcdefghijklmnoprst');
    component.bodyTextarea.nativeElement.selectionStart = 2;
    component.bodyTextarea.nativeElement.selectionEnd = 5;
    component.formatItalic();

    expect(component.bodyControl.value).toEqual('ab*cde*fghijklmnoprst');
  });

  it('#formatStrikeThrough should insert a `~~` symbol before and after selected text', () => {
    component.bodyControl.setValue('abcdefghijklmnoprst');
    component.bodyTextarea.nativeElement.selectionStart = 2;
    component.bodyTextarea.nativeElement.selectionEnd = 5;
    component.formatStrikeThrough();

    expect(component.bodyControl.value).toEqual('ab~~cde~~fghijklmnoprst');
  });

  it('#formatQuote should insert a `>` symbol before selected text', () => {
    component.bodyControl.setValue('abcdefghijklmnoprst');
    component.bodyTextarea.nativeElement.selectionStart = 0;
    component.bodyTextarea.nativeElement.selectionEnd = 5;
    component.formatQuote();

    expect(component.bodyControl.value).toEqual('> abcdefghijklmnoprst');
  });

  it('#insertLink should insert a markdown link and set selected text as a alt text', () => {
    component.bodyControl.setValue('abcdefghijklmnoprst');
    component.bodyTextarea.nativeElement.selectionStart = 0;
    component.bodyTextarea.nativeElement.selectionEnd = 5;
    component.insertLink();

    expect(component.bodyControl.value).toEqual('[abcde]()fghijklmnoprst');
  });

  it('#insertImage should insert a markdown image and set selected text as a alt text (no link provided)', () => {
    component.bodyControl.setValue('abcdefghijklmnoprst');
    component.bodyTextarea.nativeElement.selectionStart = 0;
    component.bodyTextarea.nativeElement.selectionEnd = 5;
    component.insertImage();

    expect(component.bodyControl.value).toEqual('![abcde]()fghijklmnoprst');
  });

  it('#insertImage should insert a markdown image and set selected text as a alt text (link provided)', () => {
    component.bodyControl.setValue('abcdefghijklmnoprst');
    component.bodyTextarea.nativeElement.selectionStart = 0;
    component.bodyTextarea.nativeElement.selectionEnd = 5;
    component.insertImage('https://steeditor.app/image.png');

    expect(component.bodyControl.value).toEqual(
      '![abcde](https://steeditor.app/image.png)fghijklmnoprst'
    );
  });

  it('#uploadAndInsertImage should eventually insert uploaded image', () => {
    component.bodyControl.setValue('abcdefghijklmnoprst');
    component.bodyTextarea.nativeElement.selectionStart = 0;
    component.bodyTextarea.nativeElement.selectionEnd = 5;
    component.uploadAndInsertImage({ target: { files: [{}] } });

    expect(component.bodyControl.value).toEqual(
      '![abcde](https://ipfs.busy.org/423orfendfjsd)fghijklmnoprst'
    );
  });

  it('(.body__error-required) should NOT be rendered when `bodyControl` is empty but not touched', () => {
    let bodyRequiredElement: DebugElement;
    component.bodyControl.setValue('');
    component.bodyControl.markAsUntouched();
    hostFixture.detectChanges();

    bodyRequiredElement = hostFixture.debugElement.query(
      By.css('.body__error--required')
    );

    expect(bodyRequiredElement).toEqual(null);
  });

  it('(.body__error-required) should be rendered and contain correct error message when `bodyControl` is empty and touched', () => {
    let bodyRequiredElement: DebugElement;

    component.bodyControl.setValue('');
    component.bodyControl.markAsTouched();
    hostFixture.detectChanges();

    bodyRequiredElement = hostFixture.debugElement.query(
      By.css('.body__error--required')
    );

    expect(bodyRequiredElement.nativeElement.innerText).toContain(
      component.errorMessages.required
    );
  });

  it('(.body__textarea) should make `bodyControl` valid when user types correct text into it', () => {
    const bodyControl = component.bodyControl;
    const bodyTextarea: HTMLTextAreaElement = hostFixture.debugElement.query(
      By.css('.body__textarea')
    ).nativeElement;

    bodyTextarea.value = 'Test 123';
    bodyTextarea.dispatchEvent(new Event('input'));

    expect(bodyControl.valid).toBeTruthy();
  });
});

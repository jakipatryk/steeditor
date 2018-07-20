import {
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  DebugElement
} from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditorMaterialModule } from '../../editor-material/editor-material.module';
import { ThumbnailPartialFormComponent } from './thumbnail-partial-form.component';
import { By } from '@angular/platform-browser';

@Component({
  selector: `app-host-component`,
  template: `<app-thumbnail-partial-form [parentForm]="parentForm"></app-thumbnail-partial-form>`
})
class TestHostComponent {
  @ViewChild(ThumbnailPartialFormComponent)
  thumbnailPartialFormComponent: ThumbnailPartialFormComponent;

  parentForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.parentForm = this.formBuilder.group({
      body: ['', Validators.required],
      thumbnailUrl: [
        '',
        Validators.pattern(
          // tslint:disable-next-line:max-line-length
          /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/
        )
      ]
    });
  }
}

fdescribe('#EditorModule ThumbnailPartialFormComponent', () => {
  let hostFixture: ComponentFixture<TestHostComponent>;
  let hostComponent: TestHostComponent;
  let component: ThumbnailPartialFormComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        EditorMaterialModule
      ],
      declarations: [TestHostComponent, ThumbnailPartialFormComponent]
    })
      // `OnPush` change detection lets run change detection manually only once,
      // that's why for tests `Default` change detection has to be set
      .overrideComponent(ThumbnailPartialFormComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    hostFixture = TestBed.createComponent(TestHostComponent);
    hostComponent = hostFixture.componentInstance;
    component = hostComponent.thumbnailPartialFormComponent;

    hostFixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#bodyControl should be pointing on `parentForm.controls.body`', () => {
    expect(component.bodyControl).toBe(component.parentForm.controls.body);
  });

  it('#thumbnailUrlControl should be pointing on `parentForm.controls.thumbnailUrl`', () => {
    expect(component.thumbnailUrlControl).toBe(
      component.parentForm.controls.thumbnailUrl
    );
  });

  it('#currentThumbnailURL should be equal to `thumbnailUrlControl.value` if it is NOT empty', () => {
    component.thumbnailUrlControl.setValue(
      'https://imagesimgipfssuper.ipfs/12345/'
    );

    expect(component.currentThumbnailURL).toEqual(
      'https://imagesimgipfssuper.ipfs/12345/'
    );
  });

  it('#currentThumbnailURL should be taken from `bodyControl.value` if it is has any images', () => {
    component.bodyControl.setValue(
      'test test ![](https://imagesimgipfssuper.ipfs/12345/)'
    );

    expect(component.currentThumbnailURL).toEqual(
      'https://imagesimgipfssuper.ipfs/12345/'
    );
  });

  it('#currentThumbnailURL should favor thumbnail from `thumbnailUrlControl` not `bodyControl`', () => {
    component.thumbnailUrlControl.setValue(
      'https://imagesimgipfssuper.ipfs/thumbnailUrlControl/'
    );
    component.bodyControl.setValue(
      'test test ![](https://imagesimgipfssuper.ipfs/bodyControl/)'
    );

    expect(component.currentThumbnailURL).toEqual(
      'https://imagesimgipfssuper.ipfs/thumbnailUrlControl/'
    );
  });

  it('#currentThumbnailURL should be equal null if neither `thumbnailUrlControl` nor `bodyControl` have thumbnail inside', () => {
    component.thumbnailUrlControl.setValue('');
    component.bodyControl.setValue('test test');

    expect(component.currentThumbnailURL).toEqual(null);
  });

  // tslint:disable-next-line:max-line-length
  it('(.custom-thumbnail__error--pattern) should be rendered and display correct message if `thumbnailUrlControl` has `pattern` error and it is dirty', () => {
    let errorElement: DebugElement;

    component.thumbnailUrlControl.setErrors({ pattern: true });
    component.thumbnailUrlControl.markAsDirty();
    hostFixture.detectChanges();
    errorElement = hostFixture.debugElement.query(
      By.css('.custom-thumbnail__error--pattern')
    );

    expect(errorElement.nativeElement).toBeDefined();
    expect(errorElement.nativeElement.innerText).toContain(
      component.errorMessages.pattern
    );
  });

  // tslint:disable-next-line:max-line-length
  it('(.custom-thumbnail__error--pattern) should NOT be rendered if `thumbnailUrlControl` doesn NOT have `pattern` error', () => {
    let errorElement: DebugElement;

    component.thumbnailUrlControl.setErrors(null);
    component.thumbnailUrlControl.markAsDirty();
    hostFixture.detectChanges();
    errorElement = hostFixture.debugElement.query(
      By.css('.custom-thumbnail__error--pattern')
    );

    expect(errorElement).toEqual(null);
  });
});

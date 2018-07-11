import {
  Component,
  ViewChild,
  ChangeDetectionStrategy,
  DebugElement
} from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { TitlePartialFormComponent } from './title-partial-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditorMaterialModule } from '../../editor-material/editor-material.module';
import { By } from '@angular/platform-browser';

@Component({
  selector: `app-host-component`,
  template: `<app-title-partial-form [parentForm]="parentForm"></app-title-partial-form>`
})
class TestHostComponent {
  @ViewChild(TitlePartialFormComponent)
  titlePartialFormComponent: TitlePartialFormComponent;

  parentForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.parentForm = this.formBuilder.group({
      title: ['', Validators.required]
    });
  }
}

fdescribe('#EditorModule TitlePartialFormComponent', () => {
  let hostFixture: ComponentFixture<TestHostComponent>;
  let hostComponent: TestHostComponent;
  let component: TitlePartialFormComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        EditorMaterialModule
      ],
      declarations: [TestHostComponent, TitlePartialFormComponent]
    })
      // `OnPush` change detection lets run change detection manually only once,
      // that's why for tests `Default` change detection has to be set
      .overrideComponent(TitlePartialFormComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    hostFixture = TestBed.createComponent(TestHostComponent);
    hostComponent = hostFixture.componentInstance;
    component = hostComponent.titlePartialFormComponent;

    hostFixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#titleControl should be pointing on `parentForm.controls.title`', () => {
    expect(component.titleControl).toBe(component.parentForm.controls.title);
  });

  it('(.title__error--required) should be rendered and display correct message if `titleControl` has `required` err and is touched', () => {
    let errorElement: DebugElement;

    component.titleControl.setErrors({ required: true });
    component.titleControl.markAsTouched();
    hostFixture.detectChanges();
    errorElement = hostFixture.debugElement.query(
      By.css('.title__error--required')
    );

    expect(errorElement.nativeElement).toBeDefined();
    expect(errorElement.nativeElement.innerText).toContain(
      component.errorMessages.required
    );
  });

  it('(.title__error--required) should NOT be rendered if `titleControl` doesn NOT have `required` error', () => {
    let errorElement: DebugElement;

    component.titleControl.setErrors(null);
    hostFixture.detectChanges();
    errorElement = hostFixture.debugElement.query(
      By.css('.title__error--required')
    );

    expect(errorElement).toEqual(null);
  });
});

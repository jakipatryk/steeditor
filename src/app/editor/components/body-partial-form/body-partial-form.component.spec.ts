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
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        EditorMaterialModule
      ],
      declarations: [TestHostComponent, BodyPartialFormComponent]
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

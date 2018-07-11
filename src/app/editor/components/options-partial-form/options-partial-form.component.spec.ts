import { EditorConfig, createEditorConfig } from './../editor/config';
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
import { OptionsPartialFormComponent } from './options-partial-form.component';
import { By } from '@angular/platform-browser';

@Component({
  selector: `app-host-component`,
  template: `
  <app-options-partial-form [parentForm]="parentForm" [config]="config">
  </app-options-partial-form>
  `
})
class TestHostComponent {
  @ViewChild(OptionsPartialFormComponent)
  optionsPartialFormComponent: OptionsPartialFormComponent;

  parentForm: FormGroup;
  config: EditorConfig;

  constructor(private formBuilder: FormBuilder) {
    this.parentForm = this.formBuilder.group({
      allowVotes: [true],
      allowCurationRewards: [true],
      percentSteemDollars: [50, [Validators.min(0), Validators.max(50)]],
      maxAcceptedPayout: [100000, [Validators.min(0), Validators.max(100000)]]
    });

    this.config = createEditorConfig();
  }
}

fdescribe('#EditorModule OptionsPartialFormComponent', () => {
  let hostFixture: ComponentFixture<TestHostComponent>;
  let hostComponent: TestHostComponent;
  let component: OptionsPartialFormComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        EditorMaterialModule
      ],
      declarations: [TestHostComponent, OptionsPartialFormComponent]
    })
      // `OnPush` change detection lets run change detection manually only once,
      // that's why for tests `Default` change detection has to be set
      .overrideComponent(OptionsPartialFormComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    hostFixture = TestBed.createComponent(TestHostComponent);
    hostComponent = hostFixture.componentInstance;
    component = hostComponent.optionsPartialFormComponent;

    hostFixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#maxAcceptedPayoutControl should be pointing on `parentForm.controls.maxAcceptedPayout`', () => {
    expect(component.maxAcceptedPayoutControl).toBe(
      component.parentForm.controls.maxAcceptedPayout
    );
  });

  it('#formatSliderThumbLabel should add a "%" to the value', () => {
    const value = 10;
    let formattedValue: string;

    formattedValue = component.formatSliderThumbLabel(value);

    expect(formattedValue).toBe('10%');
  });

  // tslint:disable-next-line:max-line-length
  it('(.max-accepted-payout__error--min) should be rendered and contain a correct message if `maxAcceptedPayoutControl` has `min` error and is dirty', () => {
    let errorElement: DebugElement;

    component.maxAcceptedPayoutControl.setErrors({ min: true });
    component.maxAcceptedPayoutControl.markAsDirty();
    hostFixture.detectChanges();
    errorElement = hostFixture.debugElement.query(
      By.css('.max-accepted-payout__error--min')
    );

    expect(errorElement.nativeElement).toBeDefined();
    expect(errorElement.nativeElement.innerText).toContain(
      component.errorMessagesMaxAcceptedPayout.min
    );
  });

  it('(.max-accepted-payout__error--min) should NOT be rendered  if `maxAcceptedPayoutControl` does NOT have `min` error', () => {
    let errorElement: DebugElement;

    component.maxAcceptedPayoutControl.setErrors(null);
    hostFixture.detectChanges();
    errorElement = hostFixture.debugElement.query(
      By.css('.max-accepted-payout__error--min')
    );

    expect(errorElement).toEqual(null);
  });

  // tslint:disable-next-line:max-line-length
  it('(.max-accepted-payout__error--max) should be rendered and contain a correct message if `maxAcceptedPayoutControl` has `max` error and is dirty', () => {
    let errorElement: DebugElement;

    component.maxAcceptedPayoutControl.setErrors({ max: true });
    component.maxAcceptedPayoutControl.markAsDirty();
    hostFixture.detectChanges();
    errorElement = hostFixture.debugElement.query(
      By.css('.max-accepted-payout__error--max')
    );

    expect(errorElement.nativeElement).toBeDefined();
    expect(errorElement.nativeElement.innerText).toContain(
      component.errorMessagesMaxAcceptedPayout.max
    );
  });

  it('(.max-accepted-payout__error--max) should NOT be rendered  if `maxAcceptedPayoutControl` does NOT have `max` error', () => {
    let errorElement: DebugElement;

    component.maxAcceptedPayoutControl.setErrors(null);
    hostFixture.detectChanges();
    errorElement = hostFixture.debugElement.query(
      By.css('.max-accepted-payout__error--max')
    );

    expect(errorElement).toEqual(null);
  });
});

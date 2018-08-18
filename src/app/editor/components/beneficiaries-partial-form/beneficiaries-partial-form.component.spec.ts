import {
  ChangeDetectionStrategy,
  Component,
  DebugElement,
  ViewChild
} from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule
} from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { always } from 'ramda';
import { EditorMaterialModule } from '../../editor-material/editor-material.module';
import { beneficiariesCustomValidators } from '../../validators/beneficiaries.validators';
import { BeneficiariesPartialFormComponent } from './beneficiaries-partial-form.component';

@Component({
  selector: `app-host-component`,
  template: `<app-beneficiaries-partial-form [parentForm]="parentForm"></app-beneficiaries-partial-form>`
})
class TestHostComponent {
  @ViewChild(BeneficiariesPartialFormComponent)
  beneficiariesPartialFormComponent: BeneficiariesPartialFormComponent;

  parentForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.parentForm = this.formBuilder.group({
      beneficiaries: this.formBuilder.array([], beneficiariesCustomValidators)
    });
  }
}

fdescribe('#EditorModule BeneficiariesPartialFormComponent', () => {
  let hostFixture: ComponentFixture<TestHostComponent>;
  let hostComponent: TestHostComponent;
  let component: BeneficiariesPartialFormComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        EditorMaterialModule
      ],
      declarations: [TestHostComponent, BeneficiariesPartialFormComponent]
    })
      // `OnPush` change detection lets run change detection manually only once,
      // that's why for tests `Default` change detection has to be set
      .overrideComponent(BeneficiariesPartialFormComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    hostFixture = TestBed.createComponent(TestHostComponent);
    hostComponent = hostFixture.componentInstance;
    component = hostComponent.beneficiariesPartialFormComponent;

    hostFixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('#beneficiariesFormArray should be pointing on `parentForm.controls.beneficiaries`', () => {
    expect(component.beneficiariesFormArray).toBe(component.parentForm.controls
      .beneficiaries as FormArray);
  });

  it('#hasBeneficiariesFormArrayErrors should return false if `beneficiariesFormArray` doesnt have any errors', () => {
    component.beneficiariesFormArray.setErrors(null);

    expect(component.hasBeneficiariesFormArrayErrors).toBeFalsy();
  });

  it('#hasBeneficiariesFormArrayErrors should return true if `beneficiariesFormArray` has any errors', () => {
    component.beneficiariesFormArray.setErrors({ errTest: true });

    expect(component.hasBeneficiariesFormArrayErrors).toBeTruthy();
  });

  it('#totalBeneficiariesWeight should be equal to sum of all beneficiaires weights', () => {
    component.addBeneficiary();
    component.addBeneficiary();
    component.beneficiariesFormArray.controls[0].setValue({
      account: 'jakipatryk',
      weight: 10
    });
    component.beneficiariesFormArray.controls[1].setValue({
      account: 'jakipatryk-pl',
      weight: 20
    });

    expect(component.totalBeneficiariesWeight).toEqual(30);
  });

  it('#totalBeneficiaries should be equal to a number of all beneficiaries', () => {
    component.addBeneficiary();
    component.addBeneficiary();
    component.beneficiariesFormArray.controls[0].setValue({
      account: 'jakipatryk',
      weight: 10
    });
    component.beneficiariesFormArray.controls[1].setValue({
      account: 'jakipatryk-pl',
      weight: 20
    });

    expect(component.totalBeneficiaries).toEqual(2);
  });

  it('#addBeneficiary should add a new beneficiary to the `beneficiariesFormArray', () => {
    component.beneficiariesFormArray.setValue([]);

    component.addBeneficiary();

    expect(component.beneficiariesFormArray.value.length).toBeGreaterThan(0);
    expect(
      component.beneficiariesFormArray.controls[0].value.account
    ).toBeDefined();
    expect(
      component.beneficiariesFormArray.controls[0].value.weight
    ).toBeDefined();
  });

  it('#formatSliderThumbLabel should add a "%" to the value', () => {
    const value = 10;
    let formattedValue: string;

    formattedValue = component.formatSliderThumbLabel(value);

    expect(formattedValue).toBe('10%');
  });

  it('#getBeneficiaryAccountControl should return a `FormControl` of a beneficiary of a given index if it exists', () => {
    let beneficiaryAccountControl: AbstractControl;

    component.beneficiariesFormArray.setValue([]);
    component.addBeneficiary();
    beneficiaryAccountControl = component.getBeneficiaryAccountControl(0);

    expect(beneficiaryAccountControl).toBeDefined();
  });

  it('#getBeneficiaryAccountControl should return a `undefined` if a beneficiary of a given index does NOT exist', () => {
    let beneficiaryAccountControl: AbstractControl;

    component.beneficiariesFormArray.setValue([]);
    beneficiaryAccountControl = component.getBeneficiaryAccountControl(0);

    expect(beneficiaryAccountControl).toBeUndefined();
  });

  it('#removeBeneficiary should remove a beneficiary of a given index from `beneficiariesFormArray`', () => {
    component.beneficiariesFormArray.setValue([]);
    component.addBeneficiary();
    component.removeBeneficiary(0);

    expect(component.beneficiariesFormArray.controls[0]).toBeUndefined();
  });

  it('(.beneficiaries__errors) should be rendered if `beneficiariesFormArray` has errors', () => {
    let beneficiariesErrorsElement: DebugElement;

    component.beneficiariesFormArray.setErrors({ testError: true });
    hostFixture.detectChanges();
    beneficiariesErrorsElement = hostFixture.debugElement.query(
      By.css('.beneficiaries__errors')
    );

    expect(beneficiariesErrorsElement.nativeElement).toBeDefined();
  });

  it('(.beneficiaries__errors) should NOT be rendered if `beneficiariesFormArray` doesnt have errors', () => {
    let beneficiariesErrorsElement: DebugElement;

    component.beneficiariesFormArray.setErrors(null);
    hostFixture.detectChanges();
    beneficiariesErrorsElement = hostFixture.debugElement.query(
      By.css('.beneficiaries__errors')
    );

    expect(beneficiariesErrorsElement).toEqual(null);
  });

  it('(.beneficiaries__add-button) should be enabled if there are less than 8 beneficiaries', () => {
    const getBeneficiariesAddButton: () => DebugElement = always(
      hostFixture.debugElement.query(By.css('.beneficiaries__add-button'))
    );
    expect(getBeneficiariesAddButton().nativeElement.disabled).toBeFalsy();

    component.addBeneficiary();
    component.addBeneficiary();
    component.addBeneficiary();
    component.addBeneficiary();
    component.addBeneficiary();
    component.addBeneficiary();
    component.addBeneficiary();
    hostFixture.detectChanges();

    expect(getBeneficiariesAddButton().nativeElement.disabled).toBeFalsy();
  });

  it('(.beneficiaries__add-button) should be disabled if `isDisabled` is truthy', () => {
    const getBeneficiariesAddButton: () => DebugElement = always(
      hostFixture.debugElement.query(By.css('.beneficiaries__add-button'))
    );

    component.isDisabled = true;
    hostFixture.detectChanges();

    expect(getBeneficiariesAddButton().nativeElement.disabled).toBeTruthy();
  });

  it('(.beneficiaries__add-button) should be disabled if there are more than or equal 8 beneficiaries', () => {
    const getBeneficiariesAddButton: () => DebugElement = always(
      hostFixture.debugElement.query(By.css('.beneficiaries__add-button'))
    );

    component.addBeneficiary();
    component.addBeneficiary();
    component.addBeneficiary();
    component.addBeneficiary();
    component.addBeneficiary();
    component.addBeneficiary();
    component.addBeneficiary();
    component.addBeneficiary();
    hostFixture.detectChanges();

    expect(getBeneficiariesAddButton().nativeElement.disabled).toBeTruthy();

    component.addBeneficiary();
    hostFixture.detectChanges();

    expect(getBeneficiariesAddButton().nativeElement.disabled).toBeTruthy();
  });

  it('(.beneficiaries__add-button click) should add a new `.beneficiary`', () => {
    let beneficiaryElement: DebugElement;

    component.beneficiariesFormArray.setValue([]);
    hostFixture.debugElement
      .query(By.css('.beneficiaries__add-button'))
      .triggerEventHandler('click', null);
    hostFixture.detectChanges();
    beneficiaryElement = hostFixture.debugElement.query(By.css('.beneficiary'));

    expect(beneficiaryElement.nativeElement).toBeDefined();
  });

  // tslint:disable-next-line:max-line-length
  it('(.beneficiaries__error--too-high-weight) should be rendered with a correct message if `beneficiariesFormArray` has error `tooHighWeight', () => {
    let errorElement: DebugElement;

    component.beneficiariesFormArray.setErrors({ tooHighWeight: true });
    hostFixture.detectChanges();
    errorElement = hostFixture.debugElement.query(
      By.css('.beneficiaries__error--too-high-weight')
    );

    expect(errorElement.nativeElement).toBeDefined();
    expect(errorElement.nativeElement.innerText).toContain(
      component.errorMessages.tooHighWeight
    );
  });

  // tslint:disable-next-line:max-line-length
  it('(.beneficiaries__error--too-many-beneficiaries) should be rendered with a correct message if `beneficiariesFormArray` has error `tooManyBeneficiaries', () => {
    let errorElement: DebugElement;

    component.beneficiariesFormArray.setErrors({ tooManyBeneficiaries: true });
    hostFixture.detectChanges();
    errorElement = hostFixture.debugElement.query(
      By.css('.beneficiaries__error--too-many-beneficiaries')
    );

    expect(errorElement.nativeElement).toBeDefined();
    expect(errorElement.nativeElement.innerText).toContain(
      component.errorMessages.tooManyBeneficiaries
    );
  });

  // tslint:disable-next-line:max-line-length
  it('(.beneficiaries__error--not-unique-names) should be rendered with a correct message if `beneficiariesFormArray` has error `notUniqueNames', () => {
    let errorElement: DebugElement;

    component.beneficiariesFormArray.setErrors({ notUniqueNames: true });
    hostFixture.detectChanges();
    errorElement = hostFixture.debugElement.query(
      By.css('.beneficiaries__error--not-unique-names')
    );

    expect(errorElement.nativeElement).toBeDefined();
    expect(errorElement.nativeElement.innerText).toContain(
      component.errorMessages.notUniqueNames
    );
  });

  it('(.beneficiary__remove-button click) should remove a `.beneficiary`', () => {
    let beneficiaryRemoveButton: DebugElement;
    let beneficiaryElement: DebugElement;

    component.beneficiariesFormArray.setValue([]);
    component.addBeneficiary();
    hostFixture.detectChanges();
    beneficiaryRemoveButton = hostFixture.debugElement.query(
      By.css('.beneficiary__remove-button')
    );
    beneficiaryRemoveButton.triggerEventHandler('click', null);
    hostFixture.detectChanges();
    beneficiaryElement = hostFixture.debugElement.query(By.css('.beneficiary'));

    expect(beneficiaryElement).toEqual(null);
  });

  it('(.beneficiary__remove-button click) should NOT be rendered if `isDisabled` is truthy', () => {
    let beneficiaryRemoveButton: DebugElement;

    component.beneficiariesFormArray.setValue([]);
    component.addBeneficiary();
    component.isDisabled = true;
    hostFixture.detectChanges();
    beneficiaryRemoveButton = hostFixture.debugElement.query(
      By.css('.beneficiary__remove-button')
    );

    expect(beneficiaryRemoveButton).toEqual(null);
  });

  it('(.beneficiaries__summary-total-weight) should render text which contains `totalBeneficiariesWeight`', () => {
    const getBeneficiariesSummaryTotalWeightElement: () => DebugElement = always(
      hostFixture.debugElement.query(
        By.css('.beneficiaries__summary-total-weight')
      )
    );

    expect(
      getBeneficiariesSummaryTotalWeightElement().nativeElement.innerText
    ).toContain(component.totalBeneficiariesWeight);

    component.addBeneficiary();
    component
      .getBeneficiaryAccountControl(0)
      .setValue({ account: 'jakipatryk', weight: 15 });
    hostFixture.detectChanges();

    expect(
      getBeneficiariesSummaryTotalWeightElement().nativeElement.innerText
    ).toContain(component.totalBeneficiariesWeight);
  });

  it('(.beneficiaries__summary-total-beneficiaries) should render text which contains `totalBeneficiaries`', () => {
    const getBeneficiariesSummaryTotalBeneficiariesElement: () => DebugElement = always(
      hostFixture.debugElement.query(
        By.css('.beneficiaries__summary-total-beneficiaries')
      )
    );

    expect(
      getBeneficiariesSummaryTotalBeneficiariesElement().nativeElement.innerText
    ).toContain(component.totalBeneficiaries);

    component.addBeneficiary();
    hostFixture.detectChanges();

    expect(
      getBeneficiariesSummaryTotalBeneficiariesElement().nativeElement.innerText
    ).toContain(component.totalBeneficiaries);
  });
});

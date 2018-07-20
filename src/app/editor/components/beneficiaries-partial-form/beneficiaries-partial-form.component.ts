import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  add,
  either,
  isEmpty,
  isNil,
  map,
  not,
  path,
  pipe,
  prop,
  reduce
} from 'ramda';
import { AlwaysMatcher } from './../../matchers/always.matcher';

@Component({
  selector: 'app-beneficiaries-partial-form',
  templateUrl: './beneficiaries-partial-form.component.html',
  styleUrls: ['./beneficiaries-partial-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BeneficiariesPartialFormComponent {
  @Input() parentForm: FormGroup;

  alwaysMatcher = new AlwaysMatcher();

  readonly errorMessages = {
    pattern: 'Please type a valid username!',
    required: 'Account is required!',
    // tslint:disable-next-line:quotemark
    tooManyBeneficiaries: "You can't set more than 8 beneficiaries!",
    tooHighWeight:
      // tslint:disable-next-line:quotemark
      "You can't allocate more than 100% of reward to beneficiaries!",
    // tslint:disable-next-line:quotemark
    notUniqueNames:
      // tslint:disable-next-line:quotemark
      "You can't set the same beneficiary more than once for a given post!"
  };

  get beneficiariesFormArray(): FormArray {
    return this.parentForm.get('beneficiaries') as FormArray;
  }

  get hasBeneficiariesFormArrayErrors(): boolean {
    return pipe(
      either(isEmpty, isNil),
      not
    )(this.beneficiariesFormArray.errors);
  }

  get totalBeneficiariesWeight(): number {
    return pipe(
      map(prop('weight')),
      reduce(add, 0)
    )(this.beneficiariesFormArray.value);
  }

  get totalBeneficiaries(): number {
    return this.beneficiariesFormArray.value.length;
  }

  constructor(private formBuilder: FormBuilder) {}

  addBeneficiary(): void {
    this.beneficiariesFormArray.push(this.createBeneficiary());
  }

  formatSliderThumbLabel(value: number | null): string {
    return `${value}%`;
  }

  getBeneficiaryAccountControl(i: number): FormControl | undefined {
    return path(
      ['controls', 'account'],
      this.beneficiariesFormArray.controls[i]
    );
  }

  removeBeneficiary(i: number): void {
    this.beneficiariesFormArray.removeAt(i);
  }

  private createBeneficiary(): FormGroup {
    return this.formBuilder.group({
      account: ['', [Validators.required, Validators.pattern(/^[\w|-|.]+$/)]],
      weight: [0, [Validators.required, Validators.min(0), Validators.max(100)]]
    });
  }
}

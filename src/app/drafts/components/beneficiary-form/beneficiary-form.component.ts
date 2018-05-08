import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Beneficiary } from './../../models/beneficiary.model';

@Component({
  selector: 'app-beneficiary-form',
  templateUrl: './beneficiary-form.component.html',
  styleUrls: ['./beneficiary-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BeneficiaryFormComponent {
  beneficiaryForm: FormGroup;

  @Output() add = new EventEmitter<Beneficiary>();

  constructor(private formBuilder: FormBuilder) {
    this.buildForm();
  }

  onSubmit() {
    this.add.emit(this.beneficiaryForm.value);
  }

  private buildForm() {
    this.beneficiaryForm = this.formBuilder.group({
      account: ['', Validators.required],
      weight: 0
    });
  }
}

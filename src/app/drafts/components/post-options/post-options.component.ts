import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Beneficiary } from './../../models/beneficiary.model';

@Component({
  selector: 'app-post-options',
  templateUrl: './post-options.component.html',
  styleUrls: ['./post-options.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostOptionsComponent {
  @Input() parent: FormGroup;
  @Output() addBeneficiary = new EventEmitter<Beneficiary>();
  @Output() removeBeneficiary = new EventEmitter<number>();

  matcher = new ErrorStateMatcher();

  onAddBeneficiary(beneficiary: Beneficiary) {
    this.addBeneficiary.emit(beneficiary);
  }

  onRemoveBeneficiary(i: number) {
    this.removeBeneficiary.emit(i);
  }
}

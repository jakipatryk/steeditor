import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { path } from 'ramda';
import {
  EditorConfig,
  MaxAcceptedPayoutField,
  PercentSteemDollarsField
} from './../editor/config';

@Component({
  selector: 'app-options-partial-form',
  templateUrl: './options-partial-form.component.html',
  styleUrls: ['./options-partial-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OptionsPartialFormComponent implements OnInit {
  @Input() parentForm: FormGroup;
  @Input() config: EditorConfig;

  errorMessagesMaxAcceptedPayout: { min: string; max: string } = {
    min: '',
    max: ''
  };
  onDirtyMatcher = new ShowOnDirtyErrorStateMatcher();

  get percentSteemDollarsConfig(): PercentSteemDollarsField {
    return this.getFieldConfig<PercentSteemDollarsField>('percentSteemDollars');
  }

  get maxAcceptedPayoutConfig(): MaxAcceptedPayoutField {
    return this.getFieldConfig<MaxAcceptedPayoutField>('maxAcceptedPayout');
  }

  get maxAcceptedPayoutControl(): AbstractControl {
    return this.parentForm.get('maxAcceptedPayout');
  }

  ngOnInit() {
    this.errorMessagesMaxAcceptedPayout = {
      min: `Maximal accepted payout cannot be lower than ${
        this.maxAcceptedPayoutConfig.min
      }!`,
      max: `Maximal accepted payout cannot be higher than ${
        this.maxAcceptedPayoutConfig.max
      }!`
    };
  }

  formatSliderThumbLabel(value: number | null): string {
    return `${value}%`;
  }

  private getFieldConfig<T>(fieldName: string): T {
    return path(['fields', fieldName], this.config);
  }
}

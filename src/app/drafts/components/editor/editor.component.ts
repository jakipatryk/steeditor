import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { merge } from 'rxjs/observable/merge';
import { timer } from 'rxjs/observable/timer';
import { debounce } from 'rxjs/operators';
import { Draft, standardDraft } from '../../models/draft.model';
import { Beneficiary } from './../../models/beneficiary.model';
import { validateJSON } from './../../../shared/utils';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditorComponent implements OnInit, OnChanges, OnDestroy {
  @Input() initialValues: Draft = standardDraft;
  @Output() formChanges = new EventEmitter<Draft>();
  @Output() formSubmit = new EventEmitter<Draft>();

  contentsForm: FormGroup;
  thumbnailForm: FormGroup;
  advancedOptionsForm: FormGroup;

  combinedChangesSubscribtion: Subscription;

  constructor(private formBuilder: FormBuilder) {
    this.buildForms();
  }

  ngOnInit() {
    // merge value changes from each form
    // then emit forms values if user doesn't type for 3 sec
    // and the id of a draft if exists

    this.combinedChangesSubscribtion = merge(
      this.contentsForm.valueChanges,
      this.thumbnailForm.valueChanges,
      this.advancedOptionsForm.valueChanges
    )
      .pipe(debounce(() => timer(3000)))
      .subscribe(() => {
        if (this.initialValues.id) {
          this.formChanges.emit({
            ...this.contentsForm.value,
            ...this.thumbnailForm.value,
            ...this.advancedOptionsForm.value,
            id: this.initialValues.id
          });
        } else {
          this.formChanges.emit({
            ...this.contentsForm.value,
            ...this.thumbnailForm.value,
            ...this.advancedOptionsForm.value
          });
        }
      });
  }

  ngOnChanges() {
    this.buildForms();
  }

  ngOnDestroy() {
    this.combinedChangesSubscribtion.unsubscribe();
  }

  onSubmit() {
    this.formSubmit.emit({
      ...this.contentsForm.value,
      ...this.thumbnailForm.value,
      ...this.advancedOptionsForm.value
    });
  }

  addBeneficiary(beneficiary: Beneficiary) {
    (this.advancedOptionsForm.get('beneficiaries') as FormArray).push(
      this.formBuilder.group({
        account: beneficiary.account,
        weight: beneficiary.weight
      })
    );
  }

  removeBeneficiary(i: number) {
    (this.advancedOptionsForm.get('beneficiaries') as FormArray).removeAt(i);
  }

  private buildForms() {
    this.contentsForm = this.formBuilder.group({
      title: [this.initialValues.title, Validators.required],
      body: [this.initialValues.body, Validators.required],
      tags: [
        this.initialValues.tags,
        [Validators.required, Validators.pattern(/^[0-9A-Za-z\s\-]+$/)]
      ]
    });

    this.thumbnailForm = this.formBuilder.group({
      thumbnailUrl: this.initialValues.thumbnailUrl
    });

    this.advancedOptionsForm = this.formBuilder.group({
      beneficiaries: this.formBuilder.array(this.initialValues.beneficiaries),
      allowVotes: this.initialValues.allowVotes,
      allowCurationRewards: this.initialValues.allowCurationRewards,
      percentSteemDollars: this.initialValues.percentSteemDollars,
      maxAcceptedPayout: this.initialValues.maxAcceptedPayout,
      jsonMetadata: [this.initialValues.jsonMetadata, validateJSON]
    });
  }
}

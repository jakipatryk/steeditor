import { COMMA, ENTER, SPACE } from '@angular/cdk/keycodes';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import {
  always,
  append,
  cond,
  equals,
  filter,
  has,
  identity,
  lt,
  remove,
  T,
  test
} from 'ramda';

@Component({
  selector: 'app-tags-partial-form',
  templateUrl: './tags-partial-form.component.html',
  styleUrls: ['./tags-partial-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagsPartialFormComponent {
  @Input()
  parentForm: FormGroup;
  @Input()
  disableRemovingFirstTag = false;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA, SPACE];
  readonly errorMessages = {
    required: 'Please add at least one tag!',
    capitalLetters: 'Tags cannot contain capital letters!',
    specialChars: 'Tags cannot contain special chars, except for one dash!',
    notUnique: 'Tags cannot be repeated!'
  };

  get tagsControl(): AbstractControl {
    return this.parentForm.get('tags');
  }

  get currentErrorMessage(): string | null {
    return cond([
      [equals(null), identity],
      [
        () => !this.tagsControl.dirty && this.tagsControl.value.length === 0,
        always(null)
      ],
      [has('required'), always(this.errorMessages.required)],
      [has('capitalLetters'), always(this.errorMessages.capitalLetters)],
      [has('specialChars'), always(this.errorMessages.specialChars)],
      [has('notUnique'), always(this.errorMessages.notUnique)],
      [T, always(null)]
    ])(this.tagsControl.errors);
  }

  addTag(event: MatChipInputEvent): void {
    const tagsInput = event.input;
    const newTag = event.value;
    const tagsControl = this.parentForm.get('tags');
    const currentTags = tagsControl.value;

    if ((newTag || '').trim()) {
      tagsControl.setValue(append(newTag.trim(), currentTags));
    }

    // Reset the input value
    if (tagsInput) {
      tagsInput.value = '';
    }

    this.tagsControl.markAsDirty();
  }

  removeTag(tag: string): void {
    const index = this.parentForm.get('tags').value.indexOf(tag);
    const tagsControl = this.parentForm.get('tags');
    const currentTags = tagsControl.value;

    if (index >= 0) {
      tagsControl.setValue(remove(index, 1, currentTags));
    }

    this.tagsControl.markAsDirty();
  }

  isTagRemovable(i: number): boolean {
    return this.disableRemovingFirstTag ? i !== 0 : true;
  }

  isValidTag(tag: string): boolean {
    return (
      test(/^[a-z0-9]+-?[a-z0-9]*$/, tag) &&
      lt(filter(equals(tag), this.tagsControl.value).length, 2)
    );
  }
}

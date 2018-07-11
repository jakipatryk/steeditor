import { COMMA, ENTER, SPACE } from '@angular/cdk/keycodes';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { append, equals, filter, lt, remove, test } from 'ramda';

@Component({
  selector: 'app-tags-partial-form',
  templateUrl: './tags-partial-form.component.html',
  styleUrls: ['./tags-partial-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TagsPartialFormComponent {
  @Input() parentForm: FormGroup;
  @Input() disableRemovingFirstTag = false;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA, SPACE];
  readonly errorMessages = {
    required: 'Please add at least one tag!',
    hash: 'Tags cannot contain a # symbol!',
    capitalLetters: 'Tags cannot contain capital letters!',
    whitespace: 'Tags cannot contain whitespaces!',
    notUnique: 'Tags cannot be repeated!'
  };

  get tagsControl(): AbstractControl {
    return this.parentForm.get('tags');
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
      test(/^[^#\sA-Z]+$/, tag) &&
      lt(filter(equals(tag), this.tagsControl.value).length, 2)
    );
  }
}

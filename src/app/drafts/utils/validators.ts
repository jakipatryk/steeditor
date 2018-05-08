import { AbstractControl } from '@angular/forms';

/**
 * Validates a JSON from a form control.
 * @returns {null | object} null if JSON is valid, otherwise object with `invalidJson: true` property
 */
export const validateJSON = (control: AbstractControl): null | object => {
  try {
    JSON.parse(control.value);
    return null;
  } catch (err) {
    return control.value
      ? {
          invalidJson: true
        }
      : null;
  }
};

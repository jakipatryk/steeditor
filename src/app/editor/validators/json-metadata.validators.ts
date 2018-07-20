import { AbstractControl } from '@angular/forms';
import { always, ifElse, pipe, prop, isEmpty } from 'ramda';
import { isJsonValid } from './../../../core/utils';

export const validateJSON: (
  control: AbstractControl
) => null | { invalidJson: true } = pipe(
  prop('value'),
  ifElse(
    isJsonValid,
    always(null),
    ifElse(isEmpty, always(null), always({ invalidJson: true }))
  )
);

export const jsonMetadataCustomValidators = [validateJSON];

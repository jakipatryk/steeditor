import { AbstractControl, ValidatorFn, Validators } from '@angular/forms';
import {
  all,
  always,
  any,
  ifElse,
  length,
  lt,
  o,
  pipe,
  prop,
  split,
  test,
  __
} from 'ramda';

const _validateSegmentWith = (validator: ValidatorFn) => (
  control: AbstractControl
) => (control.value.length === 0 ? null : validator(control));

export const validateSegmentStartsWithWrongChar: (
  control: AbstractControl
) => null | { segmentStartsWithWrongChar: true } = pipe(
  prop('value'),
  split('.'),
  ifElse(
    all(test(/^[a-z]/)),
    always(null),
    always({ segmentStartsWithWrongChar: true })
  )
);

export const validateSegmentEndsWithWrongChar: (
  control: AbstractControl
) => null | { segmentEndsWithWrongChar: true } = pipe(
  prop('value'),
  split('.'),
  ifElse(
    all(test(/[a-z0-9]$/)),
    always(null),
    always({ segmentEndsWithWrongChar: true })
  )
);

export const validateSegmentWithWrongChars: (
  control: AbstractControl
) => null | { segmentWithWrongChars: true } = pipe(
  prop('value'),
  split('.'),
  ifElse(
    all(test(/^[a-z0-9-]*$/)),
    always(null),
    always({ segmentWithWrongChars: true })
  )
);

export const validateTooManyDashesInRow: (
  control: AbstractControl
) => null | { tooManyDashesInRow: true } = pipe(
  prop('value'),
  ifElse(test(/--/), always({ tooManyDashesInRow: true }), always(null))
);

export const validateSegmentTooShort: (
  control: AbstractControl
) => null | { segmentTooShort: true } = pipe(
  prop('value'),
  split('.'),
  ifElse(
    any(o(lt(__, 3), length)),
    always({ segmentTooShort: true }),
    always(null)
  )
);

export const steemAccontNameValidators: Array<ValidatorFn> = [
  _validateSegmentWith(validateSegmentStartsWithWrongChar),
  _validateSegmentWith(validateSegmentEndsWithWrongChar),
  _validateSegmentWith(validateSegmentWithWrongChars),
  _validateSegmentWith(validateSegmentTooShort),
  validateTooManyDashesInRow,
  Validators.minLength(3),
  Validators.maxLength(16)
];

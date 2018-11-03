import { AbstractControl } from '@angular/forms';
import {
  all,
  always,
  compose,
  equals,
  head,
  ifElse,
  prop,
  test,
  uniq
} from 'ramda';

export const validateNoCapitalLetters: (
  control: AbstractControl
) => null | { capitalLetters: true } = compose(
  ifElse(test(/^[^A-Z]+$/), always(null), always({ capitalLetters: true })),
  head,
  prop('value')
);

export const validateNoSpecialChars: (
  control: AbstractControl
) => null | { specialChars: true } = compose(
  ifElse(
    test(/^[a-z0-9]+-?[a-z0-9]*$/),
    always(null),
    always({ specialChars: true })
  ),
  head,
  prop('value')
);

export const validateUnique: (
  control: AbstractControl
) => null | { notUnique: true } = compose(
  tagsObj =>
    equals(tagsObj.original, tagsObj.unique) ? null : { notUnique: true },
  tags => ({ original: tags, unique: uniq(tags) }),
  prop('value')
);

export const tagsCustomValidators = [
  validateNoCapitalLetters,
  validateNoSpecialChars,
  validateUnique
];

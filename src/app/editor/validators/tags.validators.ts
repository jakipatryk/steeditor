import { AbstractControl } from '@angular/forms';
import { compose, ifElse, all, test, always, prop, uniq, equals } from 'ramda';

export const validateNoCapitalLetters: (
  control: AbstractControl
) => null | { capitalLetters: true } = compose(
  ifElse(
    all(test(/^[^A-Z]+$/)),
    always(null),
    always({ capitalLetters: true })
  ),
  prop('value')
);

export const validateNoSpecialChars: (
  control: AbstractControl
) => null | { specialChars: true } = compose(
  ifElse(
    all(test(/^[a-z0-9]+-?[a-z0-9]*$/)),
    always(null),
    always({ specialChars: true })
  ),
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

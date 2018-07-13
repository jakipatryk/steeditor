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

export const validateNoHashes: (
  control: AbstractControl
) => null | { hash: true } = compose(
  ifElse(all(test(/^[^#]+$/)), always(null), always({ hash: true })),
  prop('value')
);

export const validateNoWhitespaces: (
  control: AbstractControl
) => null | { whitespace: true } = compose(
  ifElse(all(test(/^[^\s]+$/)), always(null), always({ whitespace: true })),
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
  validateNoHashes,
  validateNoWhitespaces,
  validateUnique
];

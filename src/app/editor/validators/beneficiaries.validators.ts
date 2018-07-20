import { AbstractControl } from '@angular/forms';
import {
  add,
  always,
  equals,
  ifElse,
  isEmpty,
  lt,
  map,
  path,
  pipe,
  prop,
  reduce,
  reject,
  uniq
} from 'ramda';

export const validateWeightSum: (
  beneficiariesFormArray: AbstractControl
) => null | { tooHighWeight: true } = pipe(
  prop('value'),
  map((beneficiary: { account: string; weight: number }) => beneficiary.weight),
  reduce(add, 0),
  ifElse(lt(100), always({ tooHighWeight: true }), always(null))
);

export const validateQuantity: (
  beneficiariesFormArray: AbstractControl
) => null | { tooManyBeneficiaries: true } = pipe(
  path(['value', 'length']),
  ifElse(lt(8), always({ tooManyBeneficiaries: true }), always(null))
);

export const validateUniqueNames: (
  beneficiariesFormArray: AbstractControl
) => null | { notUniqueNames: true } = pipe(
  prop('value'),
  map(prop('account')),
  reject(isEmpty),
  beneficiaries => ({ original: beneficiaries, unique: uniq(beneficiaries) }),
  beneficiariesObj =>
    equals(beneficiariesObj.original, beneficiariesObj.unique)
      ? null
      : { notUniqueNames: true }
);

export const beneficiariesCustomValidators = [
  validateWeightSum,
  validateQuantity,
  validateUniqueNames
];

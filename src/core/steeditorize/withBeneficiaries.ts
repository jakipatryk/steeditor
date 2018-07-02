import { assoc, divide, evolve, map, __ } from 'ramda';
import { SteemPost } from '../SteemPost';

/**
 * Converts array of beneficiaries used in Steem post into array of beneficiaries used in Steeditor.
 * @param beneficiaries An array of beneficiaries from `SteemPost`.
 * @returns An array of beneficiaries for `SteeditorPost`
 */
export const convertBeneficiaries: (
  beneficiaries: Array<{
    account: string;
    weight: number;
  }>
) => Array<{
  account: string;
  weight: number;
}> = map(evolve({ weight: divide(__, 100) }));

/**
 * Adds a `beneficiaries` property to provided `target` object, based on provided `steemPost` object.
 */
export const withBeneficiaries = (steemPost: SteemPost) => (target: {
  [key: string]: any;
}): {
  beneficiaries: Array<{
    account: string;
    weight: number;
  }>;
  [K: string]: any;
} =>
  assoc('beneficiaries', convertBeneficiaries(steemPost.beneficiaries), target);

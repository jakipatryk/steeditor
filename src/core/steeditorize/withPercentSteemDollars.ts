import { assoc, divide } from 'ramda';
import { SteemPost } from '../SteemPost';

/**
 * Adds a `percentSteemDollars` property to provided `target` object, based on provided `steemPost` object.
 */
export const withPercentSteemDollars = (steemPost: SteemPost) => (target: {
  [key: string]: any;
}): { percentSteemDollars: number; [K: string]: any } =>
  assoc(
    'percentSteemDollars',
    divide(steemPost.percent_steem_dollars, 200),
    target
  );

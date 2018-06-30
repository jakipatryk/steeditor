import { assoc, multiply } from 'ramda';
import { SteeditorPost } from '../SteeditorPost';

/**
 * Adds a `percent_steem_dollars` property to provided `target` object, based on provided `steeditorPost` object.
 */
export const withPercentSteemDollars = (
  steeditorPost: SteeditorPost
) => (target: {
  [key: string]: any;
}): { percent_steem_dollars: number; [K: string]: any } =>
  assoc(
    'percent_steem_dollars',
    multiply(200, steeditorPost.percentSteemDollars),
    target
  );

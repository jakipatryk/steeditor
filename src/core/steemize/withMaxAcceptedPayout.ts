import { assoc } from 'ramda';
import { SteeditorPost } from '../SteeditorPost';

/**
 * Adds a `max_accepted_payout` property to provided `target` object, based on provided `steeditorPost` object.
 */
export const withMaxAcceptedPayout = (
  steeditorPost: SteeditorPost
) => (target: {
  [key: string]: any;
}): { max_accepted_payout: string; [K: string]: any } =>
  assoc(
    'max_accepted_payout',
    `${steeditorPost.maxAcceptedPayout}.000 SBD`,
    target
  );

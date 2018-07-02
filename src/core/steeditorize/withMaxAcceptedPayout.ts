import { assoc, compose } from 'ramda';
import { SteemPost } from '../SteemPost';
import { getMatchesByGroup } from '../utils';

/**
 * Adds a `maxAcceptedPayout` property to provided `target` object, based on provided `steemPost` object.
 */
export const withMaxAcceptedPayout = (steemPost: SteemPost) => (target: {
  [key: string]: any;
}): { maxAcceptedPayout: number; [K: string]: any } =>
  assoc(
    'maxAcceptedPayout',
    compose(
      parseInt,
      getMatchesByGroup(/([\d]+\.[\d]{3}) SBD/g, 1)
    )(steemPost.max_accepted_payout),
    target
  );

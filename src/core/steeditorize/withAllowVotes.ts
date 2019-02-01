import { assoc } from 'ramda';
import { SteemPost } from '../SteemPost';

/**
 * Adds a `allowVotes` property to provided `target` object, based on provided `steemPost` object.
 */
export const withAllowVotes = (steemPost: SteemPost) => (target: {
  [key: string]: any;
}): { allowVotes: boolean; [K: string]: any } =>
  // hardcoded true cause of a problem with api.steemit.com node (Hivemind)
  assoc('allowVotes', true, target);

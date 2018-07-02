import { assoc } from 'ramda';
import { SteeditorPost } from '../SteeditorPost';

/**
 * Adds a `allow_votes` property to provided `target` object, based on provided `steeditorPost` object.
 */
export const withAllowVotes = (steeditorPost: SteeditorPost) => (target: {
  [key: string]: any;
}): { allow_votes: boolean; [K: string]: any } =>
  // hardcoded true cause of a prolem with api.steemit.com node
  assoc('allow_votes', true, target);

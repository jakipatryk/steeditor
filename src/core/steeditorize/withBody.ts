import { assoc } from 'ramda';
import { SteemPost } from '../SteemPost';

/**
 * Adds a `body` property to provided `target` object, based on provided `steemPost` object.
 */
export const withBody = (steemPost: SteemPost) => (target: {
  [key: string]: any;
}): { body: string; [K: string]: any } => assoc('body', steemPost.body, target);

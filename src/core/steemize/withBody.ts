import { assoc } from 'ramda';
import { SteeditorPost } from '../SteeditorPost';

/**
 * Adds a `body` property to provided `target` object, based on provided `steeditorPost` object.
 */
export const withBody = (steeditorPost: SteeditorPost) => (target: {
  [key: string]: any;
}): { body: string; [K: string]: any } =>
  assoc('body', steeditorPost.body, target);

import { assoc } from 'ramda';
import { SteemPost } from '../SteemPost';

/**
 * Adds a `title` property to provided `target` object, based on provided `steemPost` object.
 */
export const withTitle = (steemPost: SteemPost) => (target: {
  [key: string]: any;
}): { title: string; [K: string]: any } =>
  assoc('title', steemPost.title, target);

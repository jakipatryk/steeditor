import { assoc } from 'ramda';
import { SteeditorPost } from '../SteeditorPost';
/**
 * Adds a `title` property to provided `target` object, based on provided `steeditorPost` object.
 */
export const withTitle = (steeditorPost: SteeditorPost) => (target: {
  [key: string]: any;
}): { title: string; [K: string]: any } =>
  assoc('title', steeditorPost.title, target);

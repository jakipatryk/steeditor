import { assoc } from 'ramda';
import { SteeditorPost } from '../SteeditorPost';

/**
 * Adds a `parent_author` property to provided `target` object, based on provided `steeditorPost` object.
 */
export const withParentAuthor = (steeditorPost: SteeditorPost) => (target: {
  [key: string]: any;
}): { parent_author: string; [K: string]: any } =>
  assoc('parent_author', '', target);

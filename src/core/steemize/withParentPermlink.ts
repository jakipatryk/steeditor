import { assoc, defaultTo } from 'ramda';
import { SteeditorPost } from '../SteeditorPost';

/**
 * Creates parent permlink based on main tag.
 * @param mainTag A first tag (category). However, it is optional ('steeditor' by default).
 */
export const createParentPermlink: (
  mainTag: string | null | undefined
) => string = defaultTo('steeditor');

/**
 * Adds a `parent_permlink` property to provided `target` object, based on provided `steeditorPost` object.
 */
export const withParentPermlink = (steeditorPost: SteeditorPost) => (target: {
  [key: string]: any;
}): { parent_permlink: string; [K: string]: any } =>
  assoc('parent_permlink', createParentPermlink(steeditorPost.tags[0]), target);

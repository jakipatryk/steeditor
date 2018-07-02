import { assoc } from 'ramda';
import { SteemPost } from '../SteemPost';

/**
 * Adds a `permlink` property to provided `target` object, based on provided `steemPost` object.
 */
export const withPermlink = (steemPost: SteemPost) => (target: {
  [key: string]: any;
}): { permlink: string; [K: string]: any } =>
  assoc('permlink', steemPost.permlink, target);

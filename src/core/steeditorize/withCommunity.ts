import { always, assoc, has, ifElse, o, prop } from 'ramda';
import { SteemPost } from '../SteemPost';
import { isJsonValid } from '../utils';

/**
 * Extracts `community` from a JSON metadata (if exists).
 * @param metadata A metadata to extract a `community` from (in a stringified JSON format).
 * @returns If a community was defined in the metadata, it returns it, otherwise it returns an empty string.
 */
export const getCommunity: (metadata: string) => string = ifElse(
  isJsonValid,
  o(ifElse(has('community'), prop('community'), always('')), JSON.parse),
  always('')
);

/**
 * Adds a `community` property to provided `target` object, based on provided `steemPost` object.
 */
export const withCommunity = (steemPost: SteemPost) => (target: {
  [key: string]: any;
}): { community: string; [K: string]: any } =>
  assoc('community', getCommunity(steemPost.json_metadata), target);

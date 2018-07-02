import { always, assoc, has, ifElse, o, prop, both } from 'ramda';
import { SteemPost } from '../SteemPost';
import { isJsonValid } from '../utils';

/**
 * Extracts `tags` from a JSON metadata (if exists).
 * @param metadata A metadata to extract `tags` from (in a stringified JSON format).
 * @returns If tags were defined in the metadata, it returns them, otherwise it returns an empty array.
 */
export const getTags: (metadata: string) => Array<string> = ifElse(
  isJsonValid,
  o(ifElse(has('tags'), prop('tags'), always([])), JSON.parse),
  always([])
);

/**
 * Adds a `tags` property to provided `target` object, based on provided `steemPost` object.
 */
export const withTags = (steemPost: SteemPost) => (target: {
  [key: string]: any;
}): { tags: Array<string>; [K: string]: any } =>
  assoc('tags', getTags(steemPost.json_metadata), target);

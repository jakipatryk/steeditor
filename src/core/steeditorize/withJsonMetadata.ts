import { assoc, ifElse, o, curry, omit, isEmpty, always, unary } from 'ramda';
import { SteemPost } from '../SteemPost';
import { isJsonValid } from '../utils';

/**
 * Extracts custom (not managed by Steeditor's metadata creator) metadata from a stringified JSON.
 * @param metadata A metadata in a stringified JSON format.
 */
export const getCustomJsonMetadata: (metadata: string) => string = ifElse(
  isJsonValid,
  o(
    ifElse(isEmpty, always(''), unary(JSON.stringify)),
    o(
      omit(['app', 'format', 'community', 'tags', 'users', 'image', 'links']),
      unary(JSON.parse)
    )
  ),
  always('')
);

/**
 * Adds a `jsonMetadata` property to provided `target` object, based on provided `steemPost` object.
 */
export const withJsonMetadata = (steemPost: SteemPost) => (target: {
  [key: string]: any;
}): { jsonMetadata: string; [K: string]: any } =>
  assoc('jsonMetadata', getCustomJsonMetadata(steemPost.json_metadata), target);

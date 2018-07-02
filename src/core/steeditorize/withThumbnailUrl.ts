import {
  always,
  assoc,
  either,
  head,
  ifElse,
  isEmpty,
  isNil,
  o,
  prop,
  unary
} from 'ramda';
import { SteemPost } from '../SteemPost';
import { isJsonValid } from './../utils';

/**
 * Extracts thumbnail from a JSON metadata (if exists).
 * @param metadata A metadata to extract thumbnail from (in a stringified JSON format).
 * @returns If there were any images defined in the metadata, it returns them, otherwise it returns an empty string.
 */
export const getThumbnailUrl: (metadata: string) => string = ifElse(
  isJsonValid,
  o(
    o(ifElse(either(isEmpty, isNil), always(''), head), prop('image')),
    unary(JSON.parse)
  ),
  always('')
);

/**
 * Adds a `thumbnailUrl` property to provided `target` object, based on provided `steemPost` object.
 */
export const withThumbnailUrl = (steemPost: SteemPost) => (target: {
  [key: string]: any;
}): { thumbnailUrl: string; [K: string]: any } =>
  assoc('thumbnailUrl', getThumbnailUrl(steemPost.json_metadata), target);

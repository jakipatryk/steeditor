import { assoc } from 'ramda';

/**
 * Adds a `author` property to provided `target` object, based on provided `title`.
 */
export const withAuthor = (author: string) => (target: {
  [key: string]: any;
}): { author: string; [K: string]: any } => assoc('author', author, target);

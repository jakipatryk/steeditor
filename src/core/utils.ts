import { curry } from 'ramda';

/**
 * Searches for matches in a given text and returns them by a group index.
 * @param pattern A RegExp pattern.
 * @param groupIndex Index of a group to get.
 * @param text A text which is used to search for matches.
 * @returns Array of matches.
 */
export const getMatchesByGroup = curry(
  (pattern: RegExp, groupIndex: number, text: string): Array<string> => {
    const matches: Array<string> = [];
    let singleMatch;

    while ((singleMatch = pattern.exec(text))) {
      matches.push(singleMatch[groupIndex]);
    }

    return matches;
  }
);

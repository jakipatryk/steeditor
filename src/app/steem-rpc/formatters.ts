import {
  always,
  assoc,
  compose,
  defaultTo,
  head,
  min,
  prop,
  reduce,
  split,
  tryCatch
} from 'ramda';

/** Converts amount with asset name (ex. '100.000 STEEM') to number. */
export const assetToNumber: (amountWithAssetName: string) => number = compose(
  parseFloat,
  head,
  split(' ')
);

/**
 * Calculates a total amount of STEEM or SBD based on given liquid tokens and those in savings
 */
export const toTotal = (liquid: string, savings: string): number =>
  assetToNumber(liquid) + assetToNumber(savings);

/**
 * Calculates current voting power.
 * @param blockchainVotingPower Voting power at the time of last vote.
 * @param lastVoteTime Time of the last vote.
 */
export const toCurrentVotingPower = (
  blockchainVotingPower: number,
  lastVoteTime: Date
): number =>
  min(
    10000,
    blockchainVotingPower +
      (10000 *
        ((new Date().getTime() - new Date(lastVoteTime + 'Z').getTime()) /
          1000)) /
        432000
  ) / 100;

/** Extracts givent properties from metadata, if they exist. */
export const extractMetadataFromUserProfile = (
  ...propsToExtract: Array<{ prop: string; useName: string }>
) => (metadata: string) =>
  compose(
    profile =>
      profile
        ? reduce(
            (acc, property) =>
              assoc(
                property.useName,
                defaultTo(null, prop(property.prop, profile)),
                acc
              ),
            {},
            propsToExtract
          )
        : {},
    prop('profile'),
    tryCatch(JSON.parse, always({}))
  )(metadata);

// https://developers.steem.io/tutorials-javascript/account_reputation
export const toHumanReadableReputation = (blockchainReputation: number) => {
  function log10(str) {
    const leadingDigits = parseInt(str.substring(0, 4), 10);
    const log = Math.log(leadingDigits) / Math.LN10 + 0.00000001;
    const n = str.length - 1;
    return n + (log - parseInt(log.toString(), 10));
  }

  const repLog10 = rep2 => {
    if (rep2 == null) {
      return rep2;
    }
    let rep = String(rep2);
    const neg = rep.charAt(0) === '-';
    rep = neg ? rep.substring(1) : rep;

    let out = log10(rep);
    if (isNaN(out)) {
      out = 0;
    }
    out = Math.max(out - 9, 0);
    out = (neg ? -1 : 1) * out;
    out = out * 9 + 25;
    return out;
  };

  return repLog10(blockchainReputation);
};

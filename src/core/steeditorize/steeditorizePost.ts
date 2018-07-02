import { converge, pipe } from 'ramda';
import { SteeditorPost } from './../SteeditorPost';
import { SteemPost } from './../SteemPost';
import { withAllowCurationRewards } from './withAllowCurationRewards';
import { withAllowVotes } from './withAllowVotes';
import { withBeneficiaries } from './withBeneficiaries';
import { withBody } from './withBody';
import { withCommunity } from './withCommunity';
import { withJsonMetadata } from './withJsonMetadata';
import { withMaxAcceptedPayout } from './withMaxAcceptedPayout';
import { withPercentSteemDollars } from './withPercentSteemDollars';
import { withPermlink } from './withPermlink';
import { withTags } from './withTags';
import { withThumbnailUrl } from './withThumbnailUrl';
import { withTitle } from './withTitle';

/**
 * Converts `SteemPost` into `SteeditorPost`.
 * @param steemPost A post object from the Steem blockchain.
 * @returns `SteeditorPost`
 */
export const steeditorizePost = (steemPost: SteemPost): SteeditorPost =>
  converge(pipe, [
    withAllowCurationRewards,
    withAllowVotes,
    withBeneficiaries,
    withBody,
    withCommunity,
    withJsonMetadata,
    withMaxAcceptedPayout,
    withPercentSteemDollars,
    withPermlink,
    withTags,
    withThumbnailUrl,
    withTitle
  ])(steemPost)({});

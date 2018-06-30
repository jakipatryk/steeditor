import { assoc } from 'ramda';
import { SteeditorPost } from '../SteeditorPost';

/**
 * Adds a `allow_curation_rewards` property to provided `target` object, based on provided `steeditorPost` object.
 */
export const withAllowCurationRewards = (
  steeditorPost: SteeditorPost
) => (target: {
  [key: string]: any;
}): { allow_curation_rewards: boolean; [K: string]: any } =>
  assoc('allow_curation_rewards', steeditorPost.allowCurationRewards, target);

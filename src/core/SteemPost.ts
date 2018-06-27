/**
 * The object which is a response of the Steem's `condenser_api.get_content` RPC method call.
 */
export interface SteemPost {
  /** Unique id of a post. */
  id: number;

  /** Author of the post. */
  author: string;

  /** Unique (for a user) permlink of a post.  */
  permlink: string;

  /** Main tag. */
  category: string;

  /** It should be an empty string, because a post has no parent author. */
  parent_author: '';

  /** Main tag. */
  parent_permlink: string;

  /** Title of a post. It doesn't have to be unique for a given user. */
  title: string;

  body: string;

  /**
   * Metadata of the comment in a stringified JSON format. It might contain any properties, but the most common are:
   * - `app`
   * - `tags`
   * - `community`
   * - `image`
   * - `users`
   * - `links`
   * - `format`
   */
  json_metadata: string;

  /** A date of the post's last update. */
  last_update: string;

  /** A date of the post's creation. */
  created: string;

  active: string;
  last_payout: string;
  depth: number;
  children: number;
  net_rshares: number;
  abs_rshares: number;
  vote_rshares: number;
  children_abs_rshares: number;
  cashout_time: string;
  max_cashout_time: string;
  total_vote_weight: number;
  reward_weight: number;
  total_payout_value: string;
  curator_payout_value: string;
  author_rewards: number;
  net_votes: number;

  /** If it's a post, it's just a post author. If it's a comment, it's a author of the post to which comment was added. */
  root_author: string;

  /** If it's a post, it's just a post permlink. If it's a comment, it's a permlink of the post to which comment was added. */
  root_permlink: string;

  /**
   * Maximal accepted payout for a given post (in Steem Dollars).
   * @example '1000.000 SBD'
   */
  max_accepted_payout: string;

  /**
   * Percent of Steem Dollars in the payout, remaining part is received as Steem Power.
   * @example 10000 (50%, maximum)
   * @example 0 (0%, minimum)
   */
  percent_steem_dollars: number;

  allow_replies: boolean;

  /** Whether votes are enabled for a given post. */
  allow_votes: boolean;

  /** Whether curation rewards are turned on for a given post. */
  allow_curation_rewards: boolean;

  /** Array of beneficiaries set to a given post. */
  beneficiaries: Array<{ account: string; weight: number }>;

  /**
   * /category/@author/permlink
   * @example '/travelfeed/@piotr42/travel-feed-9-mostyska'
   */
  url: string;

  /** If it's a post, it's just a post title. If it's a comment, it's a title of the post to which comment was added. */
  root_title: string;

  pending_payout_value: string;
  total_pending_payout_value: string;

  /** An array of votes' details that a given post has received. */
  active_votes: Array<{
    voter: string;
    weight: number;
    rshares: number | string;
    percent: number;
    reputation: string | number;
    time: string;
  }>;

  replies: Array<any>;
  author_reputation: string;
  promoted: string;
  body_length: number;
  reblogged_by: Array<any>;
}

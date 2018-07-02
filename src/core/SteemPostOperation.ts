/**
 * General operation format used in the Steem blockchain.
 */
export interface Operation extends Array<string | { [K: string]: any }> {
  /** Type of the operation. */
  0: string;

  /** Operation details object. */
  1: { [K: string]: any };
}

/**
 * A `comment` operation.
 * It is used both to create a comment and a post.
 */
export interface CommentOperation extends Operation {
  0: 'comment';
  1: {
    /** Author of the parent comment. If it's a post, it has to be an empty string. */
    parent_author: string;

    /** Permlink of the parent comment. If it's a post, it should be a main tag (category). */
    parent_permlink: string;

    /** Author of the comment. */
    author: string;

    /** Permlink of the comment. It has to be unique (user can't publish two comments with the same permlink). */
    permlink: string;

    /** Title of the comment. */
    title: string;

    /** Body of the comment. */
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
  };
}

/**
 * A `comment_options` operation.
 * It is actually an extension for a `comment` operation, thus the `comment` operation has to be broadcasted first.
 */
export interface CommentOptionsOperation extends Operation {
  0: 'comment_options';
  1: {
    /** Author of the `comment` and `comment_options` operations. */
    author: string;

    /** Permlink of the comment. */
    permlink: string;

    /**
     * Maximal payout (in Steem Dollars) the comment might receive.
     * @example '1000.000 SBD'
     */
    max_accepted_payout: string;

    /**
     * Percent of Steem Dollars in the payout, remaining part will be received as Steem Power.
     * @example 10000 (50%, maximum)
     * @example 0 (0%, minimum)
     */
    percent_steem_dollars: number;

    /** Allows or disallows a comment to receive votes. */
    allow_votes: boolean;

    /**
     * Allows or disallows voters to receive curation rewards.
     * If disallowed, curation rewards would return to the reward pool.
     */
    allow_curation_rewards: boolean;

    /**
     * Either an empty array or array of beneficiaries.
     * @example []
     * @example [[0, { beneficiaries: [{ account: 'jakipatryk', weight: 500 }] }]]
     */
    extensions: Array<
      [0, { beneficiaries: Array<{ account: string; weight: number }> }]
    >;
  };
}

/**
 * In this application, we consider a Steem post operation as a combination of `comment` and `comment_options` operations.
 */
export interface SteemPostOperation extends Array<Operation> {
  0: CommentOperation;
  1: CommentOptionsOperation;
}

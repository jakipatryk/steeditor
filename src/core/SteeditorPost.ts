/**
 * An interface which is used within this application as a base for a post/draft/template/etc.
 */
export interface SteeditorPost {
  /** The post title. It is also used to generate a permlink. */
  title: string;

  /** The post body. It is also used also to extract information (mentions, links, images, format) from. */
  body: string;

  /** An array of tags, the first one will be a category. */
  tags: Array<string>;

  /** A community the post should belong to. */
  community: string;

  /** A URL to image which doesn't have to appear in the post body, but most of a Steem interfaces show it as a thumbnail. */
  thumbnailUrl: string;

  /**
   * An array of beneficiaires.
   * A beneficiary is an account which receives a part of the payout.
   * @example [{account: 'jakipatryk', weight: 50}] // 50% of payout would go to beneficiary 'jakipatryk'
   */
  beneficiaries: Array<{
    account: string;
    weight: number;
  }>;

  /** Whether voting on the post should be allowed. */
  allowVotes: boolean;

  /** Whether curation rewards on the post should be enabled. */
  allowCurationRewards: boolean;

  /**
   * Percent of Steem Dollars in the payout, remaining part will be received as Steem Power.
   * @example 50 (50%, maximum)
   * @example 0 (0%, minimum)
   */
  percentSteemDollars: number;

  /**
   * Maximal payout (in Steem Dollars) the post might receive.
   * @example 10000
   * @example 0
   */
  maxAcceptedPayout: number;

  /** Additional metadata to be added to the post's `json_metadata`. */
  jsonMetadata: string;

  /** Optional permlink, should be used when editing an existing (on blockchain) post. */
  permlink?: string;
}

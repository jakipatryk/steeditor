import { SteemPost } from '../../core';

export interface UserDataResponse {
  id: number;
  name: string;
  owner: {
    weight_threshold: number;
    account_auths: any[];
    key_auths: any[][];
  };
  active: {
    weight_threshold: number;
    account_auths: any[];
    key_auths: any[][];
  };
  posting: {
    weight_threshold: number;
    account_auths: any[];
    key_auths: any[][];
  };
  memo_key: string;
  json_metadata: string;
  proxy: string;
  last_owner_update: Date;
  last_account_update: Date;
  created: Date;
  mined: boolean;
  recovery_account: string;
  last_account_recovery: Date;
  reset_account: string;
  comment_count: number;
  lifetime_vote_count: number;
  post_count: number;
  can_vote: boolean;
  voting_power: number;
  last_vote_time: Date;
  balance: string;
  savings_balance: string;
  sbd_balance: string;
  sbd_seconds: string;
  sbd_seconds_last_update: Date;
  sbd_last_interest_payment: Date;
  savings_sbd_balance: string;
  savings_sbd_seconds: string;
  savings_sbd_seconds_last_update: Date;
  savings_sbd_last_interest_payment: Date;
  savings_withdraw_requests: number;
  reward_sbd_balance: string;
  reward_steem_balance: string;
  reward_vesting_balance: string;
  reward_vesting_steem: string;
  vesting_shares: string;
  delegated_vesting_shares: string;
  received_vesting_shares: string;
  vesting_withdraw_rate: string;
  next_vesting_withdrawal: Date;
  withdrawn: number;
  to_withdraw: number;
  withdraw_routes: number;
  curation_rewards: number;
  posting_rewards: number;
  proxied_vsf_votes: number[];
  witnesses_voted_for: number;
  last_post: Date;
  last_root_post: Date;
  average_bandwidth: string;
  lifetime_bandwidth: string;
  last_bandwidth_update: Date;
  average_market_bandwidth: number;
  lifetime_market_bandwidth: number;
  last_market_bandwidth_update: Date;
  vesting_balance: string;
  reputation: number;
  transfer_history: any[];
  market_history: any[];
  post_history: any[];
  vote_history: any[];
  other_history: any[];
  witness_votes: any[];
  tags_usage: any[];
  guest_bloggers: any[];
}

export interface UserPostsResponse {
  posts: Array<{
    comment: Partial<SteemPost>;
    blog: string;
    reblog_on: string;
    entry_id: number;
  }>;
  lastCheckedId: number;
}

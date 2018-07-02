import { SteemPost } from '../SteemPost';
import { withPercentSteemDollars } from './withPercentSteemDollars';

fdescribe('#core #steeditorize withPercentSteemDollars', () => {
  let steemPost: SteemPost;

  beforeEach(() => {
    steemPost = {
      id: 1,
      author: '',
      permlink: '',
      category: '',
      parent_author: '',
      parent_permlink: '',
      title: '',
      body: '',
      json_metadata: '',
      last_update: '',
      created: '',
      active: '',
      last_payout: '',
      depth: 0,
      children: 0,
      net_rshares: 0,
      abs_rshares: 0,
      vote_rshares: 0,
      children_abs_rshares: 0,
      cashout_time: '',
      max_cashout_time: '',
      total_vote_weight: 0,
      reward_weight: 0,
      total_payout_value: '',
      curator_payout_value: '',
      author_rewards: 0,
      net_votes: 0,
      root_author: '',
      root_permlink: '',
      max_accepted_payout: '',
      percent_steem_dollars: 10000,
      allow_replies: true,
      allow_votes: true,
      allow_curation_rewards: true,
      beneficiaries: [],
      url: '',
      root_title: '',
      pending_payout_value: '',
      total_pending_payout_value: '',
      active_votes: [],
      replies: [],
      author_reputation: '',
      promoted: '',
      body_length: 0,
      reblogged_by: []
    };
  });

  it('should return an object with a `percentSteemDollars` property', () => {
    const result = withPercentSteemDollars(steemPost)({});

    expect(result.percentSteemDollars).toEqual(50);
  });

  it('should NOT mutate the original `steemPost` object', () => {
    withPercentSteemDollars(steemPost)({});

    expect(steemPost).toEqual({
      id: 1,
      author: '',
      permlink: '',
      category: '',
      parent_author: '',
      parent_permlink: '',
      title: '',
      body: '',
      json_metadata: '',
      last_update: '',
      created: '',
      active: '',
      last_payout: '',
      depth: 0,
      children: 0,
      net_rshares: 0,
      abs_rshares: 0,
      vote_rshares: 0,
      children_abs_rshares: 0,
      cashout_time: '',
      max_cashout_time: '',
      total_vote_weight: 0,
      reward_weight: 0,
      total_payout_value: '',
      curator_payout_value: '',
      author_rewards: 0,
      net_votes: 0,
      root_author: '',
      root_permlink: '',
      max_accepted_payout: '',
      percent_steem_dollars: 10000,
      allow_replies: true,
      allow_votes: true,
      allow_curation_rewards: true,
      beneficiaries: [],
      url: '',
      root_title: '',
      pending_payout_value: '',
      total_pending_payout_value: '',
      active_votes: [],
      replies: [],
      author_reputation: '',
      promoted: '',
      body_length: 0,
      reblogged_by: []
    });
  });

  it('should NOT mutate the original `target` object', () => {
    const target = {
      body: 'any'
    };

    withPercentSteemDollars(steemPost)(target);

    expect(target).toEqual({
      body: 'any'
    });
  });
});

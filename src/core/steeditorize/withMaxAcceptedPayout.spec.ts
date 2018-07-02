import { SteemPost } from '../SteemPost';
import { withMaxAcceptedPayout } from './withMaxAcceptedPayout';

fdescribe('#core #steeditorize withMaxAcceptedPayout', () => {
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
      max_accepted_payout: '505.000 SBD',
      percent_steem_dollars: 0,
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

  it('should return an object with a `maxAcceptedPayout` property', () => {
    const result = withMaxAcceptedPayout(steemPost)({});

    expect(result.maxAcceptedPayout).toEqual(505);
  });

  it('should NOT mutate the original `steemPost` object', () => {
    withMaxAcceptedPayout(steemPost)({});

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
      max_accepted_payout: '505.000 SBD',
      percent_steem_dollars: 0,
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

    withMaxAcceptedPayout(steemPost)(target);

    expect(target).toEqual({
      body: 'any'
    });
  });
});

import { SteemPost } from '../SteemPost';
import { convertBeneficiaries, withBeneficiaries } from './withBeneficiaries';

fdescribe('#core #steeditorize convertBeneficiaries', () => {
  it('should return an empty array if empty array was provided', () => {
    const beneficiaries = convertBeneficiaries([]);

    expect(beneficiaries).toEqual([]);
  });

  it('should return an array with `SteeditorPost`s beneficiaries with correctly calculated weights', () => {
    const beneficiaries = convertBeneficiaries([
      { account: 'jakipatryk', weight: 1000 },
      { account: 'jakipatryk-dev', weight: 2000 }
    ]);

    expect(beneficiaries).toEqual([
      { account: 'jakipatryk', weight: 10 },
      { account: 'jakipatryk-dev', weight: 20 }
    ]);
  });
});

fdescribe('#core #steeditorize withBeneficiaries', () => {
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

  it('should return an object with a `beneficiaries` property', () => {
    const result = withBeneficiaries(steemPost)({});

    expect(result.beneficiaries).toBeDefined();
  });

  it('should NOT mutate the original `steemPost` object', () => {
    withBeneficiaries(steemPost)({});

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

    withBeneficiaries(steemPost)(target);

    expect(target).toEqual({
      body: 'any'
    });
  });
});

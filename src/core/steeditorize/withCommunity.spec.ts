import { SteemPost } from '../SteemPost';
import { getCommunity, withCommunity } from './withCommunity';

fdescribe('#core #steeditorize getCommunity', () => {
  it('should return an empty string if `community` property is NOT defined in the JSON metadata', () => {
    const community = getCommunity(
      '{"tags":["tag1","tag2"],"format":"markdown"}'
    );

    expect(community).toBe('');
  });

  it('should return an empty string if an empty string was provided', () => {
    const community = getCommunity('');

    expect(community).toBe('');
  });

  it('should return a community name if `community` property is defined in the JSON metadata', () => {
    const community = getCommunity(
      '{"tags":["tag1","tag2"],"format":"markdown","community":"steemstem"}'
    );

    expect(community).toBe('steemstem');
  });
});

fdescribe('#core #steeditorize withCommunity', () => {
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

  it('should return an object with a `community` property', () => {
    const result = withCommunity(steemPost)({});

    expect(result.community).toBeDefined();
  });

  it('should NOT mutate the original `steemPost` object', () => {
    withCommunity(steemPost)({});

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

    withCommunity(steemPost)(target);

    expect(target).toEqual({
      body: 'any'
    });
  });
});

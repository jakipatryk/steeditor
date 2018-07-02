import { SteemPost } from '../SteemPost';
import { getCustomJsonMetadata, withJsonMetadata } from './withJsonMetadata';

fdescribe('#core #steeditorize getCustomJsonMetadata', () => {
  it('should return an empty string if provided metadata is empty', () => {
    const customMetadata = getCustomJsonMetadata('');

    expect(customMetadata).toBe('');
  });

  it('should return an empty string if provided metadata is not a JSON', () => {
    const customMetadata = getCustomJsonMetadata('abc');

    expect(customMetadata).toBe('');
  });

  it('should return an empty string if only properties managed by Steeditors metadata creator are provided', () => {
    const customMetadata = getCustomJsonMetadata(
      '{"app":"busy","format":"markdown","links":["link1","link2"]}'
    );

    expect(customMetadata).toBe('');
  });

  it('should return custom metadata if NOT only properties managed by Steeditors metadata creator are provided', () => {
    const customMetadata = getCustomJsonMetadata(
      '{"app":"busy","format":"markdown","links":["link1","link2"],"unknown_prop":"test"}'
    );

    expect(customMetadata).toContain('unknown_prop');
    expect(customMetadata).toContain('test');
  });

  it('should return custom metadata if only properties NOT managed by Steeditors metadata creator are provided', () => {
    const customMetadata = getCustomJsonMetadata('{"unknown_prop":"test"}');

    expect(customMetadata).toContain('unknown_prop');
    expect(customMetadata).toContain('test');
  });
});

fdescribe('#core #steeditorize withJsonMetadata', () => {
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

  it('should return an object with a `jsonMetadata` property', () => {
    const result = withJsonMetadata(steemPost)({});

    expect(result.jsonMetadata).toBeDefined();
  });

  it('should NOT mutate the original `steemPost` object', () => {
    withJsonMetadata(steemPost)({});

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

    withJsonMetadata(steemPost)(target);

    expect(target).toEqual({
      body: 'any'
    });
  });
});

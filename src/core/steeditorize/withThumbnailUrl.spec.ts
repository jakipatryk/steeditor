import { SteemPost } from '../SteemPost';
import { getThumbnailUrl, withThumbnailUrl } from './withThumbnailUrl';

fdescribe('#core #steeditorize getThumbnailUrl', () => {
  it('should return an empty string if `image` property is NOT defined in the JSON metadata', () => {
    const thumbnailUrl = getThumbnailUrl(
      '{"format":"markdown","community":"steemstem"}'
    );

    expect(thumbnailUrl).toEqual('');
  });

  it('should return an empty string if `image` property is defined in the JSON metadata, but it is empty', () => {
    const thumbnailUrl = getThumbnailUrl(
      '{"format":"markdown","community":"steemstem","image":""}'
    );

    expect(thumbnailUrl).toEqual('');
  });

  it('should return an empty string if an empty string was provided', () => {
    const thumbnailUrl = getThumbnailUrl('');

    expect(thumbnailUrl).toEqual('');
  });

  it('should return first element of `images` property if it is defined in the JSON metadata and it is NOT empty', () => {
    const thumbnailUrl = getThumbnailUrl(
      '{"tags":["tag1","tag2"],"format":"markdown","image":["image1","image2"],"community":"steemstem"}'
    );

    expect(thumbnailUrl).toEqual('image1');
  });
});

fdescribe('#core #steeditorize withThumbnailUrl', () => {
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

  it('should return an object with a `thumbnailUrl` property', () => {
    const result = withThumbnailUrl(steemPost)({});

    expect(result.thumbnailUrl).toBeDefined();
  });

  it('should NOT mutate the original `steemPost` object', () => {
    withThumbnailUrl(steemPost)({});

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

    withThumbnailUrl(steemPost)(target);

    expect(target).toEqual({
      body: 'any'
    });
  });
});

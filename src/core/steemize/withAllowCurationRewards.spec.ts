import { SteeditorPost } from '../SteeditorPost';
import { withAllowCurationRewards } from './withAllowCurationRewards';

fdescribe('#core #steemize withAllowCurationRewards', () => {
  let steeditorPost: SteeditorPost;

  beforeEach(() => {
    steeditorPost = {
      title: '',
      body: '',
      thumbnailUrl: '',
      community: '',
      tags: [],
      jsonMetadata: '',
      beneficiaries: [],
      allowVotes: true,
      allowCurationRewards: true,
      percentSteemDollars: 50,
      maxAcceptedPayout: 1000
    };
  });

  it('should return an object with a `allow_curation_rewards` property', () => {
    const result = withAllowCurationRewards(steeditorPost)({});

    expect(result.allow_curation_rewards).toBe(true);
  });

  it('should NOT mutate the original `steeditorPost` object', () => {
    withAllowCurationRewards(steeditorPost)({});

    expect(steeditorPost).toEqual({
      title: '',
      body: '',
      thumbnailUrl: '',
      tags: [],
      community: '',
      jsonMetadata: '',
      beneficiaries: [],
      allowVotes: true,
      allowCurationRewards: true,
      percentSteemDollars: 50,
      maxAcceptedPayout: 1000
    });
  });

  it('should NOT mutate the original `target` object', () => {
    const target = {
      title: 'any'
    };

    withAllowCurationRewards(steeditorPost)(target);

    expect(target).toEqual({
      title: 'any'
    });
  });
});

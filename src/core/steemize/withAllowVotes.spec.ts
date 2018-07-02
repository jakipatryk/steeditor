import { SteeditorPost } from '../SteeditorPost';
import { withAllowVotes } from './withAllowVotes';

fdescribe('#core #steemize withAllowVotes', () => {
  let steeditorPost: SteeditorPost;

  beforeEach(() => {
    steeditorPost = {
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
    };
  });

  it('should return an object with a `allow_votes` property', () => {
    const result = withAllowVotes(steeditorPost)({});

    expect(result.allow_votes).toBeDefined();
  });

  it('should NOT mutate the original `steeditorPost` object', () => {
    withAllowVotes(steeditorPost)({});

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

    withAllowVotes(steeditorPost)(target);

    expect(target).toEqual({
      title: 'any'
    });
  });
});

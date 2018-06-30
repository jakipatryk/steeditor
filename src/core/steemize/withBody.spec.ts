import { SteeditorPost } from '../SteeditorPost';
import { withBody } from './withBody';

fdescribe('#core #steemize withBody', () => {
  let steeditorPost: SteeditorPost;

  beforeEach(() => {
    steeditorPost = {
      title: '',
      body: 'any body',
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

  it('should return an object with a `body` property', () => {
    const result = withBody(steeditorPost)({});

    expect(result.body).toBe('any body');
  });

  it('should NOT mutate the original `steeditorPost` object', () => {
    withBody(steeditorPost)({});

    expect(steeditorPost).toEqual({
      title: '',
      body: 'any body',
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

    withBody(steeditorPost)(target);

    expect(target).toEqual({
      title: 'any'
    });
  });
});

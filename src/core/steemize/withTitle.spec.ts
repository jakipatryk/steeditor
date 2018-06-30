import { SteeditorPost } from '../SteeditorPost';
import { withTitle } from './withTitle';

fdescribe('#core #steemize withTitle', () => {
  let steeditorPost: SteeditorPost;

  beforeEach(() => {
    steeditorPost = {
      title: 'This is America',
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

  it('should return an object with a `title` property', () => {
    const result = withTitle(steeditorPost)({});

    expect(result.title).toBe('This is America');
  });

  it('should NOT mutate the original `steeditorPost` object', () => {
    withTitle(steeditorPost)({});

    expect(steeditorPost).toEqual({
      title: 'This is America',
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
      body: 'any'
    };

    withTitle(steeditorPost)(target);

    expect(target).toEqual({
      body: 'any'
    });
  });
});

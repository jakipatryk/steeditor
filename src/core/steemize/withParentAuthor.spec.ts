import { SteeditorPost } from '../SteeditorPost';
import { withParentAuthor } from './withParentAuthor';

fdescribe('#core #steemize withParentAuthor', () => {
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

  it('should return an object with a `parent_author` property', () => {
    const result = withParentAuthor(steeditorPost)({});

    expect(result.parent_author).toBeDefined();
  });

  it('should NOT mutate the original `steeditorPost` object', () => {
    withParentAuthor(steeditorPost)({});

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
      body: 'any'
    };

    withParentAuthor(steeditorPost)(target);

    expect(target).toEqual({
      body: 'any'
    });
  });
});

import { SteeditorPost } from '../SteeditorPost';
import { withParentPermlink, createParentPermlink } from './withParentPermlink';

fdescribe('#core #steemize createParentPermlink', () => {
  it('should return `steeditor` if main tag is not provided', () => {
    const parentPermlink = createParentPermlink(null);

    expect(parentPermlink).toBe('steeditor');
  });

  it('should return main tag if it is provided', () => {
    const mainTag = 'utopian-io';

    const parentPermlink = createParentPermlink(mainTag);

    expect(parentPermlink).toBe('utopian-io');
  });
});

fdescribe('#core #steemize withParentPermlink', () => {
  let steeditorPost: SteeditorPost;

  beforeEach(() => {
    steeditorPost = {
      title: '',
      body: '',
      thumbnailUrl: '',
      tags: ['tag1', 'tag2'],
      community: '',
      jsonMetadata: '',
      beneficiaries: [],
      allowVotes: true,
      allowCurationRewards: true,
      percentSteemDollars: 50,
      maxAcceptedPayout: 1000
    };
  });

  it('should return an object with a correct `parent_permlink` property', () => {
    const result = withParentPermlink(steeditorPost)({});

    expect(result.parent_permlink).toBeDefined();
  });

  it('should NOT mutate the original `steeditorPost` object', () => {
    withParentPermlink(steeditorPost)({});

    expect(steeditorPost).toEqual({
      title: '',
      body: '',
      thumbnailUrl: '',
      tags: ['tag1', 'tag2'],
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

    withParentPermlink(steeditorPost)(target);

    expect(target).toEqual({
      body: 'any'
    });
  });
});

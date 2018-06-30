import { SteeditorPost } from '../SteeditorPost';
import { withPercentSteemDollars } from './withPercentSteemDollars';

fdescribe('#core #steemize withPercentSteemDollars', () => {
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

  it('should return an object with a calculated `percent_steem_dollars` property', () => {
    const result = withPercentSteemDollars(steeditorPost)({});

    expect(result.percent_steem_dollars).toEqual(10000);
  });

  it('should NOT mutate the original `steeditorPost` object', () => {
    withPercentSteemDollars(steeditorPost)({});

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

    withPercentSteemDollars(steeditorPost)(target);

    expect(target).toEqual({
      body: 'any'
    });
  });
});

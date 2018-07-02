import { SteeditorPost } from '../SteeditorPost';
import { withMaxAcceptedPayout } from './withMaxAcceptedPayout';

fdescribe('#core #steemize withMaxAcceptedPayout', () => {
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

  it('should return an object with a correct `max_accepted_payout` property', () => {
    const result = withMaxAcceptedPayout(steeditorPost)({});

    expect(result.max_accepted_payout).toEqual('1000.000 SBD');
  });

  it('should NOT mutate the original `steeditorPost` object', () => {
    withMaxAcceptedPayout(steeditorPost)({});

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

    withMaxAcceptedPayout(steeditorPost)(target);

    expect(target).toEqual({
      body: 'any'
    });
  });
});

import { SteeditorPost } from '../SteeditorPost';
import { withExtensions, createExtensions } from './withExtensions';

fdescribe('#core #steemize createExtensions', () => {
  it('should return an empty array if there arent any beneficiaries', () => {
    const beneficiaries = [];

    const result = createExtensions(beneficiaries);

    expect(result).toEqual([]);
  });

  it('should return correct structure of extensions with beneficiaries if there are any beneficiaries', () => {
    const beneficiaries = [
      { account: 'jakipatryk', weight: 10 },
      { account: 'jakipatryk-dev', weight: 5 }
    ];

    const result = createExtensions(beneficiaries);

    expect(result).toEqual([
      [
        0,
        {
          beneficiaries: [
            { account: 'jakipatryk', weight: 1000 },
            { account: 'jakipatryk-dev', weight: 500 }
          ]
        }
      ]
    ]);
  });
});

fdescribe('#core #steemize withExtensions', () => {
  let steeditorPost: SteeditorPost;

  beforeEach(() => {
    steeditorPost = {
      title: '',
      body: '',
      thumbnailUrl: '',
      tags: [],
      community: '',
      jsonMetadata: '',
      beneficiaries: [
        { account: 'jakipatryk', weight: 10 },
        { account: 'jakipatryk-dev', weight: 5 }
      ],
      allowVotes: true,
      allowCurationRewards: true,
      percentSteemDollars: 50,
      maxAcceptedPayout: 1000
    };
  });

  it('should return an object with a `extensions` property', () => {
    const result = withExtensions(steeditorPost)({});

    expect(result.extensions).toBeDefined();
  });

  it('should NOT mutate the original `steeditorPost` object', () => {
    withExtensions(steeditorPost)({});

    expect(steeditorPost).toEqual({
      title: '',
      body: '',
      thumbnailUrl: '',
      tags: [],
      community: '',
      jsonMetadata: '',
      beneficiaries: [
        { account: 'jakipatryk', weight: 10 },
        { account: 'jakipatryk-dev', weight: 5 }
      ],
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

    withExtensions(steeditorPost)(target);

    expect(target).toEqual({
      title: 'any'
    });
  });
});

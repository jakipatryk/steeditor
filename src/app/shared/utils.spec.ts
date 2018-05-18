import { OAuth2Token } from './../auth/services/auth.service';
import { Draft } from './../drafts/models/draft.model';
import { steemizeDraft } from './utils';

describe('utils', () => {
  describe('steemizeDraft', () => {
    it('should create operations (comment + comment_options`) based on given draft [no metadata, no mentions, no images, no links]', () => {
      const token: OAuth2Token = {
        access_token: '342432423refsd',
        username: 'jakipatryk-dev',
        expires_in: 648000
      };

      const draft: Draft = {
        title: 'Cool post',
        body: `Amazing post!

  ## Test`,
        tags: 'utopian-io strimi busy',
        thumbnailUrl:
          // tslint:disable-next-line:max-line-length
          'https://images.unsplash.com/photo-1514041790697-53f1f86214d2?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b7ac79503fbe78855a346c8d814f95ba&auto=format&fit=crop&w=1950&q=80',
        beneficiaries: [{ account: 'utopian.pay', weight: 10 }],
        allowVotes: true,
        allowCurationRewards: true,
        percentSteemDollars: 50,
        maxAcceptedPayout: 1000000,
        jsonMetadata: ''
      };

      const expectedOperations = [
        [
          'comment',
          {
            parent_permlink: 'utopian-io',
            author: 'jakipatryk-dev',
            permlink: '',
            body: `Amazing post!

  ## Test`,
            parent_author: '',
            title: 'Cool post',
            json_metadata: JSON.stringify({
              app: 'Steeditor',
              tags: ['utopian-io', 'strimi', 'busy'],
              image: [
                // tslint:disable-next-line:max-line-length
                'https://images.unsplash.com/photo-1514041790697-53f1f86214d2?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=b7ac79503fbe78855a346c8d814f95ba&auto=format&fit=crop&w=1950&q=80'
              ],
              users: [],
              links: []
            })
          }
        ],
        [
          'comment_options',
          {
            author: 'jakipatryk-dev',
            permlink: '',
            max_accepted_payout: '1000000.000 SBD',
            percent_steem_dollars: 10000,
            allow_votes: true,
            allow_curation_rewards: true,
            extensions: []
          }
        ]
      ];

      expect(steemizeDraft(draft, token)).toBeDefined();
    });
  });
});

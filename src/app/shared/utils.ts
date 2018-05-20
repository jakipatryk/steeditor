import { AbstractControl } from '@angular/forms';
import { OAuth2Token } from './../auth/services/auth.service';
import { Beneficiary } from './../drafts/models/beneficiary.model';
import { Draft } from './../drafts/models/draft.model';

/**
 * Converts an array into entities.
 * @param arr An array you want to convert.
 * @param identifier The identifier you want to use as a key.
 * @returns Entities.
 * @example
 * makeEntities({name: 'google', body: 'test test', ranking: 40}, {name: 'yahoo', body: 'test 2', ranking: 90}, 'name');
 * // returns: { 'google': {name: 'google', body: 'test test', ranking: 40}, 'yahoo': {name: 'yahoo', body: 'test 2', ranking: 90} }
 */
export const makeEntities = <T>(
  arr: Array<T>,
  identifier: string
): { [identifier: string]: T } =>
  arr.reduce(
    (entities, current) => ({ ...entities, [current[identifier]]: current }),
    {}
  );

/**
 * Immutable way to delete an entity of given id.
 * @param entities The entities object from which you want to delete element.
 * @param id The id of entity to delete.
 * @returns Entities without the element of given id.
 * @example
 * deleteEntity({ 123: { ... }, 33: { ... } }, 33);
 * // { 123: { … } }
 */
export const deleteEntity = <T>(entities: T, id: string | number): T =>
  Object.keys(entities)
    .filter(currentId => currentId !== id.toString())
    .reduce(
      (newEntities, entityId) => {
        newEntities[entityId] = entities[entityId];
        return newEntities;
      },
      {} as T
    );

/**
 * Validates a JSON from a form control.
 * @returns {null | object} null if JSON is valid, otherwise object with `invalidJson: true` property
 */
export const validateJSON = (control: AbstractControl): null | object => {
  try {
    JSON.parse(control.value);
    return null;
  } catch (err) {
    return control.value
      ? {
          invalidJson: true
        }
      : null;
  }
};

/**
 * Creates Steem operations based on given draft and token.
 * @param draft A draft to convert to Steem operations.
 * @param token A token object (`access_token`, `username`, and `expires_in`) of a user.
 */
export const steemizeDraft = (draft: Draft, token: OAuth2Token) => {
  const permlink = Date.now().toString();
  const draftMetadata = draft.jsonMetadata
    ? JSON.parse(draft.jsonMetadata)
    : {};
  const tags = draft.tags.split(' ');
  const maxAcceptedPayout = `${draft.maxAcceptedPayout}.000 SBD`;
  const percentSteemDollars = draft.percentSteemDollars * 200;
  const mentions = draft.body.match(mentionsPattern)
    ? unique(draft.body.match(mentionsPattern))
    : [];
  const links = draft.body.match(urlsPattern)
    ? unique(draft.body.match(urlsPattern))
    : [];
  const images = draft.body.match(imagesPattern)
    ? unique(
        draft.body
          .match(imagesPattern)
          // this returns array of entire markdown tags, so we have to extract links to images from them
          .map(markdownImage => markdownImage.match(urlPattern)[0])
          // this returns array of links with a bracket at the end, so we have to remove it
          .map(imageUrl => {
            const imageUrlArray = imageUrl.split('');
            imageUrlArray.pop();
            return imageUrlArray.join('');
          })
      )
    : [];
  const imagesWithThumbnail = draft.thumbnailUrl
    ? [draft.thumbnailUrl, ...images]
    : [...images];
  const extensions = draft.beneficiaries.length
    ? createExtensionsOfBeneficiaries(draft.beneficiaries)
    : [];

  return [
    [
      'comment',
      {
        author: token.username,
        permlink,
        parent_permlink: tags[0],
        parent_author: '',
        title: draft.title,
        body: draft.body,
        json_metadata: JSON.stringify({
          app: 'Steeditor',
          format: 'markdown',
          users: mentions,
          image: imagesWithThumbnail,
          links,
          tags,
          ...draftMetadata
        })
      }
    ],
    [
      'comment_options',
      {
        author: token.username,
        permlink,
        max_accepted_payout: maxAcceptedPayout,
        percent_steem_dollars: percentSteemDollars,
        // allow_votes: draft.allowVotes,
        allow_votes: true,
        allow_curation_rewards: draft.allowCurationRewards,
        extensions
      }
    ]
  ];
};

/**
 * Creates `extensions` for `comment_options` based on given array of beneficiaries.
 * @param beneficiaries Array of beneficiaries.
 */
export const createExtensionsOfBeneficiaries = (
  beneficiaries: Array<Beneficiary>
) => [
  [
    0,
    {
      beneficiaries: beneficiaries.map(beneficiary => ({
        account: beneficiary.account,
        weight: beneficiary.weight * 100
      }))
    }
  ]
];

/**
 * Immutable way to remove duplicates from an array.
 * @param arr Any array.
 * @returns Array without duplicates.
 */
export const unique = (arr: Array<any>) => {
  const seen = {};
  return arr.filter(
    item => (seen.hasOwnProperty(item) ? false : (seen[item] = true))
  );
};

/**
 * A RegExp pattern for a URL.
 */
// tslint:disable-next-line:max-line-length
export const urlPattern: RegExp = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/;

/**
 * A RegExp pattern for URLs.
 */
// tslint:disable-next-line:max-line-length
export const urlsPattern: RegExp = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/g;

/**
 * A RegExp pattern for user metions.
 */
export const mentionsPattern: RegExp = /@([a-zA-Z.0-9-]+)/g;

/**
 * A RegExp pattern for images in markdown tags.
 */
export const imagesPattern: RegExp = /(?:!\[(.*?)\]\((.*?)\))/g;

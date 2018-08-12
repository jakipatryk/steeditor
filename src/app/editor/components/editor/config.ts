import { pipe, always, mergeDeepRight, ifElse, isNil, identity } from 'ramda';

export interface Field<T> {
  value: T;
  disabled: boolean;
}

export interface TitleField extends Field<string> {}

export interface BodyField extends Field<string> {}

export interface CommunityField extends Field<string> {}

export interface TagsField extends Field<string[]> {
  disableRemovingFirstTag: boolean;
}

export interface ThumbnailUrlField extends Field<string> {}

export interface AllowVotesField extends Field<boolean> {}

export interface AllowCurationRewardsField extends Field<boolean> {}

export interface PercentSteemDollarsField extends Field<number> {
  min: number;
  max: number;
}

export interface MaxAcceptedPayoutField extends Field<number> {
  min: number;
  max: number;
}

export interface JsonMetadataField extends Field<string> {}

export interface BeneficiariesField
  extends Field<
      Array<{
        account: string;
        weight: number;
      }>
    > {
  disableAdding: boolean;
  disableRemoving: boolean;
}

export interface EditorFields {
  title: TitleField;
  body: BodyField;
  community: CommunityField;
  tags: TagsField;
  thumbnailUrl: ThumbnailUrlField;
  allowVotes: AllowVotesField;
  allowCurationRewards: AllowCurationRewardsField;
  percentSteemDollars: PercentSteemDollarsField;
  maxAcceptedPayout: MaxAcceptedPayoutField;
  jsonMetadata: JsonMetadataField;
  beneficiaries: BeneficiariesField;
}

export interface EditorConfig {
  /**
   * Config of all fields available in the editor.
   */
  fields: EditorFields;

  /**
   * Time in milliseconds to wait after form changes, before triggering `whenChanges` event.
   */
  whenChangesDebounceTime: number;

  /**
   * Text to be displayed in a *Summary* section of the editor when forms are valid.
   */
  summaryStepValidText: string;

  /**
   * Text to be displayed in a *Summary* section of the editor when forms are invalid.
   */
  summaryStepInvalidText: string;

  /**
   * Text to be displayed on a button which submits `SteeditorPost`
   */
  submitButtonText: string;

  /**
   * Whether submit button should be disabled (it is also disabled when forms are invalid).
   */
  submitButtonDisabled: boolean;

  /**
   * Whether user should be able to submit form even if it is invalid.
   */
  acceptInvalid: boolean;
}

export const initialConfig: EditorConfig = {
  fields: {
    title: {
      value: '',
      disabled: false
    },
    body: {
      value: '',
      disabled: false
    },
    community: {
      value: '',
      disabled: false
    },
    tags: {
      value: [],
      disabled: false,
      disableRemovingFirstTag: false
    },
    thumbnailUrl: {
      value: '',
      disabled: false
    },
    allowVotes: {
      value: true,
      // TBC when a bug in api.steemit.com is removed
      disabled: true
    },
    allowCurationRewards: {
      value: true,
      disabled: false
    },
    percentSteemDollars: {
      value: 50,
      disabled: false,
      min: 0,
      max: 50
    },
    maxAcceptedPayout: {
      value: 1000000,
      disabled: false,
      min: 0,
      max: 1000000
    },
    jsonMetadata: {
      value: '',
      disabled: false
    },
    beneficiaries: {
      value: [],
      disabled: false,
      disableAdding: false,
      disableRemoving: false
    }
  },
  whenChangesDebounceTime: 3000,
  summaryStepValidText:
    'Everything is correct, the post is ready to be sent to the Steem blockchain!',
  summaryStepInvalidText:
    'The form is invalid, make sure you fill out all required fields and the data is correct!',
  submitButtonText: 'Send',
  submitButtonDisabled: false,
  acceptInvalid: false
};

type DeepPartial<T> = { [P in keyof T]?: DeepPartial<T[P]> };

/**
 * Creates `EditorConfig` based on an object where all of `EditorConfig`'s properties are optional.
 * It can be called without arguments too.
 */
export const createEditorConfig: (
  config?: DeepPartial<EditorConfig>
) => EditorConfig = pipe(
  ifElse(isNil, always({}), identity),
  mergeDeepRight(initialConfig)
);

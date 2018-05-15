import { Draft, standardDraft } from './draft.model';

export interface Template {
  name: string;
  description: string;
  initialDraft: Draft;
}

export const standardTemplate: Template = {
  name: 'Standard',
  description:
    // tslint:disable-next-line:max-line-length
    'A standard template, which does not come with any contents, but sets up advanced options for you (allow votes, 50/50 rewards split, etc.).',
  initialDraft: standardDraft
};

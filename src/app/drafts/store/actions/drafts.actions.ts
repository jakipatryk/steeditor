import { Draft } from '../../models/draft.model';
import {
  SuperAction,
  SuperActionWithPayload
} from '../../../shared/interfaces';

// ACTIONS CONSTANTS

export enum DraftsActionsTypes {
  LoadDrafts = '[Drafts] Load Drafts',
  LoadDraftsSuccess = '[Drafts] Load Drafts Success',
  LoadDraftsFail = '[Drafts] Load Drafts Fail',
  CreateDraft = '[Drafts] Create Draft',
  CreateDraftSuccess = '[Drafts] Create Draft Success',
  CreateDraftFail = '[Drafts] Create Draft Fail',
  UpdateDraft = '[Drafts] Update Draft',
  UpdateDraftSuccess = '[Drafts] Update Draft Success',
  UpdateDraftFail = '[Drafts] Update Draft Fail',
  RemoveDraft = '[Drafts] Remove Draft',
  RemoveDraftSuccess = '[Drafts] Remove Draft Success',
  RemoveDraftFail = '[Drafts] Remove Draft Fail',
  BroadcastDraft = '[Drafts] Broadcast Draft',
  BroadcastDraftSuccess = '[Drafts] Broadcast Draft Success',
  BroadcastDraftFail = '[Drafts] Broadcast Draft Fail'
}

// ACTION TYPESCRIPT TYPES

export type LoadDrafts = SuperAction<DraftsActionsTypes.LoadDrafts>;
export type LoadDraftsSuccess = SuperActionWithPayload<
  DraftsActionsTypes.LoadDraftsSuccess,
  { [K: string]: Draft }
>;
export type LoadDraftsFail = SuperAction<DraftsActionsTypes.LoadDraftsFail>;
export type CreateDraft = SuperActionWithPayload<
  DraftsActionsTypes.CreateDraft,
  string
>;
export type CreateDraftSuccess = SuperActionWithPayload<
  DraftsActionsTypes.CreateDraftSuccess,
  Draft
>;
export type CreateDraftFail = SuperAction<DraftsActionsTypes.CreateDraftFail>;
export type UpdateDraft = SuperActionWithPayload<
  DraftsActionsTypes.UpdateDraft,
  Draft
>;
export type UpdateDraftSuccess = SuperActionWithPayload<
  DraftsActionsTypes.UpdateDraftSuccess,
  Draft
>;
export type UpdateDraftFail = SuperAction<DraftsActionsTypes.UpdateDraftFail>;
export type RemoveDraft = SuperActionWithPayload<
  DraftsActionsTypes.RemoveDraft,
  number
>;
export type RemoveDraftSuccess = SuperActionWithPayload<
  DraftsActionsTypes.RemoveDraftSuccess,
  number
>;
export type RemoveDraftFail = SuperAction<DraftsActionsTypes.RemoveDraftFail>;
export type BroadcastDraft = SuperActionWithPayload<
  DraftsActionsTypes.BroadcastDraft,
  Draft
>;
export type BroadcastDraftSuccess = SuperActionWithPayload<
  DraftsActionsTypes.BroadcastDraftSuccess,
  object
>;
export type BroadcastDraftFail = SuperActionWithPayload<
  DraftsActionsTypes.BroadcastDraftFail,
  object
>;
export type DraftsActionsUnion =
  | LoadDrafts
  | LoadDraftsSuccess
  | LoadDraftsFail
  | CreateDraft
  | CreateDraftSuccess
  | CreateDraftFail
  | UpdateDraft
  | UpdateDraftSuccess
  | UpdateDraftFail
  | RemoveDraft
  | RemoveDraftSuccess
  | RemoveDraftFail
  | BroadcastDraft
  | BroadcastDraftSuccess
  | BroadcastDraftFail;

// ACTION CREATORS

export const loadDrafts = (): LoadDrafts => ({
  type: DraftsActionsTypes.LoadDrafts
});

export const loadDraftsSuccess = (drafts: {
  [K: string]: Draft;
}): LoadDraftsSuccess => ({
  type: DraftsActionsTypes.LoadDraftsSuccess,
  payload: drafts
});

export const loadDraftsFail = (): LoadDraftsFail => ({
  type: DraftsActionsTypes.LoadDraftsFail
});

export const createDraft = (template: string): CreateDraft => ({
  type: DraftsActionsTypes.CreateDraft,
  payload: template
});

export const createDraftSuccess = (draft: Draft): CreateDraftSuccess => ({
  type: DraftsActionsTypes.CreateDraftSuccess,
  payload: draft
});

export const createDraftFail = (): CreateDraftFail => ({
  type: DraftsActionsTypes.CreateDraftFail
});

export const updateDraft = (draft: Draft): UpdateDraft => ({
  type: DraftsActionsTypes.UpdateDraft,
  payload: draft
});

export const updateDraftSuccess = (draft: Draft): UpdateDraftSuccess => ({
  type: DraftsActionsTypes.UpdateDraftSuccess,
  payload: draft
});

export const updateDraftFail = (): UpdateDraftFail => ({
  type: DraftsActionsTypes.UpdateDraftFail
});

export const removeDraft = (id: number): RemoveDraft => ({
  type: DraftsActionsTypes.RemoveDraft,
  payload: id
});

export const removeDraftSuccess = (id: number): RemoveDraftSuccess => ({
  type: DraftsActionsTypes.RemoveDraftSuccess,
  payload: id
});

export const removeDraftFail = (): RemoveDraftFail => ({
  type: DraftsActionsTypes.RemoveDraftFail
});

export const broadcastDraft = (draft: Draft): BroadcastDraft => ({
  type: DraftsActionsTypes.BroadcastDraft,
  payload: draft
});

export const broadcastDraftSuccess = (
  response: object
): BroadcastDraftSuccess => ({
  type: DraftsActionsTypes.BroadcastDraftSuccess,
  payload: response
});

export const broadcastDraftFail = (error: object): BroadcastDraftFail => ({
  type: DraftsActionsTypes.BroadcastDraftFail,
  payload: error
});

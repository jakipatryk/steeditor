import { Action } from '@ngrx/store';
import { BroadcastResult } from '../../steemconnect/services/steemconnect-broadcast.service';
import { Draft } from './models';

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

export class LoadDrafts implements Action {
  public readonly type = DraftsActionsTypes.LoadDrafts;
}

export class LoadDraftsSuccess implements Action {
  public readonly type = DraftsActionsTypes.LoadDraftsSuccess;

  constructor(public payload: { drafts: Array<Draft> }) {}
}

export class LoadDraftsFail implements Action {
  public readonly type = DraftsActionsTypes.LoadDraftsFail;
}

export class CreateDraft implements Action {
  public readonly type = DraftsActionsTypes.CreateDraft;
}

export class CreateDraftSuccess implements Action {
  public readonly type = DraftsActionsTypes.CreateDraftSuccess;

  constructor(public payload: { draft: Draft }) {}
}

export class CreateDraftFail implements Action {
  public readonly type = DraftsActionsTypes.CreateDraftFail;
}

export class UpdateDraft implements Action {
  public readonly type = DraftsActionsTypes.UpdateDraft;

  constructor(public payload: { draft: Draft }) {}
}

export class UpdateDraftSuccess implements Action {
  public readonly type = DraftsActionsTypes.UpdateDraftSuccess;

  constructor(public payload: { draft: Draft }) {}
}

export class UpdateDraftFail implements Action {
  public readonly type = DraftsActionsTypes.UpdateDraftFail;
}

export class RemoveDraft implements Action {
  public readonly type = DraftsActionsTypes.RemoveDraft;

  constructor(public payload: { id: number }) {}
}

export class RemoveDraftSuccess implements Action {
  public readonly type = DraftsActionsTypes.RemoveDraftSuccess;

  constructor(public payload: { id: number }) {}
}

export class RemoveDraftFail implements Action {
  public readonly type = DraftsActionsTypes.RemoveDraftFail;
}

export class BroadcastDraft implements Action {
  public readonly type = DraftsActionsTypes.BroadcastDraft;

  constructor(public payload: { draft: Draft }) {}
}

export class BroadcastDraftSuccess implements Action {
  public readonly type = DraftsActionsTypes.BroadcastDraftSuccess;

  constructor(public payload: { response: BroadcastResult }) {}
}

export class BroadcastDraftFail implements Action {
  public readonly type = DraftsActionsTypes.BroadcastDraftFail;

  constructor(
    public payload: {
      error: {
        error: string;
        error_description: string;
      };
    }
  ) {}
}

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

export const loadDrafts = (): LoadDrafts => new LoadDrafts();

export const loadDraftsSuccess = (drafts: Array<Draft>): LoadDraftsSuccess =>
  new LoadDraftsSuccess({ drafts });

export const loadDraftsFail = (): LoadDraftsFail => new LoadDraftsFail();

export const createDraft = (): CreateDraft => new CreateDraft();

export const createDraftSuccess = (draft: Draft): CreateDraftSuccess =>
  new CreateDraftSuccess({ draft });

export const createDraftFail = (): CreateDraftFail => new CreateDraftFail();

export const updateDraft = (draft: Draft): UpdateDraft =>
  new UpdateDraft({ draft });

export const updateDraftSuccess = (draft: Draft): UpdateDraftSuccess =>
  new UpdateDraftSuccess({ draft });

export const updateDraftFail = (): UpdateDraftFail => new UpdateDraftFail();

export const removeDraft = (id: number): RemoveDraft => new RemoveDraft({ id });

export const removeDraftSuccess = (id: number): RemoveDraftSuccess =>
  new RemoveDraftSuccess({ id });

export const removeDraftFail = (): RemoveDraftFail => new RemoveDraftFail();

export const broadcastDraft = (draft: Draft): BroadcastDraft =>
  new BroadcastDraft({ draft });

export const broadcastDraftSuccess = (
  response: BroadcastResult
): BroadcastDraftSuccess => new BroadcastDraftSuccess({ response });

export const broadcastDraftFail = (error: {
  error: string;
  error_description: string;
}): BroadcastDraftFail => new BroadcastDraftFail({ error });

export const draftsActionCreators = {
  loadDrafts,
  loadDraftsSuccess,
  loadDraftsFail,
  createDraft,
  createDraftSuccess,
  createDraftFail,
  updateDraft,
  updateDraftSuccess,
  updateDraftFail,
  removeDraft,
  removeDraftSuccess,
  removeDraftFail,
  broadcastDraft,
  broadcastDraftSuccess,
  broadcastDraftFail
};

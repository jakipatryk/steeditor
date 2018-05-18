import { SuperActionWithPayload } from '../../../shared/interfaces';
import { Draft } from '../../models/draft.model';

// ACTION CONSTANTS

export enum BroadcastActionsTypes {
  Broadcast = '[Drafts] Broadcast',
  BroadcastSuccess = '[Drafts] Broadcast Success',
  BroadcastFail = '[Drafts] Broadcast Fail'
}

// ACTION TYPESCRIPT TYPES
export type Broadcast = SuperActionWithPayload<
  BroadcastActionsTypes.Broadcast,
  Draft
>;
export type BroadcastSuccess = SuperActionWithPayload<
  BroadcastActionsTypes.BroadcastSuccess,
  object
>;
export type BroadcastFail = SuperActionWithPayload<
  BroadcastActionsTypes.BroadcastFail,
  object
>;
export type BroadcastActionsUnion =
  | Broadcast
  | BroadcastSuccess
  | BroadcastFail;

// ACTION CREATORS

export const broadcast = (draft: Draft): Broadcast => ({
  type: BroadcastActionsTypes.Broadcast,
  payload: draft
});

export const broadcastSuccess = (response: object): BroadcastSuccess => ({
  type: BroadcastActionsTypes.BroadcastSuccess,
  payload: response
});

export const broadcastFail = (error: object): BroadcastFail => ({
  type: BroadcastActionsTypes.BroadcastFail,
  payload: error
});

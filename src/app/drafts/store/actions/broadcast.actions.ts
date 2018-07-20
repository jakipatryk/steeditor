import { SteeditorPost } from '../../../../core';
import { SuperActionWithPayload } from '../../../shared/interfaces';

// ACTION CONSTANTS

export enum BroadcastActionsTypes {
  Broadcast = '[Drafts] Broadcast',
  BroadcastSuccess = '[Drafts] Broadcast Success',
  BroadcastFail = '[Drafts] Broadcast Fail'
}

// ACTION TYPESCRIPT TYPES
export type Broadcast = SuperActionWithPayload<
  BroadcastActionsTypes.Broadcast,
  SteeditorPost
>;
export type BroadcastSuccess = SuperActionWithPayload<
  BroadcastActionsTypes.BroadcastSuccess,
  object
>;
export type BroadcastFail = SuperActionWithPayload<
  BroadcastActionsTypes.BroadcastFail,
  {
    error: string;
    error_description: string;
  }
>;
export type BroadcastActionsUnion =
  | Broadcast
  | BroadcastSuccess
  | BroadcastFail;

// ACTION CREATORS

export const broadcast = (post: SteeditorPost): Broadcast => ({
  type: BroadcastActionsTypes.Broadcast,
  payload: post
});

export const broadcastSuccess = (response: object): BroadcastSuccess => ({
  type: BroadcastActionsTypes.BroadcastSuccess,
  payload: response
});

export const broadcastFail = (error: {
  error: string;
  error_description: string;
}): BroadcastFail => ({
  type: BroadcastActionsTypes.BroadcastFail,
  payload: error
});

import {
  BroadcastActionsTypes,
  BroadcastActionsUnion
} from './../actions/broadcast.actions';

export interface BroadcastState {
  broadcasting: boolean;
  broadcasted: boolean;
  error: boolean;
}

export const initialState: BroadcastState = {
  broadcasting: false,
  broadcasted: false,
  error: false
};

export function broadcastReducer(
  state: BroadcastState = initialState,
  action: BroadcastActionsUnion
): BroadcastState {
  switch (action.type) {
    case BroadcastActionsTypes.Broadcast: {
      return {
        ...state,
        broadcasting: true
      };
    }
    case BroadcastActionsTypes.BroadcastSuccess: {
      return {
        ...state,
        broadcasting: false,
        broadcasted: true,
        error: false
      };
    }
    case BroadcastActionsTypes.BroadcastFail: {
      return {
        ...state,
        broadcasting: false,
        broadcasted: false,
        error: true
      };
    }
    default: {
      return state;
    }
  }
}

export const getBroadcasting = (state: BroadcastState) => state.broadcasting;
export const getBroadcasted = (state: BroadcastState) => state.broadcasted;
export const getError = (state: BroadcastState) => state.error;

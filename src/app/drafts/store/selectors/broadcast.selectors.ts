import { createSelector } from '@ngrx/store';

import * as fromFeature from '../reducers';
import * as fromBroadcast from '../reducers/broadcast.reducer';

export const selectBroadcastState = createSelector(
  fromFeature.selectDraftsState,
  (state: fromFeature.State) => state.broadcast
);

export const selectBroadcasting = createSelector(
  selectBroadcastState,
  fromBroadcast.getBroadcasting
);

export const selectBroadcasted = createSelector(
  selectBroadcastState,
  fromBroadcast.getBroadcasted
);

export const selectBroadcastError = createSelector(
  selectBroadcastState,
  fromBroadcast.getError
);

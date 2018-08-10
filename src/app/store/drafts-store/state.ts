import { Draft } from './models';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export interface DraftsState extends EntityState<Draft> {
  loading: boolean;
  loaded: boolean;
  broadcasting: boolean;
}

export const draftsAdapter: EntityAdapter<Draft> = createEntityAdapter<Draft>();

export const initialState: DraftsState = draftsAdapter.getInitialState({
  loading: false,
  loaded: false,
  broadcasting: false
});

import { Template } from './models';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export interface TemplatesState extends EntityState<Template> {
  loading: boolean;
  loaded: boolean;
}

export const templatesAdapter: EntityAdapter<Template> = createEntityAdapter<
  Template
>();

export const initialState: TemplatesState = templatesAdapter.getInitialState({
  loading: false,
  loaded: false
});

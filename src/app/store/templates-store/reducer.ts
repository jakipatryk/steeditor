import { merge } from 'ramda';
import { TemplatesActionsTypes, TemplatesActionsUnion } from './actions';
import { initialState, templatesAdapter, TemplatesState } from './state';

export function templatesReducer(
  state: TemplatesState = initialState,
  action: TemplatesActionsUnion
): TemplatesState {
  switch (action.type) {
    case TemplatesActionsTypes.LoadTemplates: {
      return merge(state, { loading: true, loaded: false });
    }
    case TemplatesActionsTypes.LoadTemplatesSuccess: {
      return merge(templatesAdapter.addAll(action.payload.templates, state), {
        loading: false,
        loaded: true
      });
    }
    case TemplatesActionsTypes.LoadTemplatesFail: {
      return merge(state, { loading: false, loaded: false });
    }
    case TemplatesActionsTypes.CreateTemplateSuccess: {
      return templatesAdapter.addOne(action.payload.template, state);
    }
    case TemplatesActionsTypes.RemoveTemplateSuccess: {
      return templatesAdapter.removeOne(action.payload.id, state);
    }
    case TemplatesActionsTypes.UpdateTemplateSuccess: {
      return templatesAdapter.upsertOne(action.payload.template, state);
    }
    default: {
      return state;
    }
  }
}

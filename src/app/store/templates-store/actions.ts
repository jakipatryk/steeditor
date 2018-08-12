import { Action } from '@ngrx/store';
import { Template } from './models';

export enum TemplatesActionsTypes {
  LoadTemplates = '[Templates] Load Templates',
  LoadTemplatesSuccess = '[Templates] Load Templates Success',
  LoadTemplatesFail = '[Templates] Load Templates Fail',
  CreateTemplate = '[Templates] Create Template',
  CreateTemplateSuccess = '[Templates] Create Template Success',
  CreateTemplateFail = '[Templates] Create Template Fail',
  UpdateTemplate = '[Templates] Update Template',
  UpdateTemplateSuccess = '[Templates] Update Template Success',
  UpdateTemplateFail = '[Templates] Update Template Fail',
  RemoveTemplate = '[Templates] Remove Template',
  RemoveTemplateSuccess = '[Templates] Remove Template Success',
  RemoveTemplateFail = '[Templates] Remove Template Fail'
}

export class LoadTemplates implements Action {
  public readonly type = TemplatesActionsTypes.LoadTemplates;
}

export class LoadTemplatesSuccess implements Action {
  public readonly type = TemplatesActionsTypes.LoadTemplatesSuccess;

  constructor(public payload: { templates: Array<Template> }) {}
}

export class LoadTemplatesFail implements Action {
  public readonly type = TemplatesActionsTypes.LoadTemplatesFail;
}

export class CreateTemplate implements Action {
  public readonly type = TemplatesActionsTypes.CreateTemplate;
}

export class CreateTemplateSuccess implements Action {
  public readonly type = TemplatesActionsTypes.CreateTemplateSuccess;

  constructor(public payload: { template: Template }) {}
}

export class CreateTemplateFail implements Action {
  public readonly type = TemplatesActionsTypes.CreateTemplateFail;
}

export class UpdateTemplate implements Action {
  public readonly type = TemplatesActionsTypes.UpdateTemplate;

  constructor(public payload: { template: Template }) {}
}

export class UpdateTemplateSuccess implements Action {
  public readonly type = TemplatesActionsTypes.UpdateTemplateSuccess;

  constructor(public payload: { template: Template }) {}
}

export class UpdateTemplateFail implements Action {
  public readonly type = TemplatesActionsTypes.UpdateTemplateFail;
}

export class RemoveTemplate implements Action {
  public readonly type = TemplatesActionsTypes.RemoveTemplate;

  constructor(public payload: { id: number }) {}
}

export class RemoveTemplateSuccess implements Action {
  public readonly type = TemplatesActionsTypes.RemoveTemplateSuccess;

  constructor(public payload: { id: number }) {}
}

export class RemoveTemplateFail implements Action {
  public readonly type = TemplatesActionsTypes.RemoveTemplateFail;
}

export type TemplatesActionsUnion =
  | LoadTemplates
  | LoadTemplatesSuccess
  | LoadTemplatesFail
  | CreateTemplate
  | CreateTemplateSuccess
  | CreateTemplateFail
  | UpdateTemplate
  | UpdateTemplateSuccess
  | UpdateTemplateFail
  | RemoveTemplate
  | RemoveTemplateSuccess
  | RemoveTemplateFail;

export const loadTemplates = (): LoadTemplates => new LoadTemplates();

export const loadTemplatesSuccess = (
  templates: Array<Template>
): LoadTemplatesSuccess => new LoadTemplatesSuccess({ templates });

export const loadTemplatesFail = (): LoadTemplatesFail =>
  new LoadTemplatesFail();

export const createTemplate = (): CreateTemplate => new CreateTemplate();

export const createTemplateSuccess = (
  template: Template
): CreateTemplateSuccess => new CreateTemplateSuccess({ template });

export const createTemplateFail = (): CreateTemplateFail =>
  new CreateTemplateFail();

export const updateTemplate = (template: Template): UpdateTemplate =>
  new UpdateTemplate({ template });

export const updateTemplateSuccess = (
  template: Template
): UpdateTemplateSuccess => new UpdateTemplateSuccess({ template });

export const updateTemplateFail = (): UpdateTemplateFail =>
  new UpdateTemplateFail();

export const removeTemplate = (id: number): RemoveTemplate =>
  new RemoveTemplate({ id });

export const removeTemplateSuccess = (id: number): RemoveTemplateSuccess =>
  new RemoveTemplateSuccess({ id });

export const removeTemplateFail = (): RemoveTemplateFail =>
  new RemoveTemplateFail();

export const templatesActionCreators = {
  loadTemplates,
  loadTemplatesSuccess,
  loadTemplatesFail,
  createTemplate,
  createTemplateSuccess,
  createTemplateFail,
  updateTemplate,
  updateTemplateSuccess,
  updateTemplateFail,
  removeTemplate,
  removeTemplateSuccess,
  removeTemplateFail
};

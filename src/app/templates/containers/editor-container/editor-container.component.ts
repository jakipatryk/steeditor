import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { mapObjIndexed } from 'ramda';
import { merge, Observable } from 'rxjs';
import { first, map, takeWhile, withLatestFrom } from 'rxjs/operators';
import { SteeditorPost } from '../../../../core';
import { createEditorConfig, EditorConfig } from '../../../editor';
import { State } from '../../../store/root-state';
import {
  selectCurrentTemplate,
  Template,
  templatesActionCreators
} from '../../../store/templates-store';

@Component({
  selector: 'app-editor-container',
  templateUrl: './editor-container.component.html',
  styleUrls: ['./editor-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditorContainerComponent implements OnInit {
  template$: Observable<Template>;
  editorConfig$: Observable<EditorConfig>;
  templateNameAndDescriptionForm: FormGroup;

  constructor(private store: Store<State>, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.template$ = this.store.select(selectCurrentTemplate);
    this.buildForm();
    this.editorConfig$ = merge(
      this.template$,
      this.templateNameAndDescriptionForm.statusChanges
    ).pipe(
      withLatestFrom(this.template$),
      map(([x, template]) => template),
      takeWhile(template => !!template),
      map(template => template.initWith),
      map(mapObjIndexed(value => ({ value }))),
      map(fields =>
        createEditorConfig({
          fields,
          summaryStepValidText: 'Template is valid, save it and use later!',
          summaryStepInvalidText: this.templateNameAndDescriptionForm.valid
            ? 'Template is valid, save it and use later!'
            : 'Template is invalid. Make sure you entered a name!',
          submitButtonText: 'Save',
          submitButtonDisabled: this.templateNameAndDescriptionForm.invalid,
          acceptInvalid: this.templateNameAndDescriptionForm.valid
        })
      )
    );
  }

  saveTemplate(initWith: SteeditorPost): void {
    this.store.dispatch(
      templatesActionCreators.updateTemplate({
        ...this.templateNameAndDescriptionForm.value,
        initWith,
        id: this.currentTemplate.id
      })
    );
  }

  private get currentTemplate(): Template {
    let currentTemplate;
    this.template$
      .pipe(first())
      .subscribe(template => (currentTemplate = template));
    return currentTemplate;
  }

  private buildForm(): void {
    this.templateNameAndDescriptionForm = this.formBuilder.group({
      name: [this.currentTemplate.name, Validators.required],
      description: this.currentTemplate.description
    });
  }
}

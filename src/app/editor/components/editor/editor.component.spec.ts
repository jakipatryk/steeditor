import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectionStrategy, DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MarkdownModule } from 'ngx-markdown';
import { forEachObjIndexed } from 'ramda';
import { first } from 'rxjs/operators';
import { SteeditorPost } from '../../../../core';
import { EditorModule } from '../../editor.module';
import { createEditorConfig } from './config';
import { EditorComponent } from './editor.component';

fdescribe('#EditorModule EditorComponent', () => {
  let component: EditorComponent;
  let fixture: ComponentFixture<EditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        EditorModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MarkdownModule.forRoot()
      ]
    })
      // `OnPush` change detection lets run change detection manually only once,
      // that's why for tests `Default` change detection has to be set
      .overrideComponent(EditorComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should raise the `whenChanges` event when a control in either `contentForm` or `advancedOptionsForm` is changed', done => {
    // `whenChangedDebounceTime` is changed to let tests pass faster
    component.config = createEditorConfig({ whenChangesDebounceTime: 1 });

    component.whenChanges.pipe(first()).subscribe(value => {
      expect(value).toBeDefined();
      expect(value.body).toEqual('123');
      expect(value.allowCurationRewards).toBeDefined();
      done();
    });
    component.contentForm.controls.body.setValue('123');
  });

  it('#onSubmit() should raise the `whenSubmit` event with the forms value merged into one object', () => {
    const formsValue: SteeditorPost = {
      ...component.contentForm.getRawValue(),
      ...component.advancedOptionsForm.getRawValue()
    };
    let emittedValue;
    component.whenSubmit.subscribe(
      steeditorPost => (emittedValue = steeditorPost)
    );

    component.onSubmit();

    expect(emittedValue).toEqual(formsValue);
  });

  it('#contentForm should be invalid when default values are set (at start)', () => {
    const contentFormValidity: boolean = component.contentForm.valid;

    expect(contentFormValidity).toBeFalsy();
  });

  it('#advancedOptionsForm should be valid when default values are set (at start)', () => {
    const advancedOptionsFormValidity: boolean =
      component.advancedOptionsForm.valid;

    expect(advancedOptionsFormValidity).toBeTruthy();
  });

  it('#currentSteeditorPost should be equal to a current merged value of both forms', () => {
    const expectedValue = {
      ...component.contentForm.getRawValue(),
      ...component.advancedOptionsForm.getRawValue()
    };
    const actualValue = component.currentSteeditorPost;

    expect(actualValue).toEqual(expectedValue);
  });

  it('(.editor__submit-button) should be disabled when forms default values are set (at start)', () => {
    const submitButton = fixture.debugElement.query(
      By.css('.editor__submit-button')
    );
    const submitButtonDisabled = submitButton.nativeElement.disabled;

    expect(submitButtonDisabled).toBeTruthy();
  });

  it('(.editor__submit-button) should be disabled when config prop `submitButtonDisabled` is truthy', () => {
    let submitButton: HTMLButtonElement;

    component.config = createEditorConfig({ submitButtonDisabled: true });
    fixture.detectChanges();
    submitButton = fixture.debugElement.query(By.css('.editor__submit-button'))
      .nativeElement;

    expect(submitButton.disabled).toBeTruthy();
  });

  it('(.editor__submit-button) should NOT be disabled when forms are valid and config prop `submitButtonDisabled` is falsy', () => {
    let submitButton: HTMLButtonElement;

    forEachObjIndexed(
      control => control.setErrors(null),
      component.contentForm.controls
    );
    component.config = createEditorConfig({ submitButtonDisabled: false });
    fixture.detectChanges();
    submitButton = fixture.debugElement.query(By.css('.editor__submit-button'))
      .nativeElement;

    expect(submitButton.disabled).toBeFalsy();
  });

  it('(.editor__submit-button) should be NOT disabled when config prop `acceptInvalid` is truthy', () => {
    let submitButton: HTMLButtonElement;

    component.config = createEditorConfig({ acceptInvalid: true });
    fixture.detectChanges();
    submitButton = fixture.debugElement.query(By.css('.editor__submit-button'))
      .nativeElement;

    expect(submitButton.disabled).toBeFalsy();
  });

  it('(.editor__summary-text--valid) should be rendered and display correct message if forms are valid', () => {
    let summaryTextElement: DebugElement;

    forEachObjIndexed(
      control => control.setErrors(null),
      component.contentForm.controls
    );
    fixture.detectChanges();
    summaryTextElement = fixture.debugElement.query(
      By.css('.editor__summary-text--valid')
    );

    expect(summaryTextElement.nativeElement).toBeDefined();
    expect(summaryTextElement.nativeElement.innerHTML).toContain(
      component.config.summaryStepValidText
    );
  });

  it('(.editor__summary-text--valid) should NOT be rendered if forms are invalid', () => {
    let summaryTextElement: DebugElement;

    forEachObjIndexed(
      control => control.setErrors({ testError: true }),
      component.contentForm.controls
    );
    fixture.detectChanges();
    summaryTextElement = fixture.debugElement.query(
      By.css('.editor__summary-text--valid')
    );

    expect(summaryTextElement).toEqual(null);
  });

  it('(.editor__summary-text--invalid) should be rendered and display correct message if forms are invalid', () => {
    let summaryTextElement: DebugElement;

    forEachObjIndexed(
      control => control.setErrors({ testError: true }),
      component.contentForm.controls
    );
    fixture.detectChanges();
    summaryTextElement = fixture.debugElement.query(
      By.css('.editor__summary-text--invalid')
    );

    expect(summaryTextElement.nativeElement).toBeDefined();
    expect(summaryTextElement.nativeElement.innerHTML).toContain(
      component.config.summaryStepInvalidText
    );
  });

  it('(.editor__summary-text--invalid) should NOT be rendered if forms are valid', () => {
    let summaryTextElement: DebugElement;

    forEachObjIndexed(
      control => control.setErrors(null),
      component.contentForm.controls
    );
    fixture.detectChanges();
    summaryTextElement = fixture.debugElement.query(
      By.css('.editor__summary-text--invalid')
    );

    expect(summaryTextElement).toEqual(null);
  });
});

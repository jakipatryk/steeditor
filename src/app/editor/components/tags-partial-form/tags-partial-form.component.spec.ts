import {
  ChangeDetectionStrategy,
  Component,
  DebugElement,
  ViewChild
} from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditorMaterialModule } from '../../editor-material/editor-material.module';
import { tagsCustomValidators } from '../../validators/tags.validators';
import { TagsPartialFormComponent } from './tags-partial-form.component';

@Component({
  selector: `app-host-component`,
  template: `<app-tags-partial-form [parentForm]="parentForm"></app-tags-partial-form>`
})
class TestHostComponent {
  @ViewChild(TagsPartialFormComponent)
  tagsPartialFormComponent: TagsPartialFormComponent;

  parentForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.parentForm = this.formBuilder.group({
      tags: [[], [Validators.required, ...tagsCustomValidators]]
    });
  }
}

fdescribe('#EditorModule TagsPartialFormComponent', () => {
  let hostFixture: ComponentFixture<TestHostComponent>;
  let hostComponent: TestHostComponent;
  let component: TagsPartialFormComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        EditorMaterialModule
      ],
      declarations: [TestHostComponent, TagsPartialFormComponent]
    })
      // `OnPush` change detection lets run change detection manually only once,
      // that's why for tests `Default` change detection has to be set
      .overrideComponent(TagsPartialFormComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    hostFixture = TestBed.createComponent(TestHostComponent);
    hostComponent = hostFixture.componentInstance;
    component = hostComponent.tagsPartialFormComponent;

    hostFixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#tagsControl should be pointing on `parentForm.controls.tags`', () => {
    expect(component.tagsControl).toBe(component.parentForm.controls.tags);
  });

  it('#removeTag should remove given tag and mark the `tagsControl` as dirty', () => {
    component.tagsControl.setValue(['tag1', 'tag2', 'tag3']);
    component.removeTag('tag2');

    expect(component.tagsControl.value).toEqual(['tag1', 'tag3']);
    expect(component.tagsControl.dirty).toBeTruthy();
  });

  it('#isTagRemovable should return true if tag is not first', () => {
    expect(component.isTagRemovable(1)).toBeTruthy();
    expect(component.isTagRemovable(2)).toBeTruthy();
    expect(component.isTagRemovable(54)).toBeTruthy();

    component.disableRemovingFirstTag = true;

    expect(component.isTagRemovable(1)).toBeTruthy();
    expect(component.isTagRemovable(2)).toBeTruthy();
    expect(component.isTagRemovable(54)).toBeTruthy();
  });

  it('#isTagRemovable should return true if tag is first but `disableRemovingFirstTag` is falsy', () => {
    component.disableRemovingFirstTag = false;

    expect(component.isTagRemovable(0)).toBeTruthy();
  });

  it('#isTagRemovable should return false if tag is first and `disableRemovingFirstTag` is truthy', () => {
    component.disableRemovingFirstTag = true;

    expect(component.isTagRemovable(0)).toBeFalsy();
  });

  it('#isValidTag should return true if this tag has only valid chars and it is only once in `tagsControl.value``', () => {
    component.tagsControl.setValue(['tag1', 'tag2', 'tag3']);

    expect(component.isValidTag('tag3')).toBeTruthy();
  });

  it('#isValidTag should return false if this tag is at least twice in `tagsControl.value`', () => {
    component.tagsControl.setValue(['tag1', 'tag2', 'tag3', 'tag2']);

    expect(component.isValidTag('tag2')).toBeFalsy();

    component.tagsControl.setValue(['tag1', 'tag2', 'tag3', 'tag2', 'tag2']);

    expect(component.isValidTag('tag2')).toBeFalsy();
  });

  it('#isValidTag should return false if this tag has invalid chars`', () => {
    component.tagsControl.setValue(['#tag1', 'tag2', 'tag3']);

    expect(component.isValidTag('#tag1')).toBeFalsy();
  });

  it('(.tag) should be rendered as many times as there are items in `tagsControl.value` and the values should be correct', () => {
    let tagElements: DebugElement[];

    component.tagsControl.setValue(['tag1', 'tag2', 'tag3']);
    hostFixture.detectChanges();
    tagElements = hostFixture.debugElement.queryAll(By.css('.tag'));

    expect(tagElements.length).toEqual(3);
    expect(tagElements[0].nativeElement.innerText).toContain('tag1');
    expect(tagElements[1].nativeElement.innerText).toContain('tag2');
    expect(tagElements[2].nativeElement.innerText).toContain('tag3');
  });

  it('(.tag) should have primary color if is valid', () => {
    let tagElements: DebugElement[];

    component.tagsControl.setValue(['tag1', 'tag2']);
    hostFixture.detectChanges();
    tagElements = hostFixture.debugElement.queryAll(By.css('.tag'));

    expect(tagElements[0].nativeElement.outerHTML).toContain(
      'ng-reflect-color="primary"'
    );
    expect(tagElements[1].nativeElement.outerHTML).toContain(
      'ng-reflect-color="primary"'
    );
  });

  it('(.tag) should have warn color if is invalid', () => {
    let tagElements: DebugElement[];

    component.tagsControl.setValue(['#tag1', 'tAg2', 'tag3']);
    hostFixture.detectChanges();
    tagElements = hostFixture.debugElement.queryAll(By.css('.tag'));

    expect(tagElements[0].nativeElement.outerHTML).toContain(
      'ng-reflect-color="warn"'
    );

    component.tagsControl.setValue(['tag1', 'tag2', 'tag3', 'tag2']);
    hostFixture.detectChanges();
    tagElements = hostFixture.debugElement.queryAll(By.css('.tag'));

    expect(tagElements[1].nativeElement.outerHTML).toContain(
      'ng-reflect-color="warn"'
    );
    expect(tagElements[3].nativeElement.outerHTML).toContain(
      'ng-reflect-color="warn"'
    );
  });

  it('(.tag) should be removable if is not first', () => {
    let tagElements: DebugElement[];

    component.tagsControl.setValue(['tag1', 'tag2', 'tag3']);
    hostFixture.detectChanges();
    tagElements = hostFixture.debugElement.queryAll(By.css('.tag'));

    expect(tagElements[1].nativeElement.outerHTML).toContain(
      'ng-reflect-removable="true"'
    );
    expect(tagElements[2].nativeElement.outerHTML).toContain(
      'ng-reflect-removable="true"'
    );
  });

  it('(.tag) should be removable if is first but `disableRemovingFirstTag` is falsy', () => {
    let tagElements: DebugElement[];

    component.tagsControl.setValue(['tag1', 'tag2', 'tag3']);
    component.disableRemovingFirstTag = false;
    hostFixture.detectChanges();
    tagElements = hostFixture.debugElement.queryAll(By.css('.tag'));

    expect(tagElements[0].nativeElement.outerHTML).toContain(
      'ng-reflect-removable="true"'
    );
  });

  it('(.tag) should NOT be removable if is first and `disableRemovingFirstTag` is truthy', () => {
    let tagElements: DebugElement[];

    component.tagsControl.setValue(['tag1', 'tag2', 'tag3']);
    component.disableRemovingFirstTag = true;
    hostFixture.detectChanges();
    tagElements = hostFixture.debugElement.queryAll(By.css('.tag'));

    expect(tagElements[0].nativeElement.outerHTML).toContain(
      'ng-reflect-removable="false"'
    );
  });
});

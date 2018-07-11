import {
  ChangeDetectionStrategy,
  Component,
  DebugElement,
  ViewChild
} from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditorMaterialModule } from '../../editor-material/editor-material.module';
import { jsonMetadataCustomValidators } from '../../validators/json-metadata.validators';
import { SteeditorPost } from './../../../../core/SteeditorPost';
import { JsonMetadataPartialFormComponent } from './json-metadata-partial-form.component';

@Component({
  selector: `app-host-component`,
  template: `
  <app-json-metadata-partial-form [parentForm]="parentForm" [currentSteeditorPost]="currentSteeditorPost">
  </app-json-metadata-partial-form>
  `
})
class TestHostComponent {
  @ViewChild(JsonMetadataPartialFormComponent)
  jsonMetadataPartialFormComponent: JsonMetadataPartialFormComponent;

  parentForm: FormGroup;
  currentSteeditorPost: SteeditorPost;

  constructor(private formBuilder: FormBuilder) {
    this.parentForm = this.formBuilder.group({
      jsonMetadata: ['', jsonMetadataCustomValidators]
    });

    this.currentSteeditorPost = {
      title: '',
      body: '',
      tags: [],
      community: '',
      thumbnailUrl: '',
      beneficiaries: [],
      allowVotes: true,
      allowCurationRewards: true,
      percentSteemDollars: 50,
      maxAcceptedPayout: 0,
      jsonMetadata: ''
    };
  }
}

fdescribe('#EditorModule JsonMetadataPartialFormComponent', () => {
  let hostFixture: ComponentFixture<TestHostComponent>;
  let hostComponent: TestHostComponent;
  let component: JsonMetadataPartialFormComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        EditorMaterialModule
      ],
      declarations: [TestHostComponent, JsonMetadataPartialFormComponent]
    })
      // `OnPush` change detection lets run change detection manually only once,
      // that's why for tests `Default` change detection has to be set
      .overrideComponent(JsonMetadataPartialFormComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    hostFixture = TestBed.createComponent(TestHostComponent);
    hostComponent = hostFixture.componentInstance;
    component = hostComponent.jsonMetadataPartialFormComponent;

    hostFixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#jsonMetadataControl should be pointing on `parentForm.controls.jsonMetadata`', () => {
    expect(component.jsonMetadataControl).toBe(
      component.parentForm.controls.jsonMetadata
    );
  });

  // tslint:disable-next-line:max-line-length
  it('#currentMetadata should be an object created based on `(core)createJsonMetadata` + all props of `currentSteeditorPost` if `jsonMetadataControl` is valid', () => {
    component.jsonMetadataControl.setErrors(null);
    component.currentSteeditorPost = {
      ...component.currentSteeditorPost,
      jsonMetadata: '{"testProp":"test"}'
    };

    expect(component.currentMetadata.testProp).toEqual('test');
    expect(component.currentMetadata.app).toBeDefined();
  });

  // tslint:disable-next-line:max-line-length
  it('#currentMetadata should be an object created based on `(core)createJsonMetadata` + all props of `currentSteeditorPost` except `jsonMetadata`, if `jsonMetadataControl` is invalid', () => {
    component.jsonMetadataControl.setErrors({ testError: true });
    component.currentSteeditorPost = {
      ...component.currentSteeditorPost,
      jsonMetadata: '{"testProp":"test"}'
    };

    expect(component.currentMetadata.testProp).toBeUndefined();
    expect(component.currentMetadata.app).toBeDefined();
  });

  // tslint:disable-next-line:max-line-length
  it('(.custom-metadata__error--invalid-json) should be rendered if `jsonMetadataControl` has `invalidJson` error and is dirty + should contain correct message', () => {
    let errorElement: DebugElement;

    component.jsonMetadataControl.setErrors({ invalidJson: true });
    component.jsonMetadataControl.markAsDirty();
    hostFixture.detectChanges();
    errorElement = hostFixture.debugElement.query(
      By.css('.custom-metadata__error--invalid-json')
    );

    expect(errorElement.nativeElement).toBeDefined();
    expect(errorElement.nativeElement.innerText).toContain(
      component.errorMessages.invalidJson
    );
  });

  it('(.custom-metadata__error--invalid-json) should NOT be rendered if `jsonMetadataControl` does NOT have `invalidJson` error', () => {
    let errorElement: DebugElement;

    component.jsonMetadataControl.setErrors(null);
    hostFixture.detectChanges();
    errorElement = hostFixture.debugElement.query(
      By.css('.custom-metadata__error--invalid-json')
    );

    expect(errorElement).toEqual(null);
  });
});

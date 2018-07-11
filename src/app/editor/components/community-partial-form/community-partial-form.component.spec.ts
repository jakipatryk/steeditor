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
import { CommunityPartialFormComponent } from './community-partial-form.component';

@Component({
  selector: `app-host-component`,
  template: `<app-community-partial-form [parentForm]="parentForm"></app-community-partial-form>`
})
class TestHostComponent {
  @ViewChild(CommunityPartialFormComponent)
  communityPartialFormComponent: CommunityPartialFormComponent;

  parentForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.parentForm = this.formBuilder.group({
      community: ['', Validators.required, Validators.pattern(/^[a-z]+$/)]
    });
  }
}

fdescribe('#EditorModule CommunityPartialFormComponent', () => {
  let hostFixture: ComponentFixture<TestHostComponent>;
  let hostComponent: TestHostComponent;
  let component: CommunityPartialFormComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        EditorMaterialModule
      ],
      declarations: [TestHostComponent, CommunityPartialFormComponent]
    })
      // `OnPush` change detection lets run change detection manually only once,
      // that's why for tests `Default` change detection has to be set
      .overrideComponent(CommunityPartialFormComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    hostFixture = TestBed.createComponent(TestHostComponent);
    hostComponent = hostFixture.componentInstance;
    component = hostComponent.communityPartialFormComponent;

    hostFixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#communityControl should be pointing on `parentForm.controls.community`', () => {
    expect(component.communityControl).toBe(
      component.parentForm.controls.community
    );
  });

  // tslint:disable-next-line:max-line-length
  it('(.community__error--required) should be rendered if `communityControl` has `required` error and is dirty + should contain correct message', () => {
    let communityErrorRequiredElement: DebugElement;

    component.communityControl.setErrors({ required: true });
    component.communityControl.markAsDirty();
    hostFixture.detectChanges();
    communityErrorRequiredElement = hostFixture.debugElement.query(
      By.css('.community__error--required')
    );

    expect(communityErrorRequiredElement.nativeElement).toBeDefined();
    expect(communityErrorRequiredElement.nativeElement.innerText).toContain(
      component.errorMessages.required
    );
  });

  it('(.community__error--required) should NOT be rendered if `communityControl` does NOT have `required` error', () => {
    let communityErrorRequiredElement: DebugElement;

    component.communityControl.setErrors(null);
    hostFixture.detectChanges();
    communityErrorRequiredElement = hostFixture.debugElement.query(
      By.css('.community__error--required')
    );

    expect(communityErrorRequiredElement).toEqual(null);
  });

  // tslint:disable-next-line:max-line-length
  it('(.community__error--pattern) should be rendered if `communityControl` has `pattern` error and is dirty + should contain correct message', () => {
    let communityErrorPatternElement: DebugElement;

    component.communityControl.setErrors({ pattern: true });
    component.communityControl.markAsDirty();
    hostFixture.detectChanges();
    communityErrorPatternElement = hostFixture.debugElement.query(
      By.css('.community__error--pattern')
    );

    expect(communityErrorPatternElement.nativeElement).toBeDefined();
    expect(communityErrorPatternElement.nativeElement.innerText).toContain(
      component.errorMessages.pattern
    );
  });

  it('(.community__error--pattern) should NOT be rendered if `communityControl` does NOT have `pattern` error', () => {
    let communityErrorPatternElement: DebugElement;

    component.communityControl.setErrors(null);
    hostFixture.detectChanges();
    communityErrorPatternElement = hostFixture.debugElement.query(
      By.css('.community__error--pattern')
    );

    expect(communityErrorPatternElement).toEqual(null);
  });
});

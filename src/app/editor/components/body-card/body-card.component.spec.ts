import { first } from 'rxjs/operators';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewChild
} from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutModule } from '@angular/flex-layout';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditorMaterialModule } from '../../editor-material/editor-material.module';
import { BodyCardComponent } from './body-card.component';

@Component({
  selector: `app-host-component`,
  template: `<app-body-card [parentForm]="parentForm"></app-body-card>`
})
class TestHostComponent {
  @ViewChild(BodyCardComponent) bodyCardComponent: BodyCardComponent;

  parentForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.parentForm = this.formBuilder.group({
      body: ['', Validators.required]
    });
  }
}

@Component({
  selector: `app-body-partial-form`,
  template: ``
})
class BodyPartialFormMockComponent {
  @Input() parentForm: FormGroup;
  @Input() fullscreenState: { isFullscreen: boolean };
}

@Component({
  selector: `app-post-preview`,
  template: ``
})
class PostPreviewMockComponent {
  @Input() postBody: string;
}

fdescribe('#EditorModule BodyCardComponent', () => {
  let hostFixture: ComponentFixture<TestHostComponent>;
  let hostComponent: TestHostComponent;
  let component: BodyCardComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        ReactiveFormsModule,
        EditorMaterialModule,
        FlexLayoutModule
      ],
      declarations: [
        TestHostComponent,
        BodyCardComponent,
        BodyPartialFormMockComponent,
        PostPreviewMockComponent
      ]
    })
      .overrideModule(BrowserDynamicTestingModule, {
        set: {
          entryComponents: [BodyCardComponent]
        }
      })
      // `OnPush` change detection lets run change detection manually only once,
      // that's why for tests `Default` change detection has to be set
      .overrideComponent(BodyCardComponent, {
        set: { changeDetection: ChangeDetectionStrategy.Default }
      })
      .compileComponents();
  }));

  beforeEach(() => {
    hostFixture = TestBed.createComponent(TestHostComponent);
    hostComponent = hostFixture.componentInstance;
    component = hostComponent.bodyCardComponent;

    hostFixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#isFullscreen should be falsy at start if component was NOT dynamically created via MatDialog', () => {
    expect(component.isFullscreen).toBeFalsy();
  });

  it('#isFullscreen should be truthy at start if component was dynamically created via MatDialog', () => {
    let dynamicallyCreatedComponent: BodyCardComponent;

    component.goFullscreen();
    dynamicallyCreatedComponent = component.openedDialogRef.componentInstance;

    expect(dynamicallyCreatedComponent.isFullscreen).toBeTruthy();
  });

  it('#goFullscreen should open a dialog with dynamically created `BodyCardComponent`', () => {
    component.goFullscreen();

    expect(component.openedDialogRef.componentInstance).toBeTruthy();
  });

  it('#exitFullscreen should destroy self component', done => {
    let dynamicallyCreatedComponent: BodyCardComponent;

    component.goFullscreen();
    dynamicallyCreatedComponent = component.openedDialogRef.componentInstance;
    dynamicallyCreatedComponent.exitFullscreen();

    component.openedDialogRef
      .afterClosed()
      .pipe(first())
      .subscribe(() =>
        setTimeout(() => {
          expect(component.openedDialogRef.componentInstance).toEqual(null);
          done();
        }, 0)
      );
  });
});

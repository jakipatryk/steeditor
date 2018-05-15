import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDraftDialogComponent } from './new-draft-dialog.component';

describe('NewDraftDialogComponent', () => {
  let component: NewDraftDialogComponent;
  let fixture: ComponentFixture<NewDraftDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewDraftDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewDraftDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

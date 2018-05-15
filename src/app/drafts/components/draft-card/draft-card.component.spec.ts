import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DraftCardComponent } from './draft-card.component';

describe('DraftCardComponent', () => {
  let component: DraftCardComponent;
  let fixture: ComponentFixture<DraftCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DraftCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DraftCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

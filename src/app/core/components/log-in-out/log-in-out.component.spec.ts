import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogInOutComponent } from './log-in-out.component';

describe('LogInOutComponent', () => {
  let component: LogInOutComponent;
  let fixture: ComponentFixture<LogInOutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogInOutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogInOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

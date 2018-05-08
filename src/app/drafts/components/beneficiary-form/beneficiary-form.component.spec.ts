import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficiaryFormComponent } from './beneficiary-form.component';

describe('BeneficiaryFormComponent', () => {
  let component: BeneficiaryFormComponent;
  let fixture: ComponentFixture<BeneficiaryFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeneficiaryFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeneficiaryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

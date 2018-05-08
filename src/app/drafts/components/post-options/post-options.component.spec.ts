import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostOptionsComponent } from './post-options.component';

describe('PostOptionsComponent', () => {
  let component: PostOptionsComponent;
  let fixture: ComponentFixture<PostOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PostOptionsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

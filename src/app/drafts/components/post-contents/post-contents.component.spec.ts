import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostContentsComponent } from './post-contents.component';

describe('PostContentsComponent', () => {
  let component: PostContentsComponent;
  let fixture: ComponentFixture<PostContentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PostContentsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostContentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

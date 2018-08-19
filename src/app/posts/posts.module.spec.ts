import { PostsModule } from './posts.module';

fdescribe('PostsModule', () => {
  let postsModule: PostsModule;

  beforeEach(() => {
    postsModule = new PostsModule();
  });

  it('should create an instance', () => {
    expect(postsModule).toBeTruthy();
  });
});

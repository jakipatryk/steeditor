import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostEditorComponent } from './containers/post-editor/post-editor.component';
import { PostsComponent } from './containers/posts/posts.component';
import { PostLoadedGuard } from './guards/post-loaded.guard';

const postsRoutes: Routes = [
  {
    path: '',
    component: PostsComponent
  },
  {
    path: ':postId',
    component: PostEditorComponent,
    canActivate: [PostLoadedGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(postsRoutes)],
  exports: [RouterModule]
})
export class PostsRoutingModule {}

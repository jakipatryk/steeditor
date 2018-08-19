import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { EditorModule } from '../editor';
import { PostCardComponent } from './components/post-card/post-card.component';
import { PostEditorComponent } from './containers/post-editor/post-editor.component';
import { PostsComponent } from './containers/posts/posts.component';
import { PostLoadedGuard } from './guards/post-loaded.guard';
import { PostsMaterialModule } from './posts-material.module';
import { PostsRoutingModule } from './posts-routing.module';

@NgModule({
  imports: [
    CommonModule,
    PostsRoutingModule,
    PostsMaterialModule,
    FlexLayoutModule,
    EditorModule
  ],
  declarations: [PostsComponent, PostCardComponent, PostEditorComponent],
  providers: [PostLoadedGuard]
})
export class PostsModule {}

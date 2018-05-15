import { EditorContainerComponent } from './containers/editor-container/editor-container.component';
import { DraftsComponent } from './containers/drafts/drafts.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const draftsRoutes: Routes = [
  {
    path: '',
    component: DraftsComponent
  },
  {
    path: 'editor',
    component: EditorContainerComponent
  },
  {
    path: ':draftId',
    component: EditorContainerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(draftsRoutes)],
  exports: [RouterModule]
})
export class DraftsRoutingModule {}

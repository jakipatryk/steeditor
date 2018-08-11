import { EditorContainerComponent } from './containers/editor-container/editor-container.component';
import { DraftsComponent } from './containers/drafts/drafts.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import * as fromGuards from './guards';

const draftsRoutes: Routes = [
  {
    path: '',
    component: DraftsComponent
  },
  {
    path: ':draftId',
    component: EditorContainerComponent,
    canActivate: [fromGuards.DraftsLoadedGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(draftsRoutes)],
  exports: [RouterModule]
})
export class DraftsRoutingModule {}

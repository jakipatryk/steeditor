import { DraftComponent } from './containers/draft/draft.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const draftsRoutes: Routes = [
  {
    path: '',
    component: DraftComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(draftsRoutes)],
  exports: [RouterModule]
})
export class DraftsRoutingModule {}

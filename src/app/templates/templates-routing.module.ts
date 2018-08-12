import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditorContainerComponent } from './containers/editor-container/editor-container.component';
import { TemplatesComponent } from './containers/templates/templates.component';
import { TemplatesLoadedGuard } from './guards/templates-loaded.guard';

const templatesRoutes: Routes = [
  {
    path: '',
    component: TemplatesComponent
  },
  {
    path: ':templateId',
    component: EditorContainerComponent,
    canActivate: [TemplatesLoadedGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(templatesRoutes)],
  exports: [RouterModule]
})
export class TemplatesRoutingModule {}

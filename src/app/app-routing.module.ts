import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  {
    path: 'drafts',
    loadChildren: './drafts/drafts.module#DraftsModule'
  },
  {
    path: 'templates',
    loadChildren: './templates/templates.module#TemplatesModule'
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'drafts'
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'drafts'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

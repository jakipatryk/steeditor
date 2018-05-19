import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RedirectComponent } from './core/containers/redirect/redirect.component';

const appRoutes: Routes = [
  {
    path: 'drafts',
    loadChildren: './drafts/drafts.module#DraftsModule'
  },
  {
    path: 'steemconnect/redirect',
    component: RedirectComponent
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

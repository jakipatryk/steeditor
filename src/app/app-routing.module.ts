import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const appRoutes: Routes = [
  {
    path: 'drafts',
    loadChildren: './drafts/drafts.module#DraftsModule'
  },
  {
    path: 'posts',
    loadChildren: './posts/posts.module#PostsModule',
    canLoad: [AuthGuard]
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

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RecentDraftsComponent } from './components/recent-drafts/recent-drafts.component';
import { RecentPostsComponent } from './components/recent-posts/recent-posts.component';
import { RecentTemplatesComponent } from './components/recent-templates/recent-templates.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { UserMetadataComponent } from './components/user-metadata/user-metadata.component';
import { DashboardComponent } from './containers/dashboard/dashboard.component';
import { DashboardMaterialModule } from './dashboard-material.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { UserWalletComponent } from './components/user-wallet/user-wallet.component';
import { UserWitnessesComponent } from './components/user-witnesses/user-witnesses.component';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    DashboardMaterialModule,
    FlexLayoutModule
  ],
  declarations: [
    DashboardComponent,
    UserMetadataComponent,
    UserInfoComponent,
    RecentPostsComponent,
    RecentDraftsComponent,
    RecentTemplatesComponent,
    UserWalletComponent,
    UserWitnessesComponent
  ]
})
export class DashboardModule {}

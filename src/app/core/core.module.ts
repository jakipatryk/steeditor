import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material/material.module';
import { AppRoutingModule } from './../app-routing.module';
import { AppComponent } from './containers/app/app.component';
import { RedirectComponent } from './containers/redirect/redirect.component';
import { LogInOutComponent } from './components/log-in-out/log-in-out.component';

@NgModule({
  imports: [CommonModule, AppRoutingModule, MaterialModule, FlexLayoutModule],
  declarations: [AppComponent, RedirectComponent, LogInOutComponent],
  exports: [AppComponent]
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only'
      );
    }
  }

  static forRoot() {
    return {
      ngModule: CoreModule
    };
  }
}

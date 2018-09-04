import { CommonModule } from '@angular/common';
import {
  ModuleWithProviders,
  NgModule,
  Optional,
  SkipSelf
} from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialModule } from '../material/material.module';
import { AppRoutingModule } from './../app-routing.module';
import { UserStatusComponent } from './components/user-status/user-status.component';
import { AppComponent } from './containers/app/app.component';
import { REMARKABLE, remarkableFactory } from './remarkable';

@NgModule({
  imports: [CommonModule, AppRoutingModule, MaterialModule, FlexLayoutModule],
  declarations: [AppComponent, UserStatusComponent],
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

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [{ provide: REMARKABLE, useFactory: remarkableFactory }]
    };
  }
}

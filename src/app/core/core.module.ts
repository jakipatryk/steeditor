import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { MaterialModule } from '../material/material.module';
import { AppComponent } from './containers/app/app.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [CommonModule, MaterialModule, FlexLayoutModule],
  declarations: [AppComponent],
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

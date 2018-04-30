import { CommonModule } from '@angular/common';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { AppComponent } from './containers/app/app.component';

@NgModule({
  imports: [CommonModule],
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
      ngModule: CoreModule,
      providers: []
    };
  }
}

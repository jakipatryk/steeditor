import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material';

/**
 * Import and export here each Angular Material module that is going to be used in the app.
 */
@NgModule({
  imports: [MatButtonModule],
  exports: [MatButtonModule]
})
export class MaterialModule {}

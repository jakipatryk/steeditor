import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';

/**
 * Import and export here each Angular Material module that is going to be used in the app.
 */
@NgModule({
  imports: [MatButtonModule, MatToolbarModule, MatCardModule],
  exports: [MatButtonModule, MatToolbarModule, MatCardModule]
})
export class MaterialModule {}

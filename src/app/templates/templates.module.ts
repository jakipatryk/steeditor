import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { EditorModule } from '../editor';
import { TemplateCardComponent } from './components/template-card/template-card.component';
import { EditorContainerComponent } from './containers/editor-container/editor-container.component';
import { TemplatesComponent } from './containers/templates/templates.component';
import { TemplatesLoadedGuard } from './guards/templates-loaded.guard';
import { TemplatesMaterialModule } from './templates-material.module';
import { TemplatesRoutingModule } from './templates-routing.module';

@NgModule({
  imports: [
    CommonModule,
    TemplatesRoutingModule,
    FlexLayoutModule,
    TemplatesMaterialModule,
    EditorModule,
    ReactiveFormsModule
  ],
  declarations: [
    TemplatesComponent,
    EditorContainerComponent,
    TemplateCardComponent
  ],
  providers: [TemplatesLoadedGuard]
})
export class TemplatesModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { MarkdownModule } from 'ngx-markdown';
import { BeneficiariesPartialFormComponent } from './components/beneficiaries-partial-form/beneficiaries-partial-form.component';
import { BodyCardComponent } from './components/body-card/body-card.component';
import { BodyPartialFormComponent } from './components/body-partial-form/body-partial-form.component';
import { CommunityPartialFormComponent } from './components/community-partial-form/community-partial-form.component';
import { EditorComponent } from './components/editor/editor.component';
import { JsonMetadataPartialFormComponent } from './components/json-metadata-partial-form/json-metadata-partial-form.component';
import { OptionsPartialFormComponent } from './components/options-partial-form/options-partial-form.component';
import { PostPreviewComponent } from './components/post-preview/post-preview.component';
import { TagsPartialFormComponent } from './components/tags-partial-form/tags-partial-form.component';
import { ThumbnailPartialFormComponent } from './components/thumbnail-partial-form/thumbnail-partial-form.component';
import { TitlePartialFormComponent } from './components/title-partial-form/title-partial-form.component';
import { SyncControlDirective } from './directives/sync-control.directive';
import { EditorMaterialModule } from './editor-material/editor-material.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    EditorMaterialModule,
    FlexLayoutModule,
    MarkdownModule.forChild()
  ],
  declarations: [
    EditorComponent,
    ThumbnailPartialFormComponent,
    TagsPartialFormComponent,
    CommunityPartialFormComponent,
    TitlePartialFormComponent,
    BodyPartialFormComponent,
    PostPreviewComponent,
    OptionsPartialFormComponent,
    JsonMetadataPartialFormComponent,
    BeneficiariesPartialFormComponent,
    BodyCardComponent,
    SyncControlDirective
  ],
  entryComponents: [BodyCardComponent],
  exports: [EditorComponent]
})
export class EditorModule {}

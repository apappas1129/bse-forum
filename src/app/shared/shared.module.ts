import { NgModule } from "@angular/core";
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import { IonicModule } from "@ionic/angular";
import { TranslateModule } from '@ngx-translate/core';

import { EditorModalComponent } from "./editor-modal/editor-modal.component";

@NgModule({
  imports: [CKEditorModule, IonicModule, TranslateModule],
  exports: [CKEditorModule, EditorModalComponent, TranslateModule],
  declarations: [EditorModalComponent],
})
export class SharedModule {}

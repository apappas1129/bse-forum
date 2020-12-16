import { IQuestion } from "./../../models/question.model";
import { Component, OnInit } from "@angular/core";
import { ModalController } from "@ionic/angular";

// import * as ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import * as CustomEditor from "src/assets/ckeditor5-custom-build/0.0.1/build/ckeditor";

import { CKEditorConfig } from "../../models/CKEditorConfig";

@Component({
  selector: "app-editor-modal",
  templateUrl: "editor-modal.component.html",
  styleUrls: ["editor-modal.component.scss"],
})
export class EditorModalComponent implements OnInit {
  public Editor = CustomEditor;

  title: string;
  body: string = "";

  config: CKEditorConfig = {
    placeholder: "Write your long question here.",
    // BUG: Current CKEditor5's generated build does not show the default toolbar as defined in the online builder
    toolbar: [
      "bold",
      "italic",
      "underline",
      "code",
      "|",
      "blockquote",
      "codeblock",
      "bulletedlist",
      "numberedlist",
      "|",
      "link",
      // "image", // BUG: not working
      "|",
    ],
  };

  constructor(public modalController: ModalController) {}

  dismiss(cancel = false) {
    cancel && this.modalController.dismiss();
    const question: IQuestion = {
      title: this.title,
      body: this.body,
    };
    this.modalController.dismiss(question);
  }

  ngOnInit() {}
}

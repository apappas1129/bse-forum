import { AuthenticationService } from "./../providers/auth.service";
import { LanguageService } from "./../providers/language.service";
import { Component, OnInit } from "@angular/core";
import { ActionSheetController } from "@ionic/angular";
import { TranslateService } from "@ngx-translate/core";
import { Router } from "@angular/router";
import { v4 as uuidv4 } from "uuid";
import {
  AngularFireStorage,
  AngularFireUploadTask,
} from "@angular/fire/storage";

import {
  Plugins,
  CameraResultType,
  CameraPhoto,
  CameraSource,
} from "@capacitor/core";
import { finalize } from "rxjs/operators";
const { Camera } = Plugins;

@Component({
  selector: "app-settings",
  templateUrl: "./settings.page.html",
  styleUrls: ["./settings.page.scss"],
})
export class SettingsPage implements OnInit {
  selectedLang = "";

  constructor(
    private actionSheetController: ActionSheetController,
    private languageService: LanguageService,
    private translate: TranslateService,
    private authService: AuthenticationService,
    private router: Router,
    private storage: AngularFireStorage
  ) {
    this.selectedLang = this.languageService.currentLang;
  }

  ngOnInit() {}

  logout() {
    this.authService.logout();
    this.router.navigate(["login"]);
  }

  onSelectLanguage() {
    this.languageService.setLanguage(this.selectedLang);
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: this.translate.instant("CHANGE_PHOTO"),
      mode: "md",
      cssClass: "my-custom-class",
      buttons: [
        {
          text: this.translate.instant("PHOTO_DRAWER.CAMERA"),
          icon: "camera-outline",
          handler: async () => {
            const photo: CameraPhoto = await Camera.getPhoto({
              quality: 90,
              allowEditing: true,
              resultType: CameraResultType.Uri,
              source: CameraSource.Camera,
            });
            const blob = await this.toBlob(photo.webPath);
            const fileName = uuidv4();
            const fileRef = this.storage.ref(
              `forum-mages/${fileName}.${photo.format}`
            );
            const task = fileRef.put(blob);

            // observe percentage changes
            // this.uploadPercent = task.percentageChanges();

            const subz = task
              .snapshotChanges()
              .pipe(
                finalize(() => {
                  subz.unsubscribe();
                  fileRef
                    .getDownloadURL()
                    .toPromise()
                    .then((url) => {
                      this.authService.currentUser.avatar = url;
                    });
                })
              )
              .subscribe();
          },
        },
        {
          text: this.translate.instant("PHOTO_DRAWER.LIBRARY"),
          icon: "images-outline",
          handler: async () => {
            const photo: CameraPhoto = await Camera.getPhoto({
              quality: 90,
              allowEditing: true,
              resultType: CameraResultType.Base64,
              source: CameraSource.Photos,
            });
            //,,,,,
          },
        },
        {
          text: this.translate.instant("CANCEL"),
          icon: "close",
          role: "cancel",
          handler: () => {
            console.info("Actionsheet cancelled.");
          },
        },
      ],
    });
    await actionSheet.present();
  }

  private async toBlob(webPath: string) {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        console.warn("An error occured when attempting to create a Blob.", e);
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", webPath, true);
      xhr.send(null);
    });

    return blob;
    // TODO: Investigate about Blob .close function [TypeError: blob.close is not a function"]
    // https://github.com/w3c/FileAPI/issues/10
    // blob.close && blob.close()
  }
}

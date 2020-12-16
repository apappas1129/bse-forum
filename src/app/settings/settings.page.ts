import { LanguageService } from "./../providers/language.service";
import { Component, OnInit } from "@angular/core";
import { ActionSheetController } from "@ionic/angular";
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from '../providers/auth.service';
import { Router } from '@angular/router';

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
    private router: Router
  ) {
    this.selectedLang = this.languageService.currentLang;
  }

  ngOnInit() {}

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  onSelectLanguage() {
    this.languageService.setLanguage(this.selectedLang);
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: this.translate.instant("CHANGE_PHOTO"),
      mode: 'md',
      cssClass: "my-custom-class",
      buttons: [
        {
          text: this.translate.instant("PHOTO_DRAWER.CAMERA"),
          icon: "camera-outline",
          handler: () => {
            console.log("camera clicked");
          },
        },
        {
          text: this.translate.instant("PHOTO_DRAWER.LIBRARY"),
          icon: "images-outline",
          handler: () => {
            console.log("Select From Library clicked");
          },
        },
        {
          text: this.translate.instant("CANCEL"),
          icon: "close",
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          },
        },
      ],
    });
    await actionSheet.present();
  }
}

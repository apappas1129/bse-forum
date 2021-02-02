import { Component, NgZone } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { LanguageService } from './providers/language.service';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
const { App } = Plugins;

import seed from './firebase/seed';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public loaderConfig = {
    visible: true,
    transparent: false,
  };

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    public languageService: LanguageService,
    private router: Router,
    private zone: NgZone
  ) {
    this.initializeApp();
  }

  initializeApp() {
    // To seed inital data for development, uncomment the following and run it ONCE.
    // seed();

    this.platform.ready().then(() => {
      this.languageService.initialize();
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.deepLinking();

      this.stopInternalLoader();
    });
  }

  deepLinking() {
    App.addListener('appUrlOpen', (data: any) => {
      this.zone.run(() => {
        const path = data.url.split('.com').pop();
        if (path) {
          this.router.navigate(path.split('/'));
        }
      });
    });
  }

  stopInternalLoader() {
    setTimeout(() => {
      this.loaderConfig.transparent = true;
      setTimeout(() => {
        this.loaderConfig.visible = false;
      }, 600);
    }, 2000);
  }
}

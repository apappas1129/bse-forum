import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Plugins } from "@capacitor/core";
const { Storage } = Plugins;

export const LANG_KEY = "app-language";

@Injectable({
  providedIn: "root",
})
export class LanguageService {
  languages = ["en", "ja"];
  currentLang: string;

  constructor(private translate: TranslateService) {}

  initialize() {
    this.translate.addLangs(this.languages);

    const lang = this.translate.getBrowserLang() || "en";
    lang && this.translate.setDefaultLang(lang);
    console.log('test')
    Storage.get({ key: LANG_KEY }).then(
      ({ value }) => this.setLanguage(value) || this.setLanguage(lang)
    );
  }

  setLanguage(lang) {
    this.translate.use(lang);
    this.currentLang = lang;
    Storage.set({ key: LANG_KEY, value: lang });
    return lang;
  }
}

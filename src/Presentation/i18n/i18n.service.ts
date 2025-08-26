import { Injectable } from '@nestjs/common';
import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';

export type i18nOptions = {
  key: string;
  lang?: string;
  placeholders?: Record<string, string | number>;
};

@Injectable()
export class I18nService {
  private static instance: I18nService;
  private langJsonObject: Record<string, any> = {};
  private readonly defaultLang = 'en';

  constructor() {
    if (!I18nService.instance) {
      this.loadLocales();
      I18nService.instance = this;
    }
    return I18nService.instance;
  }

  static getInstance(): I18nService {
    if (!I18nService.instance) {
      I18nService.instance = new I18nService();
    }
    return I18nService.instance;
  }

  private loadLocales() {
    const localesDir = join(process.cwd(), `src/Configuration/langs`);
    const files = readdirSync(localesDir);

    files.forEach((file) => {
      if (file.endsWith('.json')) {
        const lang = file.replace('.json', '');
        const content = JSON.parse(
          readFileSync(join(localesDir, file), 'utf-8'),
        );
        this.langJsonObject[lang] = content;
      }
    });
  }

  t(
    key: string,
    lang?: string,
    placeholders?: Record<string, string | number>,
  ): string | null {
    const selectedLang = this.langJsonObject[lang] ? lang : this.defaultLang;
    const keys = key.split('.');
    let selectedLangObject: any = this.langJsonObject[selectedLang];
    let message: string;

    for (const k of keys) {
      selectedLangObject = selectedLangObject?.[k];
    }

    if (!selectedLangObject || typeof selectedLangObject?.text !== 'string') {
      return null;
    }

    message = selectedLangObject.text;

    if (placeholders) {
      Object.entries(placeholders).forEach(([k, v]) => {
        message = selectedLangObject?.text.replace(
          new RegExp(`<${k}>`, 'g'),
          String(v),
        );
      });
    }

    return message;
  }

  log(key: string, placeholders?: Record<string, string | number>) {
    return this.t(key, this.defaultLang, placeholders);
  }
}

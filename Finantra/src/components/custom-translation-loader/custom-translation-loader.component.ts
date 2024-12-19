import { HttpClient } from '@angular/common/http';
import { Component, Injectable } from '@angular/core';
import {TranslateLoader, TranslationObject} from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-custom-translation-loader',
  standalone: false,
  
  templateUrl: './custom-translation-loader.component.html',
  styleUrl: './custom-translation-loader.component.scss'
})

@Injectable({
  providedIn:'root'
})
export class CustomTranslationLoaderComponent implements TranslateLoader{
  
  constructor (private http: HttpClient){}

  getTranslation(lang: string): Observable<TranslationObject> {
    return this.http.get(`FINANTRA/src/app//i18n/${lang}.json`);
  }


}

export function provideTranslation() {
  return {
      defaultLanguage: 'en',
      loader: {
          provide: TranslateLoader,
          useFactory: (CustomTranslationLoaderComponent),
          deps: [HttpClient]
      },
  }
}

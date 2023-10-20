import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { EventEmitter } from '@angular/core';
import {
  LangChangeEvent,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { BehaviorSubject, of } from 'rxjs';
import { StoreModule } from '@ngrx/store';
import { LanguageService } from './modules/core/services/language.service';
import { ThemeService } from './modules/core/services/theme.service';
import { Translation } from 'primeng/api';
import { CoreModule } from './modules/core/core.module';
import { EffectsModule } from '@ngrx/effects';
import { provideMockStore } from '@ngrx/store/testing';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';

describe('AppComponent', () => {
  const translateService = jasmine.createSpyObj<TranslateService>(
    'translateService',
    ['get', 'stream']
  );
  const translateServiceMock = {
    currentLang: 'en',
    onLangChange: new EventEmitter<LangChangeEvent>(),
    use: translateService.get,
    get: translateService.get.and.returnValue(of('')),
    stream: translateService.stream.and.returnValue(of('')),
    onTranslationChange: new EventEmitter(),
    onDefaultLangChange: new EventEmitter(),
  };

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        TranslateModule.forRoot(),
        CoreModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        provideFirestore(() => getFirestore()),
        provideFirebaseApp(() => initializeApp(environment.firebase)),
      ],
      declarations: [AppComponent],
      providers: [
        provideMockStore({}),
        {
          provide: TranslateService,
          useValue: translateServiceMock,
        },
        {
          provide: LanguageService,
          useValue: jasmine.createSpyObj('LanguageService', {
            setInitLang: undefined,
            getTranslationObservable: new BehaviorSubject<Translation>({}),
          }),
        },
        {
          provide: ThemeService,
          useValue: jasmine.createSpyObj('ThemeService', {
            setInitTheme: undefined,
          }),
        },
      ],
    })
  );

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'cv-gen'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const app = fixture.componentInstance;
    expect(app.title).toEqual('cv-gen');
  });
});

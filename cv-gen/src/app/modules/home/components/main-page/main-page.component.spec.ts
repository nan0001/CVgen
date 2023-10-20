import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainPageComponent } from './main-page.component';
import { HeaderComponent } from '../header/header.component';
import { NavigationComponent } from '../navigation/navigation.component';
import {
  LangChangeEvent,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { EventEmitter } from '@angular/core';
import { of } from 'rxjs';
import { CrumbsComponent } from '../crumbs/crumbs.component';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginComponent } from '../login/login.component';
import { SharedModule } from '../../../shared/shared.module';
import { PrimeDesignModule } from '../../../prime-design/prime-design.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockStore } from '@ngrx/store/testing';

describe('MainPageComponent', () => {
  let component: MainPageComponent;
  let fixture: ComponentFixture<MainPageComponent>;
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
        RouterTestingModule,
        SharedModule,
        PrimeDesignModule,
        BrowserAnimationsModule,
      ],
      declarations: [
        MainPageComponent,
        HeaderComponent,
        NavigationComponent,
        CrumbsComponent,
        LoginComponent,
      ],
      providers: [
        provideMockStore({}),
        {
          provide: TranslateService,
          useValue: translateServiceMock,
        },
      ],
    });
    fixture = TestBed.createComponent(MainPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

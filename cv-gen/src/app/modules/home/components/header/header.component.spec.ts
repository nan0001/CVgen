import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { LoginComponent } from '../login/login.component';
import { of } from 'rxjs';
import { SharedModule } from '../../../shared/shared.module';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { EventEmitter } from '@angular/core';
import { PrimeDesignModule } from '../../../prime-design/prime-design.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockStore } from '@ngrx/store/testing';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
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
      imports: [SharedModule, PrimeDesignModule, BrowserAnimationsModule],
      declarations: [HeaderComponent, LoginComponent],
      providers: [
        provideMockStore({}),
        {
          provide: TranslateService,
          useValue: translateServiceMock,
        },
      ],
    });
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

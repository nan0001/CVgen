import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeComponent } from './welcome.component';
import { ThemeService } from '../../../core/services/theme.service';
import { of } from 'rxjs';
import { PrimeDesignModule } from '../../../prime-design/prime-design.module';
import { EventEmitter } from '@angular/core';
import {
  LangChangeEvent,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';

describe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;
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
      imports: [PrimeDesignModule, TranslateModule.forRoot()],
      declarations: [WelcomeComponent],
      providers: [
        {
          provide: ThemeService,
          useValue: jasmine.createSpyObj('ThemeService', [], {
            currentTheme$: of(''),
          }),
        },
        {
          provide: TranslateService,
          useValue: translateServiceMock,
        },
      ],
    });
    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

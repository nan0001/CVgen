import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthComponent } from './auth.component';
import { SharedModule } from '../shared/shared.module';
import { CUSTOM_ELEMENTS_SCHEMA, EventEmitter } from '@angular/core';
import {
  LangChangeEvent,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PrimeDesignModule } from '../prime-design/prime-design.module';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockStore } from '@ngrx/store/testing';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  const translateService = jasmine.createSpyObj<TranslateService>(
    'translateService',
    ['stream', 'get']
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
        SharedModule,
        ReactiveFormsModule,
        PrimeDesignModule,
        BrowserAnimationsModule,
      ],
      declarations: [AuthComponent],
      providers: [
        provideMockStore({}),
        {
          provide: TranslateService,
          useValue: translateServiceMock,
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

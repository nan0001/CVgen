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
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AuthActions } from '../core/store/actions/auth.actions';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let store: Store;
  let router: Router;

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
        {
          provide: Store,
          useValue: jasmine.createSpyObj('Store', ['dispatch', 'select']),
        },
        {
          provide: TranslateService,
          useValue: translateServiceMock,
        },
        {
          provide: Router,
          useValue: jasmine.createSpyObj('Router', ['navigate']),
        },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    });

    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    store = TestBed.inject(Store);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to main page on cancel btn', () => {
    const cancelBtn = fixture.debugElement.query(
      By.css('#cancel-btn > button')
    );

    cancelBtn.triggerEventHandler('click');
    expect(router.navigate).toHaveBeenCalledWith(['']);
  });

  it('should dispatch sign in action on form submit if value is correct', () => {
    const form = fixture.debugElement.query(By.css('form'));
    const testUsername = 'Test@mail.com';
    const testPassword = 'Qwerty123!';
    const action = AuthActions.signIn({
      email: testUsername,
      password: testPassword,
    });

    component.username.setValue(testUsername);
    component.password.setValue(testPassword);

    form.triggerEventHandler('submit');
    fixture.detectChanges();

    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

  it('should mark form as touched on form submit if value is incorrect', () => {
    const form = fixture.debugElement.query(By.css('form'));

    form.triggerEventHandler('submit');
    fixture.detectChanges();

    expect(component.authForm.touched).toBeTrue();
  });

  it('password should have at least 1 lower case letter', () => {
    const testPassword = 'HHHHHH123!';
    component.password.setValue(testPassword);

    fixture.detectChanges();

    expect(component.password.hasError('hasLowerCase')).toBeTrue();
  });

  it('password should have at least 1 number', () => {
    const testPassword = 'HHHHHHjdjd';
    component.password.setValue(testPassword);

    fixture.detectChanges();

    expect(component.password.hasError('hasNumeric')).toBeTrue();
  });

  it('password should have at least 1 upper case letter', () => {
    const testPassword = 'jskdjlsakjdl';
    component.password.setValue(testPassword);

    fixture.detectChanges();

    expect(component.password.hasError('hasUpperCase')).toBeTrue();
  });

  it('password should have at least 1 special char', () => {
    const testPassword = 'jskdjlsakjdl';
    component.password.setValue(testPassword);

    fixture.detectChanges();

    expect(component.password.hasError('hasSpecialChars')).toBeTrue();
  });

  it('username should be an email', () => {
    const testUsername = 'jskdjlsakjdl';
    component.username.setValue(testUsername);

    fixture.detectChanges();

    expect(component.username.hasError('email')).toBeTrue();
  });
});

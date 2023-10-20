import { TestBed } from '@angular/core/testing';
import { ErrorMsgPipe } from './error-msg.pipe';
import { LanguageService } from '../../core/services/language.service';

describe('ErrorMsgPipe', () => {
  let mockLangService: LanguageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ErrorMsgPipe],
      providers: [
        {
          provide: LanguageService,
          useValue: jasmine.createSpyObj('LanguageService', {
            getTranslationObservable: undefined,
          }),
        },
      ],
    }).compileComponents();

    mockLangService = TestBed.inject(
      LanguageService
    ) as jasmine.SpyObj<LanguageService>;
  });

  it('create an instance', () => {
    const pipe = new ErrorMsgPipe(mockLangService);
    expect(pipe).toBeTruthy();
  });

  it('should not call language service if there are no errors', () => {
    const pipe = new ErrorMsgPipe(mockLangService);
    pipe.transform(null, []);
    expect(mockLangService.getTranslationObservable).not.toHaveBeenCalled();
  });

  it('should call language service if errors', () => {
    const pipe = new ErrorMsgPipe(mockLangService);
    pipe.transform({ nameExists: true }, []);
    expect(mockLangService.getTranslationObservable).toHaveBeenCalled();
  });
});

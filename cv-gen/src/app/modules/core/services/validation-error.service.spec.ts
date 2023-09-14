import { TestBed } from '@angular/core/testing';

import { ValidationErrorService } from './validation-error.service';

describe('ValidationErrorService', () => {
  let service: ValidationErrorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidationErrorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

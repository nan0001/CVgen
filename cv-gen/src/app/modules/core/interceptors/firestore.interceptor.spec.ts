import { TestBed } from '@angular/core/testing';

import { FirestoreInterceptor } from './firestore.interceptor';

describe('FirestoreInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      FirestoreInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: FirestoreInterceptor = TestBed.inject(FirestoreInterceptor);
    expect(interceptor).toBeTruthy();
  });
});

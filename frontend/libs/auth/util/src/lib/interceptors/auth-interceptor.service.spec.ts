import { TestBed } from '@angular/core/testing';
import { mockClass } from '@workspace/tools/testing';
import { AuthBaseService } from '../auth-base.service';
import { AuthInterceptorService } from './auth-interceptor.service';

describe('AuthInterceptorService', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [mockClass(AuthBaseService, ['token'])],
    })
  );

  it('should be created', () => {
    const service: AuthInterceptorService = TestBed.inject(
      AuthInterceptorService
    );
    expect(service).toBeTruthy();
  });
});

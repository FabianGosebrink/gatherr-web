import { TestBed, waitForAsync } from '@angular/core/testing';
import { AuthApiModule } from './auth-api.module';

describe('AuthApiModule', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [AuthApiModule],
      }).compileComponents();
    })
  );

  it('should create', () => {
    expect(AuthApiModule).toBeDefined();
  });
});

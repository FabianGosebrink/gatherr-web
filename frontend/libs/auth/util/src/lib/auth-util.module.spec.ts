import { TestBed, waitForAsync } from '@angular/core/testing';
import { AuthUtilModule } from './auth-util.module';

describe('AuthUtilModule', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [AuthUtilModule],
      }).compileComponents();
    })
  );

  it('should create', () => {
    expect(AuthUtilModule).toBeDefined();
  });
});

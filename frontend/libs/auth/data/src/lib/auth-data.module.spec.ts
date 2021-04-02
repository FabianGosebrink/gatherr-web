import { TestBed, waitForAsync } from '@angular/core/testing';
import { AuthDataModule } from './auth-data.module';

describe('AuthDataModule', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [AuthDataModule],
      }).compileComponents();
    })
  );

  it('should create', () => {
    expect(AuthDataModule).toBeDefined();
  });
});

import { TestBed, waitForAsync } from '@angular/core/testing';
import { AuthFeatureModule } from './auth-feature.module';

describe('AuthFeatureModule', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [AuthFeatureModule],
      }).compileComponents();
    })
  );

  it('should create', () => {
    expect(AuthFeatureModule).toBeDefined();
  });
});

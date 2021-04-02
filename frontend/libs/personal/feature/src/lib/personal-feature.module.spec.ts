import { TestBed, waitForAsync } from '@angular/core/testing';
import { PersonalFeatureModule } from './personal-feature.module';

describe('PersonalFeatureModule', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [PersonalFeatureModule],
      }).compileComponents();
    })
  );

  it('should create', () => {
    expect(PersonalFeatureModule).toBeDefined();
  });
});

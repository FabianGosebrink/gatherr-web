import { TestBed, waitForAsync } from '@angular/core/testing';
import { HomeFeatureModule } from './home-feature.module';

describe('HomeFeatureModule', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [HomeFeatureModule],
      }).compileComponents();
    })
  );

  it('should create', () => {
    expect(HomeFeatureModule).toBeDefined();
  });
});

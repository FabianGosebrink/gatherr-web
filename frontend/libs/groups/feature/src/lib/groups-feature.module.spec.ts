import { TestBed, waitForAsync } from '@angular/core/testing';
import { GroupsFeatureModule } from './groups-feature.module';

describe('GroupsFeatureModule', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [GroupsFeatureModule],
      }).compileComponents();
    })
  );

  it('should create', () => {
    expect(GroupsFeatureModule).toBeDefined();
  });
});

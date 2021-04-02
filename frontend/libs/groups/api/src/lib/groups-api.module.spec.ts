import { TestBed, waitForAsync } from '@angular/core/testing';
import { GroupsApiModule } from './groups-api.module';

describe('GroupsApiModule', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [GroupsApiModule],
      }).compileComponents();
    })
  );

  it('should create', () => {
    expect(GroupsApiModule).toBeDefined();
  });
});

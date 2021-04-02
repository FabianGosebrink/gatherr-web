import { TestBed, waitForAsync } from '@angular/core/testing';
import { GroupsDataModule } from './groups-data.module';

describe('GroupsDataModule', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [GroupsDataModule],
      }).compileComponents();
    })
  );

  it('should create', () => {
    expect(GroupsDataModule).toBeDefined();
  });
});

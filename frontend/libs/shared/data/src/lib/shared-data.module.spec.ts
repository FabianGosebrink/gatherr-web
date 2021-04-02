import { TestBed, waitForAsync } from '@angular/core/testing';
import { SharedDataModule } from './shared-data.module';

describe('SharedDataModule', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [SharedDataModule],
      }).compileComponents();
    })
  );

  it('should create', () => {
    expect(SharedDataModule).toBeDefined();
  });
});

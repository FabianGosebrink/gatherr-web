import { TestBed, waitForAsync } from '@angular/core/testing';
import { HomeDataModule } from './home-data.module';

describe('HomeDataModule', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [HomeDataModule],
      }).compileComponents();
    })
  );

  it('should create', () => {
    expect(HomeDataModule).toBeDefined();
  });
});

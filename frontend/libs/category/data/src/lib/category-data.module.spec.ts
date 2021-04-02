import { TestBed, waitForAsync } from '@angular/core/testing';
import { CategoryDataModule } from './category-data.module';

describe('CategoryDataModule', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [CategoryDataModule],
      }).compileComponents();
    })
  );

  it('should create', () => {
    expect(CategoryDataModule).toBeDefined();
  });
});

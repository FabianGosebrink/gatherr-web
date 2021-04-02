import { TestBed, waitForAsync } from '@angular/core/testing';
import { CategoryApiModule } from './category-api.module';

describe('CategoryApiModule', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [CategoryApiModule],
      }).compileComponents();
    })
  );

  it('should create', () => {
    expect(CategoryApiModule).toBeDefined();
  });
});

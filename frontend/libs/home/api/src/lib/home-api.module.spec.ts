import { TestBed, waitForAsync } from '@angular/core/testing';
import { HomeApiModule } from './home-api.module';

describe('HomeApiModule', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [HomeApiModule],
      }).compileComponents();
    })
  );

  it('should create', () => {
    expect(HomeApiModule).toBeDefined();
  });
});

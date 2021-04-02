import { TestBed, waitForAsync } from '@angular/core/testing';
import { SharedUtilsModule } from './shared-utils.module';

describe('SharedUtilsModule', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [SharedUtilsModule],
      }).compileComponents();
    })
  );

  it('should create', () => {
    expect(SharedUtilsModule).toBeDefined();
  });
});

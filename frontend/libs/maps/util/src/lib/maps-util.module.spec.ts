import { TestBed, waitForAsync } from '@angular/core/testing';
import { MapsUtilModule } from './maps-util.module';

describe('MapsUtilModule', () => {
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [MapsUtilModule],
      }).compileComponents();
    })
  );

  it('should create', () => {
    expect(MapsUtilModule).toBeDefined();
  });
});

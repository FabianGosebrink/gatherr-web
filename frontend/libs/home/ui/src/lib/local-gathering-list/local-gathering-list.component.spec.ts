import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { getTranslocoModule } from '@workspace/tools/testing';
import { LocalGatheringListComponent } from './local-gathering-list.component';

describe('LocalGatheringListComponent', () => {
  let component: LocalGatheringListComponent;
  let fixture: ComponentFixture<LocalGatheringListComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [getTranslocoModule(), RouterTestingModule],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        declarations: [LocalGatheringListComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalGatheringListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { GatheringMemberOverviewComponent } from './gathering-member-overview.component';

describe('GatheringMemberOverviewComponent', () => {
  let component: GatheringMemberOverviewComponent;
  let fixture: ComponentFixture<GatheringMemberOverviewComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [GatheringMemberOverviewComponent],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        providers: [provideMockStore({})],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(GatheringMemberOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

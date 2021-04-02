import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { GroupMemberOverviewComponent } from './group-member-overview.component';

describe('GroupMemberOverviewComponent', () => {
  let component: GroupMemberOverviewComponent;
  let fixture: ComponentFixture<GroupMemberOverviewComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [GroupMemberOverviewComponent],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        providers: [provideMockStore({})],
      }).compileComponents();
    })
  );
  beforeEach(() => {
    fixture = TestBed.createComponent(GroupMemberOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

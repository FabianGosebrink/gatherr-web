import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { GroupsMemberSignalRService } from '@workspace/groups/utils';
import { mockClass } from 'tools/testing/mock-class';
import { GroupsOverviewComponent } from './groups-overview.component';

describe('GroupsOverviewComponent', () => {
  let component: GroupsOverviewComponent;
  let fixture: ComponentFixture<GroupsOverviewComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule, ReactiveFormsModule],
        declarations: [GroupsOverviewComponent],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        providers: [
          mockClass(GroupsMemberSignalRService, [
            'initGroupMemberSignalr',
            'stopConnection',
          ]),
          provideMockStore({}),
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupsOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

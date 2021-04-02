import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import {
  GroupsMemberSignalRService,
  MeetupsSignalRService,
} from '@workspace/groups/utils';
import { MapsService } from '@workspace/maps/util';
import { SharedUiCommonModule } from '@workspace/shared/ui-common';
import { SharedUiLayoutModule } from '@workspace/shared/ui-layout';
import { mockClass } from '@workspace/tools/testing';
import { GroupDetailsComponent } from './group-details.component';

describe('GroupDetailsComponent', () => {
  let component: GroupDetailsComponent;
  let fixture: ComponentFixture<GroupDetailsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          RouterTestingModule,
          SharedUiLayoutModule,
          SharedUiCommonModule,
        ],
        declarations: [GroupDetailsComponent],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        providers: [
          provideMockStore({}),
          mockClass(MapsService, ['getAddressByLatitudeLongitude']),
          mockClass(MeetupsSignalRService, [
            'initMeetupSignalr',
            'stopConnection',
          ]),
          mockClass(GroupsMemberSignalRService, [
            'initGroupMemberSignalr',
            'stopConnection',
          ]),
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

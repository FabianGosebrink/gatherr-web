import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { MeetupMembersSignalRService } from '@workspace/groups/utils';
import { SharedUiCommonModule } from '@workspace/shared/ui-common';
import { SharedUiLayoutModule } from '@workspace/shared/ui-layout';
import { mockClass } from '@workspace/tools/testing';
import { MeetupDetailsComponent } from './meetup-details.component';

describe('MeetupDetailsComponent', () => {
  let component: MeetupDetailsComponent;
  let fixture: ComponentFixture<MeetupDetailsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          RouterTestingModule,
          SharedUiLayoutModule,
          SharedUiCommonModule,
        ],
        declarations: [MeetupDetailsComponent],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        providers: [
          provideMockStore({}),
          mockClass(MeetupMembersSignalRService, [
            'initMeetupMemberSignalr',
            'stopConnection',
          ]),
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetupDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

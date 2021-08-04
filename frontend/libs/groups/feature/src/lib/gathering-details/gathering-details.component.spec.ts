import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { GatheringMembersSignalRService } from '@workspace/groups/utils';
import { SharedUiCommonModule } from '@workspace/shared/ui-common';
import { SharedUiLayoutModule } from '@workspace/shared/ui-layout';
import { mockClass } from '@workspace/tools/testing';
import { GatheringDetailsComponent } from './gathering-details.component';

describe('GatheringDetailsComponent', () => {
  let component: GatheringDetailsComponent;
  let fixture: ComponentFixture<GatheringDetailsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          RouterTestingModule,
          SharedUiLayoutModule,
          SharedUiCommonModule,
        ],
        declarations: [GatheringDetailsComponent],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        providers: [
          provideMockStore({}),
          mockClass(GatheringMembersSignalRService, [
            'initGatheringMemberSignalr',
            'stopConnection',
          ]),
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(GatheringDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

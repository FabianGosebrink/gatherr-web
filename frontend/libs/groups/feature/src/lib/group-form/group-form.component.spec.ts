import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { MapsService } from '@workspace/maps/util';
import { SharedUiCommonModule } from '@workspace/shared/ui-common';
import { SharedUiLayoutModule } from '@workspace/shared/ui-layout';
import { googleWindowMock, mockClass } from '@workspace/tools/testing';
import { GroupFormComponent } from './group-form.component';

const myWindow = {
  google: googleWindowMock,
};

describe('GroupFormComponent', () => {
  let component: GroupFormComponent;
  let fixture: ComponentFixture<GroupFormComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          SharedUiLayoutModule,
          SharedUiCommonModule,
          ReactiveFormsModule,
          RouterTestingModule,
          NoopAnimationsModule,
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        declarations: [GroupFormComponent],
        providers: [
          mockClass(MapsService, ['getPlaceByLatLng']),
          provideMockStore({}),
          { provide: 'Window', useValue: myWindow },
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

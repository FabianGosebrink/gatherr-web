import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { MapsService } from '@workspace/maps/util';
import { SharedUiCommonModule } from '@workspace/shared/ui-common';
import { SharedUiLayoutModule } from '@workspace/shared/ui-layout';
import { googleWindowMock } from '@workspace/tools/testing';
import { mockClass } from 'tools/testing/mock-class';
import { GatheringFormComponent } from './gathering-form.component';

const myWindow = {
  google: googleWindowMock,
};

describe('GatheringFormComponent', () => {
  let component: GatheringFormComponent;
  let fixture: ComponentFixture<GatheringFormComponent>;

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
        declarations: [GatheringFormComponent],
        providers: [
          mockClass(MapsService, ['getPlaceByLatLng']),
          provideMockStore({}),
          { provide: 'Window', useValue: myWindow },
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(GatheringFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

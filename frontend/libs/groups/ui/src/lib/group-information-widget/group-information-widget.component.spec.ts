import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SharedUiCommonModule } from '@workspace/shared/ui-common';
import { GroupInformationWidgetComponent } from './group-information-widget.component';

describe('GroupInformationWidgetComponent', () => {
  let component: GroupInformationWidgetComponent;
  let fixture: ComponentFixture<GroupInformationWidgetComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [SharedUiCommonModule],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        declarations: [GroupInformationWidgetComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupInformationWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

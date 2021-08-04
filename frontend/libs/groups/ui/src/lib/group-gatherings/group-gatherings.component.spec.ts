import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedUiLayoutModule } from '@workspace/shared/ui-layout';
import { GroupGatheringsComponent } from './group-gatherings.component';

describe('GroupGatheringsComponent', () => {
  let component: GroupGatheringsComponent;
  let fixture: ComponentFixture<GroupGatheringsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [GroupGatheringsComponent],
        imports: [SharedUiLayoutModule, RouterTestingModule],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupGatheringsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedUiLayoutModule } from '@workspace/shared/ui-layout';
import { GatheringMemberRoleItemComponent } from './gathering-member-role-item.component';

describe('GatheringMemberRoleItemComponent', () => {
  let component: GatheringMemberRoleItemComponent;
  let fixture: ComponentFixture<GatheringMemberRoleItemComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        imports: [
          ReactiveFormsModule,
          SharedUiLayoutModule,
          NoopAnimationsModule,
        ],
        declarations: [GatheringMemberRoleItemComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(GatheringMemberRoleItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

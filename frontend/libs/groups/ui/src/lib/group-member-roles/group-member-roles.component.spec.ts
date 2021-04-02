import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedUiLayoutModule } from '@workspace/shared/ui-layout';
import { GroupMemberRolesComponent } from './group-member-roles.component';

describe('GroupMemberRolesComponent', () => {
  let component: GroupMemberRolesComponent;
  let fixture: ComponentFixture<GroupMemberRolesComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          SharedUiLayoutModule,
          ReactiveFormsModule,
          NoopAnimationsModule,
        ],
        declarations: [GroupMemberRolesComponent],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupMemberRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

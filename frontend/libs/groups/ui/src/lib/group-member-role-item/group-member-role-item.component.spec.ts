import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { GroupMemberRoleItemComponent } from './group-member-role-item.component';

describe('GroupMemberRoleItemComponent', () => {
  let component: GroupMemberRoleItemComponent;
  let fixture: ComponentFixture<GroupMemberRoleItemComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [ReactiveFormsModule],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        declarations: [GroupMemberRoleItemComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupMemberRoleItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

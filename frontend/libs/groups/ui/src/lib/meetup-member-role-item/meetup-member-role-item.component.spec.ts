import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedUiLayoutModule } from '@workspace/shared/ui-layout';
import { MeetupMemberRoleItemComponent } from './meetup-member-role-item.component';

describe('MeetupMemberRoleItemComponent', () => {
  let component: MeetupMemberRoleItemComponent;
  let fixture: ComponentFixture<MeetupMemberRoleItemComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        imports: [
          ReactiveFormsModule,
          SharedUiLayoutModule,
          NoopAnimationsModule,
        ],
        declarations: [MeetupMemberRoleItemComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetupMemberRoleItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

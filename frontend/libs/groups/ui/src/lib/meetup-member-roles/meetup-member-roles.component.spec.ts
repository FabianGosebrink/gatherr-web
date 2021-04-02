import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedUiLayoutModule } from '@workspace/shared/ui-layout';
import { MeetupMemberRolesComponent } from './meetup-member-roles.component';

describe('MeetupMemberRolesComponent', () => {
  let component: MeetupMemberRolesComponent;
  let fixture: ComponentFixture<MeetupMemberRolesComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        imports: [
          SharedUiLayoutModule,
          ReactiveFormsModule,
          NoopAnimationsModule,
        ],
        declarations: [MeetupMemberRolesComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetupMemberRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

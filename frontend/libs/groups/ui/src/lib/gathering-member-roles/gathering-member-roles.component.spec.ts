import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { SharedUiLayoutModule } from '@workspace/shared/ui-layout';
import { GatheringMemberRolesComponent } from './gathering-member-roles.component';

describe('GatheringMemberRolesComponent', () => {
  let component: GatheringMemberRolesComponent;
  let fixture: ComponentFixture<GatheringMemberRolesComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        imports: [
          SharedUiLayoutModule,
          ReactiveFormsModule,
          NoopAnimationsModule,
        ],
        declarations: [GatheringMemberRolesComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(GatheringMemberRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

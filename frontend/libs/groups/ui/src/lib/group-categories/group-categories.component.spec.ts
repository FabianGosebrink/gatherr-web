import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SharedUiLayoutModule } from '@workspace/shared/ui-layout';
import { GroupCategoriesComponent } from './group-categories.component';

describe('GroupCategoriesComponent', () => {
  let component: GroupCategoriesComponent;
  let fixture: ComponentFixture<GroupCategoriesComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [SharedUiLayoutModule],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        declarations: [GroupCategoriesComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

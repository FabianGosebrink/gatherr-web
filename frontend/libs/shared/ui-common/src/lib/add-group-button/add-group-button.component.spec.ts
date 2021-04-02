import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedUiLayoutModule } from '@workspace/shared/ui-layout';
import { AddGroupButtonComponent } from './add-group-button.component';

describe('AddGroupButtonComponent', () => {
  let component: AddGroupButtonComponent;
  let fixture: ComponentFixture<AddGroupButtonComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [SharedUiLayoutModule, RouterTestingModule],
        declarations: [AddGroupButtonComponent],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AddGroupButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

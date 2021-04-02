import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SharedUiLayoutModule } from '@workspace/shared/ui-layout';
import { ChooseCameraComponent } from './choose-camera.component';

describe('ChooseCameraComponent', () => {
  let component: ChooseCameraComponent;
  let fixture: ComponentFixture<ChooseCameraComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [SharedUiLayoutModule],
        declarations: [ChooseCameraComponent],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseCameraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

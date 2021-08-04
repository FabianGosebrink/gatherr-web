import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { GatheringLeaveComponent } from './gathering-leave.component';

describe('GatheringLeaveComponent', () => {
  let component: GatheringLeaveComponent;
  let fixture: ComponentFixture<GatheringLeaveComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule],
        declarations: [GatheringLeaveComponent],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        providers: [provideMockStore({})],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(GatheringLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

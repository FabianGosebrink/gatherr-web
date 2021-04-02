import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { MeetupLeaveComponent } from './meetup-leave.component';

describe('MeetupLeaveComponent', () => {
  let component: MeetupLeaveComponent;
  let fixture: ComponentFixture<MeetupLeaveComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [RouterTestingModule],
        declarations: [MeetupLeaveComponent],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        providers: [provideMockStore({})],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetupLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

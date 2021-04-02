import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { getTranslocoModule } from '@workspace/tools/testing';
import { LocalMeetupListComponent } from './local-meetup-list.component';

describe('LocalMeetupListComponent', () => {
  let component: LocalMeetupListComponent;
  let fixture: ComponentFixture<LocalMeetupListComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [getTranslocoModule(), RouterTestingModule],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        declarations: [LocalMeetupListComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalMeetupListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

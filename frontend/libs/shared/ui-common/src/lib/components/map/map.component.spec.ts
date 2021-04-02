import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { googleWindowMock } from '@workspace/tools/testing';
import { MapComponent } from './map.component';

const myWindow = {
  google: googleWindowMock,
};

describe('MeetupMapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [MapComponent],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        providers: [{ provide: 'Window', useValue: myWindow }],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

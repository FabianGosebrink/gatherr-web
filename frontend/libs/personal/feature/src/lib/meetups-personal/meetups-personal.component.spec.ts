import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { SharedUiLayoutModule } from '@workspace/shared/ui-layout';
import { MeetupsPersonalComponent } from './meetups-personal.component';

describe('MeetupsPersonalComponent', () => {
  let component: MeetupsPersonalComponent;
  let fixture: ComponentFixture<MeetupsPersonalComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [SharedUiLayoutModule],
        declarations: [MeetupsPersonalComponent],
        providers: [provideMockStore({})],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetupsPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

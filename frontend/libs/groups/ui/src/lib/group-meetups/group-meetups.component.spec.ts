import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedUiLayoutModule } from '@workspace/shared/ui-layout';
import { GroupMeetupsComponent } from './group-meetups.component';

describe('GroupMeetupsComponent', () => {
  let component: GroupMeetupsComponent;
  let fixture: ComponentFixture<GroupMeetupsComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [GroupMeetupsComponent],
        imports: [SharedUiLayoutModule, RouterTestingModule],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupMeetupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

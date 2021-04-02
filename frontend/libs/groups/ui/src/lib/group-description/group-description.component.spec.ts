import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { GroupDescriptionComponent } from './group-description.component';

describe('GroupDescriptionComponent', () => {
  let component: GroupDescriptionComponent;
  let fixture: ComponentFixture<GroupDescriptionComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [GroupDescriptionComponent],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

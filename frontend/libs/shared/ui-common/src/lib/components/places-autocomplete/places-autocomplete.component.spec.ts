import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { googleWindowMock } from '@workspace/tools/testing';
import { PlacesAutocompleteComponent } from './places-autocomplete.component';

const myWindow = {
  google: googleWindowMock,
};

describe('PlacesAutocompleteComponent', () => {
  let component: PlacesAutocompleteComponent;
  let fixture: ComponentFixture<PlacesAutocompleteComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [FormsModule],
        declarations: [PlacesAutocompleteComponent],
        providers: [{ provide: 'Window', useValue: myWindow }],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacesAutocompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import {
  AfterViewInit,
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'workspace-places-autocomplete',
  templateUrl: './places-autocomplete.component.html',
  styleUrls: ['./places-autocomplete.component.scss'],
})
export class PlacesAutocompleteComponent implements OnInit, AfterViewInit {
  @Input() addressType: string;
  _place: any;
  get place() {
    return this._place;
  }

  @Input('place')
  set place(value: any) {
    this._place = value;
    if (value) {
      this.autocompleteInput = value.formatted_address;
    }
  }
  @Output() setAddress = new EventEmitter();
  @ViewChild('addressText') addressText: any;

  @Input() autocompleteInput: string;
  queryWait: boolean;

  constructor(@Inject('Window') private window: any) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.getPlaceAutocomplete();
  }

  private getPlaceAutocomplete() {
    const autocomplete = new this.window.google.maps.places.Autocomplete(
      this.addressText.nativeElement,
      {
        types: [this.addressType], // 'establishment' / 'address' / 'geocode'
      }
    );

    this.window.google.maps.event.addListener(
      autocomplete,
      'place_changed',
      () => {
        const place = autocomplete.getPlace();
        this.setAddress.emit(place);
      }
    );
  }
}

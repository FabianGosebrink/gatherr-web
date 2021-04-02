import {
  Component,
  ElementRef,
  Inject,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'workspace-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  @ViewChild('map', { static: true }) templateMap: ElementRef;
  @Input() lat: number;
  @Input() lng: number;
  @Input() heightInPx: number;

  googleMap: any;

  constructor(@Inject('Window') private window: any) {}

  ngOnInit() {
    if (this.lat && this.lng) {
      this.initMap(this.lat, this.lng);
      this.setMarkerOnMap(this.lat, this.lng);
    }
  }

  private initMap(lat: number, lng: number) {
    this.googleMap = new this.window.google.maps.Map(
      this.templateMap.nativeElement,
      {
        zoom: 15,
        center: { lat, lng },
      }
    );
  }

  private setMarkerOnMap(lat: number, lng: number) {
    const marker = new this.window.google.maps.Marker({
      map: this.googleMap,
      position: { lat, lng },
    });
  }
}

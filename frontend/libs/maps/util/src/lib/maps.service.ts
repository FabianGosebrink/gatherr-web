import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

declare var google: any;

@Injectable({ providedIn: 'root' })
export class MapsService {
  autoCompleteService = new google.maps.places.AutocompleteService();
  geoCodeService = new google.maps.Geocoder();

  getAddressByLatitudeLongitude(lat, lng) {
    const location = new google.maps.LatLng(lat, lng);

    return new Observable((observer) => {
      this.geoCodeService.geocode({ location }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK) {
          let result;
          if (results.length > 1) {
            result = results[1];
          } else {
            result = results[0];
          }
          observer.next(result);
          observer.complete();
        } else {
          observer.error(`getAddressByLatitudeLongitude status ${status}`);
        }
      });
    });
  }

  getPlaceByLatLng(lat, lng): Observable<any> {
    return new Observable((observer) => {
      this.geoCodeService.geocode(
        {
          location: {
            lat,
            lng,
          },
        },
        (results, status) => {
          if (status === google.maps.GeocoderStatus.OK) {
            if (results[1]) {
              observer.next(results[1]);
              observer.complete();
            } else {
              observer.error('No results found');
            }
          } else {
            observer.error('Geocoder failed due to: ' + status);
          }
        }
      );
    });
  }

  getCurrentCity() {
    return this.getCurrentLatitudeLongitude().pipe(
      switchMap(({ lat, lng }) => this.getAddressByLatitudeLongitude(lat, lng))
    );
  }

  getCurrentLatitudeLongitude(options?: any) {
    const opt = options || {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 0,
    };
    return new Observable((observer) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const lng = position.coords.longitude;
            const lat = position.coords.latitude;
            observer.next({ lat, lng });
            observer.complete();
          },
          (error) => observer.error(error),
          opt
        );
      } else {
        observer.error('Geolocation is not supported by this browser.');
      }
    });
  }
}

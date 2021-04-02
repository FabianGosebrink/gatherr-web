import { Location } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  NgZone,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { DesktopCameraService, Photo } from '@workspace/features/camera';
import * as fromGroupStore from '@workspace/groups/data';
import { MapsService } from '@workspace/maps/util';
import { Meetup } from '@workspace/shared/data';
import { ChooseCameraComponent } from '@workspace/shared/ui-common';
import { AddressExtractor } from '@workspace/shared/utils';
import * as dayjs from 'dayjs';
import { Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

const HH_MM_PATTERN = '^([0-1][0-9]|[2][0-3]):([0-5][0-9])$';

declare var google: any;

@Component({
  selector: 'workspace-meetup-form',
  templateUrl: './meetup-form.component.html',
  styleUrls: ['./meetup-form.component.scss'],
})
export class MeetupFormComponent implements OnInit, AfterViewInit {
  @ViewChild('map', { static: true }) mapElement: ElementRef;
  @ViewChild('addresstext') addressText: any;
  @ViewChild('fileInput') fileInput: ElementRef;

  private selectedPlaceInternal: any;
  private googleMap: google.maps.Map;
  private marker: google.maps.Marker;
  private selectedFile: File;

  filename = '';
  base64File = '';

  form: FormGroup;
  someFunction: any;
  isLoading$: Observable<boolean>;
  place = '';
  item: Meetup;

  get isEditing() {
    return !!this.form.get('id').value;
  }

  constructor(
    @Inject('Window') private window: any,
    private store: Store<any>,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private zone: NgZone,
    private mapsService: MapsService,
    public location: Location,
    private addressExtractor: AddressExtractor,
    private cameraService: DesktopCameraService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: [''],
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', [Validators.required, Validators.pattern(HH_MM_PATTERN)]],
      place: ['', Validators.required],
      maxAttendees: [0, Validators.required],
    });

    this.isLoading$ = this.store.pipe(select(fromGroupStore.selectIsLoading));

    this.googleMap = new this.window.google.maps.Map(
      this.mapElement.nativeElement,
      {
        zoom: 15,
      }
    );

    this.showCurrentPosition(this.googleMap);

    // TODO REPLACE THE TWO SUBSCRIBES
    if (!!this.activatedRoute.snapshot.params.meetupid) {
      this.store
        .pipe(
          select(fromGroupStore.selectCurrentMeetup),
          filter((item) => !!item)
        )
        .subscribe((meetup) => {
          this.item = meetup;
          this.mapsService
            .getPlaceByLatLng(meetup.latitude, meetup.longitude)
            .subscribe((place) => {
              this.zone.run(() => {
                this.place = place;
                const meetupForForm = this.prepareMeetupForForm(meetup, place);
                this.form.patchValue(meetupForForm);
                this.showPlaceOnMap(place);
              });
            });
        });

      this.store.dispatch(fromGroupStore.getSingleMeetup());
    }

    this.googleMap.addListener('click', (e) => {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      this.mapsService.getPlaceByLatLng(lat, lng).subscribe((place) => {
        this.showPlaceOnMap(place);
      });
    });
  }

  ngAfterViewInit() {
    this.getPlaceAutocomplete();
  }

  save() {
    if (!this.form.valid) {
      return;
    }

    const formData = new FormData();

    if (this.selectedFile) {
      formData.append(this.selectedFile.name, this.selectedFile);
      this.filename = this.selectedFile.name;
    }

    const meetup = this.prepareFormForSubmit();

    if (this.form.value.id) {
      this.store.dispatch(
        fromGroupStore.updateMeetup({
          meetup,
        })
      );
    } else {
      this.store.dispatch(
        fromGroupStore.addMeetupToCurrentGroup({
          meetup,
          formData,
        })
      );
    }
  }

  showPlaceOnMap(place: any) {
    if (place && place.formatted_address) {
      this.selectedPlaceInternal = place;
      this.form.controls['place'].patchValue(place.formatted_address);
    }

    if (place.geometry.location) {
      this.googleMap.setCenter(place.geometry.location);
      this.setMarker(place.geometry.location);
    }
  }

  setFilename(files) {
    if (files[0]) {
      this.filename = files[0].name;
    }
  }

  pictureClicked() {
    this.openCameraDialog()
      .pipe(
        filter((source) => !!source),
        switchMap((source) =>
          this.cameraService.getPhoto(source, this.fileInput)
        )
      )
      .subscribe((result: Photo) => {
        this.base64File = result.base64;
        this.selectedFile = result.file;
        this.filename = this.selectedFile.name;
      });
  }

  private prepareFormForSubmit() {
    const form = {
      ...this.form.value,
    };

    const {
      id,
      title,
      description,
      date,
      time,
      maxAttendees,
      imageUrl,
      linkName,
    } = form;

    const dateToSend = this.parseDateAndTime(date, time);
    const country =
      this.addressExtractor.extract(this.selectedPlaceInternal, 'country')
        ?.long_name || '';
    const city =
      this.addressExtractor.extract(this.selectedPlaceInternal, 'locality')
        ?.short_name || '';

    return {
      id,
      title,
      description,
      maxAttendees,
      latitude: this.selectedPlaceInternal.geometry.location.lat(),
      longitude: this.selectedPlaceInternal.geometry.location.lng(),
      city,
      country,
      date: new Date(dateToSend),
      imageUrl: imageUrl || null,
      linkName: linkName || null,
    };
  }

  private prepareMeetupForForm(meetup: Meetup, place: any) {
    const pos = {
      lat: meetup.latitude,
      lng: meetup.longitude,
    };
    this.googleMap.setCenter(pos);
    this.setMarker(pos);

    let { date } = meetup;
    date = new Date(date);
    return {
      id: meetup.id,
      title: meetup.title,
      description: meetup.description,
      date,
      time: `${date.getHours()}:${date.getMinutes()}`,
      maxAttendees: meetup.maxAttendees,
      place,
    };
  }

  private parseDateAndTime(formDate: any, formTime: string) {
    const date = new Date(formDate);
    const timeArray = formTime.split(':');
    date.setHours(+timeArray[0]);
    date.setMinutes(+timeArray[1]);

    return date;
  }

  private showCurrentPosition(map: any) {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        map.setCenter(pos);
        this.setMarker(pos);
      });
    }
  }

  private setMarker(location) {
    if (this.marker) {
      this.marker.setMap(null);
    }
    this.marker = new this.window.google.maps.Marker({
      map: this.googleMap,
      position: location,
    });
  }

  private openCameraDialog() {
    const dialogRef = this.dialog.open(ChooseCameraComponent);

    return dialogRef.afterClosed();
  }

  private getPlaceAutocomplete() {
    const autocomplete = new this.window.google.maps.places.Autocomplete(
      this.addressText.nativeElement,
      {
        types: ['geocode'], // 'establishment' / 'address' / 'geocode'
      }
    );

    this.window.google.maps.event.addListener(
      autocomplete,
      'place_changed',
      () => {
        this.selectedPlaceInternal = autocomplete.getPlace();
        const pos = {
          lat: this.selectedPlaceInternal.geometry.location.lat(),
          lng: this.selectedPlaceInternal.geometry.location.lng(),
        };
        this.googleMap.setCenter(pos);
        this.setMarker(pos);
      }
    );
  }
}

export function dateValidator(
  control: AbstractControl
): { [key: string]: any } | null {
  if (!control.value) {
    return null;
  }

  const { year, month, day } = control.value;
  const valid = dayjs(`${year}-${month}-${day}`).isValid();
  return valid ? null : { invalidDate: { valid: false, value: control.value } };
}

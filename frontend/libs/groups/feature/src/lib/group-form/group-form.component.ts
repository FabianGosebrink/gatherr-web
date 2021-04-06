import { Location } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import * as fromCategories from '@workspace/category/data';
import { DesktopCameraService, Photo } from '@workspace/shared/camera';
import * as fromGroupStore from '@workspace/groups/data';
import { MapsService } from '@workspace/maps/util';
import { Category } from '@workspace/shared/data';
import { ChooseCameraComponent } from '@workspace/shared/ui-common';
import { Observable } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'workspace-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.scss'],
})
export class GroupFormComponent implements OnInit, AfterViewInit {
  @ViewChild('map', { static: true }) mapElement: ElementRef;
  @ViewChild('fileInput') fileInput: ElementRef;
  form: FormGroup;
  categories$: Observable<Category[]>;
  isLoading$: Observable<boolean>;
  filename = '';
  base64File = '';

  private selectedFile: File;

  private googleMap: any;
  private marker: any;
  private selectedPlaceInternal: any;

  @ViewChild('addressText') addressText: any;
  get isEditing() {
    return !!this.form.get('id').value;
  }

  constructor(
    @Inject('Window') private window: any,
    private store: Store<any>,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    public location: Location,
    private mapsService: MapsService,
    private cameraService: DesktopCameraService,
    private dialog: MatDialog
  ) {}

  isInvalidAndDirtyOrTouched(formControlName: string) {
    return (
      this.form.get(formControlName).invalid &&
      (this.form.get(formControlName).dirty ||
        this.form.get(formControlName).touched)
    );
  }

  ngAfterViewInit() {
    this.getPlaceAutocomplete();
  }

  ngOnInit() {
    this.createForm();

    this.categories$ = this.store.pipe(
      select(fromCategories.selectAllCategories)
    );

    this.isLoading$ = this.store.pipe(
      select(fromGroupStore.selectGroupsLoading)
    );

    if (!!this.activatedRoute.snapshot.params.id) {
      this.store
        .pipe(
          select(fromGroupStore.selectCurrentGroup),
          filter((group) => !!group),

          tap((group) => {
            this.form.patchValue(group);
            this.filename = group.imageUrl;
          }),
          switchMap((groupNotNull) =>
            this.mapsService.getPlaceByLatLng(
              groupNotNull.latitude,
              groupNotNull.longitude
            )
          )
        )
        .subscribe((place) => this.showPlaceOnMap(place));

      this.store.dispatch(fromGroupStore.getSingleGroup());
    }

    this.store.dispatch(fromCategories.getAll());

    this.googleMap = new this.window.google.maps.Map(
      this.mapElement.nativeElement,
      {
        zoom: 15,
      }
    );

    this.showCurrentPosition(this.googleMap);

    this.googleMap.addListener('click', (e) => {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();
      this.mapsService.getPlaceByLatLng(lat, lng).subscribe((place) => {
        this.showPlaceOnMap(place);
      });
    });
  }

  setFilename(files) {
    if (files[0]) {
      this.filename = files[0].name;
    }
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

    const toSend = { ...this.form.value };
    const { groupCategories } = this.form.value;
    toSend.latitude = this.selectedPlaceInternal.geometry.location.lat();
    toSend.longitude = this.selectedPlaceInternal.geometry.location.lng();
    toSend.categoryIds = groupCategories.map((x) => x.id);

    if (this.form.value.id) {
      this.store.dispatch(
        fromGroupStore.updateCompleteGroup({
          payload: toSend,
          formData,
        })
      );
    } else {
      this.store.dispatch(
        fromGroupStore.addCompleteGroup({ payload: toSend, formData })
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

  compareCategoryObjects(object1: any, object2: any) {
    return object1 && object2 && object1.id === object2.id;
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

  private openCameraDialog() {
    const dialogRef = this.dialog.open(ChooseCameraComponent);

    return dialogRef.afterClosed();
  }

  private createForm() {
    this.form = this.formBuilder.group({
      id: '',
      name: ['', Validators.required],
      groupCategories: [[], Validators.required],
      description: ['', Validators.required],
      place: ['', Validators.required],
      file: '',
    });
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

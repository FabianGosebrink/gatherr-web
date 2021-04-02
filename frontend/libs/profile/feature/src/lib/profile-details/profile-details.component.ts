import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { DesktopCameraService, Photo } from '@workspace/features/camera';
import {
  getProfile,
  selectIsLoading,
  selectUserProfile,
  updateCompleteProfile,
} from '@workspace/profile/data';
import { UserProfile } from '@workspace/shared/data';
import { ChooseCameraComponent } from '@workspace/shared/ui-common';
import { Observable } from 'rxjs';
import { filter, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'workspace-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss'],
})
export class ProfileDetailsComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;
  form: FormGroup;
  progress: number;
  message: string;
  filename = '';
  base64File = '';
  isLoading$: Observable<boolean>;
  userProfile$: Observable<UserProfile>;

  private selectedFile: File;

  constructor(
    private store: Store<any>,
    private formBuilder: FormBuilder,
    public location: Location,
    private dialog: MatDialog,
    private cameraService: DesktopCameraService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: null,
      username: [''],
      aboutMe: [''],
      file: '',
    });

    this.userProfile$ = this.store.pipe(
      select(selectUserProfile),
      filter((profile) => !!profile),
      tap((profile) => this.form.patchValue(profile))
    );

    this.isLoading$ = this.store.pipe(select(selectIsLoading));

    this.store.dispatch(
      getProfile({ payload: this.activatedRoute.snapshot.params.id })
    );
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

  updateProfile() {
    const formData = new FormData();

    if (this.selectedFile) {
      formData.append(this.selectedFile.name, this.selectedFile);
      this.filename = this.selectedFile.name;
    }

    const userProfile = this.form.value as UserProfile;
    this.store.dispatch(
      updateCompleteProfile({ payload: userProfile, formData })
    );
  }

  private openCameraDialog() {
    const dialogRef = this.dialog.open(ChooseCameraComponent);

    return dialogRef.afterClosed();
  }
}

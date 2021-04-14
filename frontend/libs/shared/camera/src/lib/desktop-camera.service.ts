import { Injectable } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { CameraHelperService } from './camera-helper.service';
import { Photo } from './photo';
import { PhotoSource } from './photo-source';

declare const window: any;

@Injectable({ providedIn: 'root' })
export class DesktopCameraService {
  constructor(private cameraHelperService: CameraHelperService) {}
  getPhoto(source: PhotoSource, fileInput: any): Observable<Photo> {
    if (source === 'camera') {
      return this.requestDesktopCamera().pipe(
        map((base64) => {
          return {
            base64,
            file: this.cameraHelperService.base64ToFile(base64),
          };
        })
      );
    }

    return this.useFileInput(fileInput).pipe(
      switchMap((file) =>
        this.cameraHelperService.fileToBase64(file).pipe(
          map((base64) => {
            return { base64, file };
          })
        )
      )
    );
  }

  private useFileInput(fileInput: any) {
    fileInput.nativeElement.click();

    const change$ = fromEvent<MouseEvent>(
      fileInput.nativeElement,
      'change'
    ).pipe(map(() => fileInput.nativeElement?.files[0]));

    return change$;
  }

  private requestDesktopCamera() {
    return new Observable<string>((observer: any) => {
      this.getMediaDevices()
        .getUserMedia({
          video: { facingMode: 'environment' },
          audio: false,
        })
        .then(
          (stream: any) => {
            const doc = document;
            const videoElement = doc.createElement('video');
            videoElement.srcObject = stream;
            videoElement.play();

            const takePhotoInternal = () => {
              const canvasElement = doc.createElement('canvas');
              canvasElement.setAttribute(
                'width',
                videoElement.videoWidth.toString()
              );
              canvasElement.setAttribute(
                'height',
                videoElement.videoHeight.toString()
              );

              setTimeout(() => {
                const context = canvasElement.getContext('2d');
                context.drawImage(
                  videoElement,
                  0,
                  0,
                  videoElement.videoWidth,
                  videoElement.videoHeight
                );

                const url = canvasElement.toDataURL('image/png');

                videoElement.pause();

                if (stream.stop) {
                  stream.stop();
                }

                if (stream.getAudioTracks) {
                  stream.getAudioTracks().forEach((track: any) => {
                    track.stop();
                  });
                }

                if (stream.getVideoTracks) {
                  stream.getVideoTracks().forEach((track: any) => {
                    track.stop();
                  });
                }

                observer.next(url);
                observer.complete();
              }, 500);
            };

            if (videoElement.readyState >= videoElement.HAVE_FUTURE_DATA) {
              takePhotoInternal();
            } else {
              videoElement.addEventListener(
                'canplay',
                function () {
                  takePhotoInternal();
                },
                false
              );
            }
          },
          (error: any) => {
            console.log(error);
          }
        );
    });
  }

  private getMediaDevices(): any {
    const mediaDevices =
      (window.navigator.mozGetUserMedia || window.navigator.webkitGetUserMedia
        ? {
            getUserMedia: (options: any) => {
              return new Promise((resolve, reject) => {
                (
                  window.navigator.mozGetUserMedia ||
                  window.navigator.webkitGetUserMedia
                ).call(window.navigator, options, resolve, reject);
              });
            },
          }
        : null) || window.navigator.mediaDevices;

    return mediaDevices;
  }
}

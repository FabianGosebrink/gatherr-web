import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class SnackbarNotificationService {
  constructor(private snackBar: MatSnackBar, private ngZone: NgZone) {}

  showSuccess(msg: string) {
    this.ngZone.run(() => {
      this.snackBar.open(msg, 'Close', {
        duration: 2000,
      });
    });
  }

  showError(msg: string) {
    this.ngZone.run(() => {
      this.snackBar.open(msg, 'Close', {
        duration: 2000,
      });
    });
  }
}

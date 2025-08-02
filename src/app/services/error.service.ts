import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../components/error-dialog/error-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  dialog = inject(MatDialog);

  showErrorMessage(message: string) {
    this.dialog.open(ErrorDialogComponent, {
        data: { message }
    });
  }
}

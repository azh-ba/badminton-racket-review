import { ErrorHandler, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class CustomErrorHandler implements ErrorHandler {

  constructor(private snackbar: MatSnackBar) { }

  handleError(error: Error) { 
    this.snackbar.open(
      'An error has occurred.',
      'Close',
      {
        duration: 5000,
      }
    );
    console.warn('Caught by Custom Error Handler: ', error);
  }
}

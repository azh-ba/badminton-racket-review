import { Injectable } from '@angular/core';
import { Racket } from '../racket';

import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';

import { CustomErrorHandler } from './custom-error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class RacketService {
  // private apiUrl = 'http://localhost:5000/rackets';
  // httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'})};
  apiUrl = 'https://localhost:7203/Racket';
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'})
    .set('access-control-allow-origin', "https://localhost:7203/") };    
  httpOptionsImage = { headers: new HttpHeaders({ 'enctype': 'multipart/form-data'})
    .set('access-control-allow-origin', "https://localhost:7203/")};             

  constructor(
    private httpClient: HttpClient,
    public customError: CustomErrorHandler
  ) { }

  // Generic error handler
  private handleError<T>(operation = 'operation', message?: string, result?: T) {
    return (error: any): Observable<T> => {
      // Log info
      console.info('Error handled by Racket Service.');

      // Send error to custom error handler for rendering
      this.customError.handleError(error);

      // Let the app keep running by returning an empty result
      // return of(result as T);

      // Throw error to the component
      return throwError(() => {
        return new Error(operation + message);
      })
    }
  }

  // Get a list of rackets
  getRackets(): Observable<Racket[]> {
    let messageErr: string = ' could\'t load data.';
    return this.httpClient.get<Racket[]>(this.apiUrl, this.httpOptions)
      .pipe(
        catchError(this.handleError<Racket[]>('getRackets', messageErr,[]))
      );
  }

  // Get the list of brands
  getBrands(): Observable<String[]> {
    let messageErr: string = ' could\'t load data.';
    const url = `${this.apiUrl}/brands`;
    return this.httpClient.get<String[]>(url, this.httpOptions).pipe(
      catchError(this.handleError<String[]>('getBrands', messageErr, []))
    );
  }

  // Get a list of rackets with criterias
  getFilteredRackets(form: FormGroup): Observable<Racket[]> {
    let messageErr: string = ' could\'t load data.';

    // Generate brand query string
    let brand: string = '';
    for (let i = 0; i < form.value.brand.length; i++) {
      brand += `Brand=${form.value.brand[i]}&`;
    }
    // Generate shaft flex query string
    let shaft: string = '';
    for (let i = 0; i < form.value.shaftFlex.length; i++) {
      shaft += `ShaftFlex=${form.value.shaftFlex[i]}&`;
    }
    // Generate sort & descending by query string
    let sort: string = '';
    let descend: string = '';
    if (form.value.sortBy !== 'None') {
      sort = 'SortBy=' + form.value.sortBy;
      descend = '&IsDescending=' + form.value.isDescending;
    }

    // Generate url query string
    let url: string = '';
    if (brand !== '' || shaft !== '' || sort !== '' || descend !== '') {
      url = `${this.apiUrl}?` + brand + shaft + sort + descend;
    } else {
      url = this.apiUrl;
    }
    
    return this.httpClient.get<Racket[]>(url).pipe(
      catchError(this.handleError<Racket[]>('getRacket', messageErr, []))
    );
  }

  // Get a single racket
  getRacket(id: number): Observable<Racket> {
    let messageErr: string = ' could\'t load data.';
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.get<Racket>(url).pipe(
      catchError(this.handleError<Racket>(`getRacket id=${id}`, messageErr))
    );
  }

  // Add a new racket
  addRacket(racket: Racket): Observable<Racket> {
    let messageErr: string = ' could\'t upload data.';
    return this.httpClient.post<Racket>(this.apiUrl, racket, this.httpOptions).pipe(
      catchError(this.handleError<Racket>('addRacket', messageErr))
    );
  }

  // Update an existing racket
  updateRacket(id: number, racket: Racket): Observable<Racket> {
    let messageErr: string = ' could\'t upload data.';
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.put<Racket>(url, racket, this.httpOptions).pipe(
      catchError(this.handleError<Racket>('updateRacket', messageErr)),
    );
  }

  // Delete an existing racket
  deleteRacket(id?: number): Observable<Racket> {
    let messageErr: string = ' could\'t delete data.';
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.delete<Racket>(url, this.httpOptions).pipe(
      catchError(this.handleError<Racket>('deleteRacket', messageErr))
    );
  }

  // Upload racket image
  uploadImage(formData: FormData): Observable<FormData> {
    let messageErr: string = ' could\'t upload image.';
    const url = `${this.apiUrl}/image-upload`;
    console.log(url);
    return this.httpClient.post<FormData>(url, formData, this.httpOptionsImage).pipe(
      catchError(this.handleError<FormData>('uploadImage', messageErr))
    );
  }
}
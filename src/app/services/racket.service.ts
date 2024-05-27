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

  constructor(
    private httpClient: HttpClient,
    public customError: CustomErrorHandler
  ) { }

  // Generic error handler
  // private handleError<T>(operation = 'operation', result?: T) {
  //   return (error: any): Observable<T> => {
  //     // Send error to custom error handler for rendering
  //     this.customError.handleError(error);

  //     // Let the app keep running by returning an empty result
  //     return of(result as T);
  //   }
  // }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // Log info
      console.info('Error handled by Racket Service.');

      // Send error to custom error handler for rendering
      this.customError.handleError(error);

      // Let the app keep running by returning an empty result
      // return of(result as T);

      // Throw error to the component
      return throwError(() => {
        return new Error(operation + ' couldn\'t load data.');
      })
    }
  }

  getRackets(): Observable<Racket[]> {
    return this.httpClient.get<Racket[]>(this.apiUrl, this.httpOptions)
      .pipe(
        catchError(this.handleError<Racket[]>('getRackets', []))
        // catchError(() => {
        //   console.info('Error handled by Racket Service.');
        //   return throwError(() => {
        //     return new Error('Couldn\'t load data.');
        //   })
        // })
      );
  }

  getBrands(): Observable<String[]> {
    const url = `${this.apiUrl}/brands`;
    return this.httpClient.get<String[]>(url, this.httpOptions).pipe(
      catchError(this.handleError<String[]>('getBrands', []))
    );
  }

  getFilteredRackets(form: FormGroup): Observable<Racket[]> {
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
      catchError(this.handleError<Racket[]>('getRacket', []))
    );
  }

  getRacket(id: number): Observable<Racket> {
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.get<Racket>(url).pipe(
      catchError(this.handleError<Racket>(`getRacket id=${id}`))
    );
  }

  addRacket(racket: Racket): Observable<Racket> {
    return this.httpClient.post<Racket>(this.apiUrl, racket, this.httpOptions).pipe(
      tap( _ => {console.log('Im working')}),
      catchError(this.handleError<Racket>('addRacket'))
    );
  }

  updateRacket(id: number, racket: Racket): Observable<Racket> {
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.put<Racket>(url, racket, this.httpOptions).pipe(
      catchError(this.handleError<Racket>('updateRacket')),
    );
  }

  deleteRacket(id?: number): Observable<Racket> {
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.delete<Racket>(url, this.httpOptions).pipe(
      catchError(this.handleError<Racket>('deleteRacket'))
    );
  }
}
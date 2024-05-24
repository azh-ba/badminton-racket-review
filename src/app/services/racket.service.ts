import { Injectable } from '@angular/core';
import { Racket } from '../racket';

import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class RacketService {
  // private apiUrl = 'http://localhost:5000/rackets';
  // httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'})};
  apiUrl = 'https://localhost:7203/racket';
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'})
    .set('access-control-allow-origin', "https://localhost:7203/") };                    
                
  constructor(private httpClient: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send error to remote loggin infrastructure
      console.error(error);

      // Let the app keep running by returning an empty result
      return of(result as T);
    }
  }

  getRackets(): Observable<Racket[]> {
    return this.httpClient.get<Racket[]>(this.apiUrl, this.httpOptions)
      .pipe(
        catchError(this.handleError<Racket[]>('getRackets', []))
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
    // Generate sort by query string
    let sort: string = 'SortBy=' + form.value.sortBy;
    // Generate descending query string
    let descend: string = 'IsDescending=' + form.value.isDecsending;

    const url = `${this.apiUrl}?` + brand + shaft + sort + '&' + descend;
    return this.httpClient.get<Racket[]>(url).pipe(
      tap( _ => {console.log("filter search is working!")}),
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
      tap( _ => {console.log("updateRacket is working!")}),
      catchError(this.handleError<Racket>('updateRacket')),
    );
  }

  deleteRacket(id?: number): Observable<Racket> {
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.delete<Racket>(url, this.httpOptions).pipe(
      catchError(this.handleError<Racket>('deleteRacket'))
    );
  }

  getBrands(): Observable<String[]> {
    const url = `${this.apiUrl}/brands`;
    return this.httpClient.get<String[]>(url, this.httpOptions).pipe(
      catchError(this.handleError<String[]>('getBrands', []))
    );
  }

  // searchRackets(term: string): Observable<Racket[]> {
  //   if (!term.trim()) {
  //     return of([]);
  //   }
  //   return this.httpClient.get<Racket[]>(`${this.apiUrl}/?name=${term}`).pipe(
  //     catchError(this.handleError<Racket[]>('searchRackets', []))
  //   );
  // }
}
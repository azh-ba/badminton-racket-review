import { Injectable } from '@angular/core';
import { Racket } from '../racket';

import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RacketService {
  private apiUrl = 'http://localhost:5000/rackets';
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'}) };                    
                
  constructor(private httpClient: HttpClient) { }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send error to remote loggin infrastructure
      console.error(error);

      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result
      return of(result as T);
    }
  }

  getRackets(): Observable<Racket[]> {
    return this.httpClient.get<Racket[]>(this.apiUrl)
      .pipe(
        // tap(_ => this.log('fetched rackets')),
        catchError(this.handleError<Racket[]>('getRackets', []))
      );
  }

  getRacket(id: number): Observable<Racket> {
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.get<Racket>(url).pipe(
      // tap(_ => this.log(`fetched racket id=${id}`)),
      catchError(this.handleError<Racket>(`getRacket id=${id}`))
    );
  }

  addRacket(racket: Racket): Observable<Racket> {
    return this.httpClient.post<Racket>(this.apiUrl, racket, this.httpOptions).pipe(
      tap(_ => {console.log('Im working')}),
      catchError(this.handleError<Racket>('addRacket'))
    );
  }

  deleteRacket(id?: number): Observable<Racket> {
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.delete<Racket>(url, this.httpOptions).pipe(
      catchError(this.handleError<Racket>('deleteRacket'))
    );
  }
}

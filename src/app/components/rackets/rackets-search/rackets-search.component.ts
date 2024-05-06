import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { Racket } from 'src/app/racket';
import { RacketService } from 'src/app/services/racket.service';

@Component({
  selector: 'app-rackets-search',
  templateUrl: './rackets-search.component.html',
  styleUrls: ['./rackets-search.component.scss']
})
export class RacketsSearchComponent implements OnInit {
  rackets$!: Observable<Racket[]>;
  private searchTerms = new Subject<string>();

  constructor(private racketService: RacketService, private router: Router) { }

  // push a search term into the observable stream
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    // this.rackets$ = this.searchTerms.pipe(
    //   // wait 300ms after each keystroke before considering the term
    //   debounceTime(300),

    //   // ignore new term if same as previous term
    //   distinctUntilChanged(),

    //   // switch to new search observable each time the term changes
    //   switchMap((term: string) => this.racketService.searchRackets(term)),
    // );    
  }
}

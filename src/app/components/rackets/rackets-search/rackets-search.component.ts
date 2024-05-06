import { Component, OnInit } from '@angular/core';

import { Racket } from 'src/app/racket';
import { RacketService } from 'src/app/services/racket.service';

@Component({
  selector: 'app-rackets-search',
  templateUrl: './rackets-search.component.html',
  styleUrls: ['./rackets-search.component.scss']
})
export class RacketsSearchComponent implements OnInit {
  isEmptyList: boolean = true;
  racketsList: Racket[] = [];
  filteredRacketsList: Racket[] = this.racketsList;

  constructor(private racketService: RacketService) { }

  search(term: string): void {
    if (!term) {
      this.filteredRacketsList = this.racketsList;
      return;
    }

    this.isEmptyList = false;
    this.filteredRacketsList = this.racketsList.filter(
      racket => racket?.name.toLowerCase().includes(term.toLowerCase())
    );
  }

  ngOnInit(): void {
    this.racketService.getRackets()
      .subscribe((rackets: Racket[]) => this.racketsList = rackets);

    this.filteredRacketsList = this.racketsList;
  }
}

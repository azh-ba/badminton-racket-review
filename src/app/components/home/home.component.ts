import { Component, OnDestroy, OnInit } from '@angular/core';
import { tap, catchError, of, Subscription } from 'rxjs';
import { Racket } from 'src/app/racket';

import { RacketService } from 'src/app/services/racket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  // Error info
  error: Error | null = null;
  componentName: string = 'home';

  constructor(private racketService: RacketService) { }

  ngOnInit(): void {
    this.getRandomRackets();
  }

  // Get racket list
  rackets: Racket[] = [];
  getRandomRackets(): void {
    this.racketsSub = this.racketService.getRackets()
      .pipe(
        tap({error: (error) => {this.error = error}}),
        catchError(err => of([]))
      )
      .subscribe((randomRackets: Racket[]) => {
        const shuffled = randomRackets.sort(() => 0.8 - Math.random());
        this.rackets = shuffled.slice(0, 4);
      });
  }

  // Destroy
  racketsSub!: Subscription;
  ngOnDestroy(): void {
    this.racketsSub.unsubscribe();
  }
}

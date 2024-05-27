import { Component, OnInit } from '@angular/core';
import { tap, catchError, of } from 'rxjs';
import { Racket } from 'src/app/racket';

import { RacketService } from 'src/app/services/racket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  // Error info
  error: Error | null = null;
  componentName: string = 'home';

  rackets: Racket[] = [];

  constructor(private racketService: RacketService) { }

  ngOnInit(): void {
    // try {
    //   this.getRandomRackets();
    // } catch (error) {
    //   if (error instanceof Error) {
    //     this.error = error;
    //   }
    // }
    this.getRandomRackets();
  }

  getRandomRackets(): void {
    // try {
    //   this.racketService.getRackets()
    //     .subscribe((randomRackets: Racket[]) => {
    //       const shuffled = randomRackets.sort(() => 0.8 - Math.random());
    //       this.rackets = shuffled.slice(0, 4); 
    //     });
    // } catch (error) {
    //   if (error instanceof Error) {
    //     this.error = error;
    //   }
    // }
    this.racketService.getRackets()
      .pipe(
        tap({error: (error) => {this.error = error}}),
        catchError(err => of([]))
      )
      .subscribe((randomRackets: Racket[]) => {
        const shuffled = randomRackets.sort(() => 0.8 - Math.random());
        this.rackets = shuffled.slice(0, 4);
      });
  }
}

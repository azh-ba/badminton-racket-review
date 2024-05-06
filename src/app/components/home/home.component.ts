import { Component } from '@angular/core';
import { Racket } from 'src/app/racket';

import { RacketService } from 'src/app/services/racket.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  rackets?: Racket[] = [];

  constructor(private racketService: RacketService) { }

  ngOnInit(): void {
    this.getRandomRackets();
  }

  getRandomRackets(): void {
    this.racketService.getRackets()
      .subscribe((randomRackets: Racket[]) => {
        const shuffled = randomRackets.sort(() => 0.8 - Math.random());
        this.rackets = shuffled.slice(0, 4); 
      });
  }
}

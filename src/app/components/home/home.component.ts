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
    this.getRackets();
  }

  getRackets(): void {
    this.racketService.getRackets()
      .subscribe(rackets => this.rackets = rackets.slice(0, 3));
  }
}

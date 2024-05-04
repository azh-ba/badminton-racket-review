import { Component, Input } from '@angular/core';
import { Racket } from 'src/app/racket';
import { RACKETS } from 'src/app/mock-racket';

@Component({
  selector: 'app-rackets-main',
  templateUrl: './rackets-main.component.html',
  styleUrls: ['./rackets-main.component.scss']
})
export class RacketsMainComponent {
  rackets: Racket[] = RACKETS;
  @Input() selectedRacket?: Racket;

  onSelect(racket: Racket): void {
    this.selectedRacket = racket;
  }
}

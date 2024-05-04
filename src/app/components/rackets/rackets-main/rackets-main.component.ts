import { Component, Input } from '@angular/core';
import { Racket } from 'src/app/racket';
import { RacketService } from 'src/app/services/racket.service';  

@Component({
  selector: 'app-rackets-main',
  templateUrl: './rackets-main.component.html',
  styleUrls: ['./rackets-main.component.scss']
})
export class RacketsMainComponent {
  rackets: Racket[] = [];

  constructor(private racketService: RacketService) { }

  ngOnInit(): void {
    this.getRackets();
  }

  getRackets(): void {
    this.racketService.getRackets()
      .subscribe(rackets => this.rackets = rackets);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.racketService.addRacket({name} as Racket)
      .subscribe(racket => { 
        this.rackets.push(racket);
      });
  }

  delete(racket: Racket): void {
    this.rackets = this.rackets.filter(r => r !== racket);
    this.racketService.deleteRacket(racket.id).subscribe();
  }
}

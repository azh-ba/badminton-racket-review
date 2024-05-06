import { Component, Input } from '@angular/core';                                                      
import { Racket } from 'src/app/racket';
import { ActivatedRoute } from '@angular/router';                             
import { Location } from '@angular/common';

import { RacketService } from 'src/app/services/racket.service';

@Component({
  selector: 'app-rackets-detail',
  templateUrl: './rackets-detail.component.html',
  styleUrls: ['./rackets-detail.component.scss']
})
export class RacketsDetailComponent {
  @Input() racket?: Racket;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private racketService: RacketService
  ) { }

  ngOnInit(): void {
    this.getRacket();
  }

  getRacket(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.racketService.getRacket(id)
      .subscribe(racket => this.racket = racket);
  }

  goBack(): void {
    this.location.back();
  }

  delete(racket: Racket): void {
    
  }
}

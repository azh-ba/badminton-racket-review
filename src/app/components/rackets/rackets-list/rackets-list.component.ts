import { Component, Input } from '@angular/core';
import { Racket } from 'src/app/racket';

import { RacketService } from 'src/app/services/racket.service';

@Component({
  selector: 'app-rackets-list',
  templateUrl: './rackets-list.component.html',
  styleUrls: ['./rackets-list.component.scss']
})
export class RacketsListComponent {
  @Input() rackets!: Racket[];

  @Input() error?: Error | null = null;

  constructor() { }
}

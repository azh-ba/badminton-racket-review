import { Component, Input, OnInit } from '@angular/core';
import { Racket } from 'src/app/racket';

import { RacketService } from 'src/app/services/racket.service';

@Component({
  selector: 'app-rackets-list',
  templateUrl: './rackets-list.component.html',
  styleUrls: ['./rackets-list.component.scss']
})
export class RacketsListComponent implements OnInit {
  @Input() rackets!: Racket[];

  constructor(private racketService: RacketService) { }

  ngOnInit(): void { }
}

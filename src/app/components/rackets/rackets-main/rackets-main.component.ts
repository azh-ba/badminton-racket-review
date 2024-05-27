import { Component, Input } from '@angular/core';
import { Racket } from 'src/app/racket';

@Component({
  selector: 'app-rackets-main',
  templateUrl: './rackets-main.component.html',
  styleUrls: ['./rackets-main.component.scss']
})
export class RacketsMainComponent {
  @Input() racketList: Racket[] = [];

  constructor() { }
}

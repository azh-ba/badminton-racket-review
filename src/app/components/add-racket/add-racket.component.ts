import { Component } from '@angular/core';

import { Racket } from 'src/app/racket';
import { RacketService } from 'src/app/services/racket.service';

@Component({
  selector: 'app-add-racket',
  templateUrl: './add-racket.component.html',
  styleUrls: ['./add-racket.component.scss']
})
export class AddRacketComponent {
  text!: string;
  brand!: string;
  price!: number;
  length!: number;
  bp!: number;
  flex!: string;
  weight!: string;
  tension!: number;
  imgPath!: string;
  review?: string;

  constructor(private racketService: RacketService) { }

  onSubmit(): void {
    if(!this.text || !this.brand || !this.price || !this.length || !this.bp || !this.flex || !this.weight || !this.tension || !this.imgPath) {
      alert('Please fill out all the information!');
      return;
    }

    if(isNaN(this.price)) {
      alert('Price value must be a number!');
      return;
    }
    if(isNaN(this.length)) {
      alert('Length value must be a number!');
      return;
    }
    if(isNaN(this.bp)) {
      alert('Balance point value must be a number!');
      return;
    }
    if(isNaN(this.tension)) {
      alert('String tension value must be a number!');
      return;
    }
    
    if(!this.review) {
      this.review = "Haven't played with this lol.";
    }
      
    const newImgPath = '../assets/racket-img/' + this.imgPath + '.webp';

    const newRacket: Racket = {
      name: this.text,
      brand: this.brand,
      price: Number(this.price),
      length: Number(this.length),
      balancePoint: Number(this.bp),
      shaftFlex: this.flex,
      weight: this.weight,
      tension: Number(this.tension),
      imgPath: newImgPath,
      review: this.review
    }

    this.racketService.addRacket(newRacket).subscribe();

    alert('Successfully added!')

    this.text = '';
    this.brand = '';
    this.price = 0;
    this.length = 0;
    this.bp = 0;
    this.flex = '';
    this.weight = '';
    this.tension = 0;
    this.imgPath = '';
    this.review = '';
  }
}

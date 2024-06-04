import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Racket } from 'src/app/racket';

import { RacketService } from 'src/app/services/racket.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tap, of, catchError } from 'rxjs';

@Component({
  selector: 'app-add-racket',
  templateUrl: './add-racket.component.html',
  styleUrls: ['./add-racket.component.scss']
})
export class AddRacketComponent implements OnInit {
  // Error Info
  error: Error | null = null;
  componentName: string = 'add-racket';

  racketForm!: FormGroup;

  constructor(
    private racketService: RacketService,
    private snackbar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.racketForm = new FormGroup({
      name: new FormControl('', Validators.required),
      brand: new FormControl('', Validators.required),
      price: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*[.][0-9]+$")]),
      length: new FormControl('', [Validators.required, Validators.pattern("^[0-9]+$")]),
      balancePoint: new FormControl('', [Validators.required, Validators.pattern("^[0-9]+$")]),
      shaftFlex: new FormControl('', Validators.required),
      weight: new FormControl('', Validators.required),
      tension: new FormControl('', [Validators.required, Validators.pattern("^[0-9]+$")]),
      imgPath: new FormControl('', Validators.required),
      review: new FormControl('Haven\'t try this one lol.', {nonNullable: true, validators: Validators.required}),
    });
  }

  get name() {
    return this.racketForm.get('name');
  }
  get brand() {
    return this.racketForm.get('brand');
  }
  get price() {
    return this.racketForm.get('price');
  }
  get length() {
    return this.racketForm.get('length');
  }
  get balancePoint() {
    return this.racketForm.get('balancePoint');
  }
  get shaftFlex() {
    return this.racketForm.get('shaftFlex');
  }
  get weight() {
    return this.racketForm.get('weight');
  }
  get tension() {
    return this.racketForm.get('tension');
  }
  get imgPath() {
    return this.racketForm.get('imgPath');
  }
  get review() {
    return this.racketForm.get('review');
  }

  onSubmit(): void {
      if (this.racketForm.valid) {
        let racket: Racket = {
          name: this.racketForm.value.name,
          brand: this.racketForm.value.brand,
          price: Number(this.racketForm.value.price),
          length: Number(this.racketForm.value.length),
          balancePoint: Number(this.racketForm.value.balancePoint),
          shaftFlex: this.racketForm.value.shaftFlex,
          weight: this.racketForm.value.weight,
          tension: Number(this.racketForm.value.tension),
          imgPath: this.racketForm.value.imgPath,
          review: this.racketForm.value.review,
        };

        console.log(racket);

        this.addRacket(racket);

        this.racketForm.reset();

        alert('Changes applied successfully!');
      }
  }

  addRacket(racket: Racket): void {
    this.racketService.addRacket(racket)
    .pipe(
      tap({error: (error) => {this.error = error}}),
      catchError(err => of([]))
    )
    .subscribe();
    // callbackSuccess();
  }

  // success(): void {
  //   this.snackbar.open(
  //     'Successfully added!',
  //     'Close',
  //     {
  //       duration: 5000,
  //     }
  //   );
  //   this.racketForm.reset();
  // }
}
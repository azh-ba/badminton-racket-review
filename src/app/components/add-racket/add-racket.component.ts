import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-racket',
  templateUrl: './add-racket.component.html',
  styleUrls: ['./add-racket.component.scss']
})
export class AddRacketComponent implements OnInit {
  racketForm!: FormGroup;

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
      review: new FormControl('Haven\'t try this one lol.', Validators.required),
    });
  }

  onSubmit(): void {
    if (this.racketForm.valid) {
      console.log(this.racketForm.value);
    }
  }
}
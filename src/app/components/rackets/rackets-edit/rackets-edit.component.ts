import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Racket } from 'src/app/racket';
import { Location } from '@angular/common';

@Component({
  selector: 'app-rackets-edit',
  templateUrl: './rackets-edit.component.html',
  styleUrls: ['./rackets-edit.component.scss']
})
export class RacketsEditComponent implements OnInit {
  error: Error | null = null;
  componentName: string = 'rackets-edit';

  @Input() racketEdit!: Racket;

  @Output() saveClick: EventEmitter<Racket> = new EventEmitter();

  racketForm!: FormGroup;

  constructor(private location: Location) { }

  ngOnInit(): void {
    this.racketForm = new FormGroup({
      name: new FormControl(this.racketEdit.name, Validators.required),
      brand: new FormControl(this.racketEdit.brand, Validators.required),
      price: new FormControl(this.racketEdit.price, [Validators.required, Validators.pattern("^[0-9]*[.][0-9]+$")]),
      length: new FormControl(this.racketEdit.length, [Validators.required, Validators.pattern("^[0-9]+$")]),
      balancePoint: new FormControl(this.racketEdit.balancePoint, [Validators.required, Validators.pattern("^[0-9]+$")]),
      shaftFlex: new FormControl(this.racketEdit.shaftFlex, Validators.required),
      weight: new FormControl(this.racketEdit.weight, Validators.required),
      tension: new FormControl(this.racketEdit.tension, [Validators.required, Validators.pattern("^[0-9]+$")]),
      imgPath: new FormControl(this.racketEdit.imgPath, Validators.required),
      review: new FormControl(this.racketEdit.review, {nonNullable: true, validators: Validators.required}),
    });
  }

  onSave(): void {
    try {
      let editRacket: Racket = {
        name: this.racketForm.value.name,
        brand: this.racketForm.value.brand,
        price: this.racketForm.value.price,
        length: this.racketForm.value.length,
        balancePoint: this.racketForm.value.balancePoint,
        shaftFlex: this.racketForm.value.shaftFlex,
        weight: this.racketForm.value.weight,
        tension: this.racketForm.value.tension,
        imgPath: this.racketForm.value.imgPath,
        review: this.racketForm.value.review
      };
  
      this.saveClick.emit(editRacket);
    } catch (error) {
      if (error instanceof Error) {
        this.error = error;
      }
    }
  }
}

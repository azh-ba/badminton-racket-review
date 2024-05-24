import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

import { RacketService } from 'src/app/services/racket.service';
import { Racket } from 'src/app/racket';

@Component({
  selector: 'app-rackets-search',
  templateUrl: './rackets-search.component.html',
  styleUrls: ['./rackets-search.component.scss']
})
export class RacketsSearchComponent implements OnInit {

  constructor(private racketService: RacketService) { }

  // Get a full list of rackets
  ngOnInit(): void {
    this.getFullRackets();
    
    this.getBrands();
  }

  getFullRackets(): void {
    this.racketService.getRackets()
      .subscribe(rackets => this.filterRackets = rackets);
  }
  
  // Form for submit to API
  filterForm!: FormGroup;

  // Get brand list from API for rendering
  brandsList: String[] = [];

  getBrands(): void {
    this.racketService.getBrands()
      .subscribe((b: String[]) => this.brandsList = b);
  }

  // Display advance options
  isAdvance: boolean = false;
  advanceButton: string = "Sort";

  advance(): void {
    this.isAdvance = !this.isAdvance;
    this.advanceButton = this.isAdvance ? "Cancel" : "Sort";

    this.filterForm = new FormGroup({
      brand: new FormArray([]),
      shaftFlex: new FormArray([]),
      sortBy: new FormControl(''),
      isDecsending: new FormControl(false),
    });
  }

  // Brand checkbox
  onCheckBrand(event: any): void {
    const brand: FormArray = this.filterForm.get('brand') as FormArray;

    if (event.target.checked) {
      brand.push(new FormControl(event.target.value));
    } else {
      const index = brand.controls.findIndex(b => b === event.target.value);
      brand.removeAt(index);
    }
  }

  // Shaft Flex checkbox
  shaftFlexList = [
    {shaftId: 1, shaftAttr: "Extra Flex"},
    {shaftId: 2, shaftAttr: "Flex"},
    {shaftId: 3, shaftAttr: "Medium"},
    {shaftId: 4, shaftAttr: "Stiff"},
    {shaftId: 5, shaftAttr: "Extra Stiff"},
  ];

  onCheckShaft(event: any): void {
    const shaftFlex: FormArray = this.filterForm.get('shaftFlex') as FormArray;

    if (event.target.checked) {
      shaftFlex.push(new FormControl(event.target.value));
    } else {
      const index = shaftFlex.controls.findIndex(s => s === event.target.value);
      shaftFlex.removeAt(index);
    }
  }

  // Sort By radio
  sortByList = [
    {sortId: 0, sortAttr: "None"},
    {sortId: 6, sortAttr: "Price"},
    {sortId: 7, sortAttr: "Length"},
    {sortId: 8, sortAttr: "Balance Point"},
    {sortId: 9, sortAttr: "String Tension"},
  ];

  onRadioSort(event: any): void {
    const sortBy: FormControl = this.filterForm.get('sortBy') as FormControl;

    if (event.target.checked) {
      if (event.target.value !== "None") {
        sortBy.setValue(event.target.value);
      } else {
        sortBy.setValue('');
      }
    }
  }

  // Decsend option
  descendListen: boolean = false;
  onCheckDescend(event: any): void {
    this.descendListen = !this.descendListen;
  }

  // Submit filter options to API
  @Output() toRacketMain: EventEmitter<Racket[]> = new EventEmitter();
  filterRackets: Racket[] = [];
  onSubmit(): void {
    this.getFilteredRackets();
  }

  getFilteredRackets(): void {
    this.racketService.getFilteredRackets(this.filterForm).subscribe({
      next: (rackets) => {
        this.filterRackets = rackets;
        this.toRacketMain.emit(this.filterRackets);
        console.log(this.filterRackets);
      }
    });
  }
}

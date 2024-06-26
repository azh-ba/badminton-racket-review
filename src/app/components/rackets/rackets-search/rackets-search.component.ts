import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

import { tap, catchError, of, debounce, debounceTime, distinctUntilChanged } from 'rxjs';

import { RacketService } from 'src/app/services/racket.service';
import { Racket } from 'src/app/racket';

@Component({
  selector: 'app-rackets-search',
  templateUrl: './rackets-search.component.html',
  styleUrls: ['./rackets-search.component.scss']
})
export class RacketsSearchComponent implements OnInit {

  constructor(private racketService: RacketService) { }
  // Error info
  error: Error | null = null;
  componentName: string = 'racket-seach';

  // Get a full list of rackets
  ngOnInit(): void {
    this.getFullRackets();
  
    this.getBrands();
  }

  getFullRackets(): void {
    this.racketService.getRackets()
      .pipe(
        tap({error: (error) => {this.error = error}}),
        catchError(err => of([]))
      )
      .subscribe(rackets => this.filterRackets = rackets);
  }
  
  // Form for submit to API
  filterForm!: FormGroup;

  // Get brand list from API for rendering
  brandsList: String[] = [];

  getBrands(): void {
    this.racketService.getBrands()
      .pipe(
        tap({error: (error) => {this.error = error}}),
        catchError(err => of([]))
      )
      .subscribe((b: String[]) => this.brandsList = b);
  }

  // Name search
  nameSearch: string = '';
  search(): void {
    // Search without filter
    if (!this.isAdvance) {
      this.racketService.getRackets()
        .pipe(
          tap({error: (error) => {this.error = error}}),
          catchError(err => of([]))
        )
        .subscribe((r: Racket[]) => 
          this.filterRackets = r.filter(n => n.name.toLowerCase().includes(this.nameSearch.toLowerCase()))
        );
    }
    // Search with filter --> getFilteredRackets()
  }

  // Display advance options
  isAdvance: boolean = false;
  advanceButton: string = "Sort";
  advanceName: string = 'Advance';

  advance(): void {
    try {
      this.isAdvance = !this.isAdvance;
      this.advanceButton = this.isAdvance ? "Cancel" : "Sort";
      this.advanceName = this.isAdvance ? 'Close' : 'Advance';
    } catch (error) {
      if (error instanceof Error) {
        this.error = error;
      }
    }

    this.filterForm = new FormGroup({
      brand: new FormArray([]),
      shaftFlex: new FormArray([]),
      sortBy: new FormControl('None'),
      isDescending: new FormControl(true),
    });
  }

  // Brand checkbox
  onCheckBrand(event: any): void {
    try {
      const brand: FormArray = this.filterForm.get('brand') as FormArray;
  
      if (event.target.checked) {
        brand.push(new FormControl(event.target.value));
      } else {
        const index = brand.controls.findIndex(b => b === event.target.value);
        brand.removeAt(index);
      }
    } catch (error) {
      if (error instanceof Error) {
        this.error = error;
      }
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
    try {
      const shaftFlex: FormArray = this.filterForm.get('shaftFlex') as FormArray;
  
      if (event.target.checked) {
        shaftFlex.push(new FormControl(event.target.value));
      } else {
        const index = shaftFlex.controls.findIndex(s => s === event.target.value);
        shaftFlex.removeAt(index);
      }
    } catch (error) {
      if (error instanceof Error) {
        this.error = error;
      }
    }
  }

  // Sort By radio
  sortByList = [
    {sortId: 0, sortVal: "None", sortAttr: "None"},
    {sortId: 6, sortVal: "Price", sortAttr: "Price"},
    {sortId: 7, sortVal: "Length", sortAttr: "Length"},
    {sortId: 8, sortVal: "BalancePoint", sortAttr: "Balance Point"},
    {sortId: 9, sortVal: "Tension", sortAttr: "String Tension"},
  ];

  onRadioSort(event: any): void {
    try {
      const sortBy: FormControl = this.filterForm.get('sortBy') as FormControl;
  
      if (event.target.checked) {
        if (event.target.value !== "None") {
          sortBy.setValue(event.target.value);
        } else {
          sortBy.setValue('None');
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        this.error = error;
      }
    }
  }

  // Descend option
  onCheckDescend(event: any): void {
    try {
      const isDescending: FormControl = this.filterForm.get('isDescending') as FormControl;
  
      if (event.target.checked) {
        isDescending.setValue(true);
      } else {
        isDescending.setValue(false);
      }
    } catch (error) {
      if (error instanceof Error) {
        this.error = error;
      }
    }
  }

  sortIsNone(): boolean {
    return this.filterForm.getRawValue().sortBy === 'None';
  }

  // Submit filter options to API
  @Output() toRacketMain: EventEmitter<Racket[]> = new EventEmitter();
  filterRackets: Racket[] = [];
  onSubmit(): void {
      this.getFilteredRackets();
  }

  getFilteredRackets(): void {
    this.racketService.getFilteredRackets(this.filterForm)
      .pipe(
        tap({error: (error) => {this.error = error}}),
        catchError(err => of([]))
      )
      .subscribe({
        next: (rackets) => {
          if (this.isAdvance) {
            this.filterRackets = rackets.filter(n => 
              n.name.toLowerCase().includes(
                this.nameSearch.toLowerCase())
            );
          } else {
            this.filterRackets = rackets;
          }
          this.toRacketMain.emit(this.filterRackets);
        }
    });
  }
}

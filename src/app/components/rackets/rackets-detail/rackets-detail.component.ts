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
  error: Error | null = null;
  componentName: string = 'rackets-detail';

  rackets: Racket[] = [];
  isEdit: boolean = false;
  editType: string = "Edit";

  @Input() racket?: Racket;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private racketService: RacketService
  ) { }

  ngOnInit(): void {
    try {
      this.getRacket();
      this.getRackets();
    } catch (error) {
      if (error instanceof Error) {
        this.error = error;
      }
    }
  }

  getRackets(): void {
    try {
      this.racketService.getRackets()
        .subscribe((rackets: Racket[]) => this.rackets = rackets);
    } catch (error) {
      if (error instanceof Error) {
        this.error = error;
      }
    }
  }

  getRacket(): void {
    try {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      this.racketService.getRacket(id)
        .subscribe(racket => this.racket = racket);
    } catch (error) {
      if (error instanceof Error) {
        this.error = error;
      }
    }
  }

  goBack(): void {
    try {
      this.location.back();
    } catch (error) {
      if (error instanceof Error) {
        this.error = error;
      }
    }
  }

  delete(racket: Racket): void {
    try {
      this.rackets = this.rackets.filter(r => r !== racket);
      this.racketService.deleteRacket(racket.id).subscribe();
      alert("Delete Successfully!");
      this.goBack();
    } catch (error) {
      if (error instanceof Error) {
        this.error = error;
      }
    }
  }

  edit(): void {
    try {
      this.isEdit = !this.isEdit;
      this.editType = this.isEdit ? "Cancel" : "Edit";
    } catch (error) {
      if (error instanceof Error) {
        this.error = error;
      }
    }
  }

  save(racket: Racket): void {
    try {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      this.racketService.updateRacket(id, racket).subscribe();
      alert('Changes applied successfully!');
      this.location.back();
    } catch (error) {
      if (error instanceof Error) {
        this.error = error;
      }
    }
  }
}

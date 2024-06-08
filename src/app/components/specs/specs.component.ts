import { Component } from '@angular/core';
import { tap, catchError, of } from 'rxjs';
import { RacketService } from 'src/app/services/racket.service';

@Component({
  selector: 'app-specs',
  templateUrl: './specs.component.html',
  styleUrls: ['./specs.component.scss']
})
export class SpecsComponent {
  // Error
  error: Error|null = null;

  fileName: string = '';
  formData: FormData = new FormData();

  fileCheck: boolean = false;

  constructor(private racketService: RacketService) { }

  onSubmit(): void {
    if (this.fileCheck) {
      this.racketService.uploadImage(this.formData)
      .pipe(
        tap({error: (error) => {this.error = error}}),
        catchError(err => of([]))
      )
      .subscribe();

      console.log('Image uploaded!');

      this.formData.delete;
    }
  }

  onImageChange(event: any): void {
    const file: File = event.target.files[0];

    if (file) {
      this.fileCheck = true;

      this.fileName = file.name;

      this.formData.append(file.name, file);
      
      console.log(file);
    }
  }
}

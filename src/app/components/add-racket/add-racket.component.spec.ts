import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRacketComponent } from './add-racket.component';

describe('AddRacketComponent', () => {
  let component: AddRacketComponent;
  let fixture: ComponentFixture<AddRacketComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddRacketComponent]
    });
    fixture = TestBed.createComponent(AddRacketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

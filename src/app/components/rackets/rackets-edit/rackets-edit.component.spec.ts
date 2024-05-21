import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RacketsEditComponent } from './rackets-edit.component';

describe('RacketsEditComponent', () => {
  let component: RacketsEditComponent;
  let fixture: ComponentFixture<RacketsEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RacketsEditComponent]
    });
    fixture = TestBed.createComponent(RacketsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RacketsListComponent } from './rackets-list.component';

describe('RacketsListComponent', () => {
  let component: RacketsListComponent;
  let fixture: ComponentFixture<RacketsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RacketsListComponent]
    });
    fixture = TestBed.createComponent(RacketsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

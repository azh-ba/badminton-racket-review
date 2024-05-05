import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RacketsSearchComponent } from './rackets-search.component';

describe('RacketsSearchComponent', () => {
  let component: RacketsSearchComponent;
  let fixture: ComponentFixture<RacketsSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RacketsSearchComponent]
    });
    fixture = TestBed.createComponent(RacketsSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

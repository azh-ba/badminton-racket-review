import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RacketsDetailComponent } from './rackets-detail.component';

describe('RacketsDetailComponent', () => {
  let component: RacketsDetailComponent;
  let fixture: ComponentFixture<RacketsDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RacketsDetailComponent]
    });
    fixture = TestBed.createComponent(RacketsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

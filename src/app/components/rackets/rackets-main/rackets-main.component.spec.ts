import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RacketsMainComponent } from './rackets-main.component';

describe('RacketsMainComponent', () => {
  let component: RacketsMainComponent;
  let fixture: ComponentFixture<RacketsMainComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RacketsMainComponent]
    });
    fixture = TestBed.createComponent(RacketsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

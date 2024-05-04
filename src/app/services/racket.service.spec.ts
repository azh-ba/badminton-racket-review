import { TestBed } from '@angular/core/testing';

import { RacketService } from './racket.service';

describe('RacketService', () => {
  let service: RacketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RacketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

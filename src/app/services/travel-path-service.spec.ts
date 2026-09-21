import { TestBed } from '@angular/core/testing';

import { TravelPathService } from './travel-path-service';

describe('TravelPathService', () => {
  let service: TravelPathService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TravelPathService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

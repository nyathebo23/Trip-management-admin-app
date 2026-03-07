import { TestBed } from '@angular/core/testing';

import { TravelTicketService } from './travel-ticket-service';

describe('TravelTicketService', () => {
  let service: TravelTicketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TravelTicketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

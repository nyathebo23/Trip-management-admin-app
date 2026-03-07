import { TestBed } from '@angular/core/testing';

import { TicketRefundService } from './ticket-refund-service';

describe('TicketRefundService', () => {
  let service: TicketRefundService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TicketRefundService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

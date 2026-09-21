import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketRefundOperations } from './ticket-refund-operations';

describe('TicketRefundOperations', () => {
  let component: TicketRefundOperations;
  let fixture: ComponentFixture<TicketRefundOperations>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketRefundOperations]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketRefundOperations);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

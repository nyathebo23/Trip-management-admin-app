import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketRefundManagement } from './ticket-refund-management';

describe('TicketRefundManagement', () => {
  let component: TicketRefundManagement;
  let fixture: ComponentFixture<TicketRefundManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketRefundManagement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketRefundManagement);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

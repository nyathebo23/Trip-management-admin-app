import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketRefundForm } from './ticket-refund-form';

describe('TicketRefundForm', () => {
  let component: TicketRefundForm;
  let fixture: ComponentFixture<TicketRefundForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketRefundForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketRefundForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

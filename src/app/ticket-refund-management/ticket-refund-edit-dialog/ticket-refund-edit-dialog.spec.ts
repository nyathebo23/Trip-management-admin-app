import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketRefundEditDialog } from './ticket-refund-edit-dialog';

describe('TicketRefundEditDialog', () => {
  let component: TicketRefundEditDialog;
  let fixture: ComponentFixture<TicketRefundEditDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketRefundEditDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketRefundEditDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

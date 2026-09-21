import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketRefundTableList } from './ticket-refund-table-list';

describe('TicketRefundTableList', () => {
  let component: TicketRefundTableList;
  let fixture: ComponentFixture<TicketRefundTableList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketRefundTableList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketRefundTableList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

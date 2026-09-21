import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketOperations } from './ticket-operations';

describe('TicketOperations', () => {
  let component: TicketOperations;
  let fixture: ComponentFixture<TicketOperations>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketOperations]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketOperations);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

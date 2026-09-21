import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelTicketManagement } from './travel-ticket-management';

describe('TravelTicketManagement', () => {
  let component: TravelTicketManagement;
  let fixture: ComponentFixture<TravelTicketManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TravelTicketManagement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TravelTicketManagement);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelTicketForm } from './travel-ticket-form';

describe('TravelTicketForm', () => {
  let component: TravelTicketForm;
  let fixture: ComponentFixture<TravelTicketForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TravelTicketForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TravelTicketForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

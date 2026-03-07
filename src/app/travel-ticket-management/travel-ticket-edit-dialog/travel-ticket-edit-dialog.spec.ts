import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelTicketEditDialog } from './travel-ticket-edit-dialog';

describe('TravelTicketEditDialog', () => {
  let component: TravelTicketEditDialog;
  let fixture: ComponentFixture<TravelTicketEditDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TravelTicketEditDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TravelTicketEditDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

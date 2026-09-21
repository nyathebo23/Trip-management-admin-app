import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelTicketTableList } from './travel-ticket-table-list';

describe('TravelTicketTableList', () => {
  let component: TravelTicketTableList;
  let fixture: ComponentFixture<TravelTicketTableList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TravelTicketTableList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TravelTicketTableList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

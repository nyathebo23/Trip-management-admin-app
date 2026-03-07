import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerTableList } from './customer-table-list';

describe('CustomerTableList', () => {
  let component: CustomerTableList;
  let fixture: ComponentFixture<CustomerTableList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerTableList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerTableList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentMethodTableList } from './payment-method-table-list';

describe('PaymentMethodTableList', () => {
  let component: PaymentMethodTableList;
  let fixture: ComponentFixture<PaymentMethodTableList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentMethodTableList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentMethodTableList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

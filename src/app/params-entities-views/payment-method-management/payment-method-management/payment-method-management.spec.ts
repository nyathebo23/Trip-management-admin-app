import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentMethodManagement } from './payment-method-management';

describe('PaymentMethodManagement', () => {
  let component: PaymentMethodManagement;
  let fixture: ComponentFixture<PaymentMethodManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentMethodManagement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentMethodManagement);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

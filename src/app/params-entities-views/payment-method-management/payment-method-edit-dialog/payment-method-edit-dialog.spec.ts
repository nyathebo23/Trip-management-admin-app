import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentMethodEditDialog } from './payment-method-edit-dialog';

describe('PaymentMethodEditDialog', () => {
  let component: PaymentMethodEditDialog;
  let fixture: ComponentFixture<PaymentMethodEditDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentMethodEditDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentMethodEditDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

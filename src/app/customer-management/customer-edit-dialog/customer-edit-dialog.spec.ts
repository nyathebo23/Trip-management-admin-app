import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerEditDialog } from './customer-edit-dialog';

describe('CustomerEditDialog', () => {
  let component: CustomerEditDialog;
  let fixture: ComponentFixture<CustomerEditDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerEditDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomerEditDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

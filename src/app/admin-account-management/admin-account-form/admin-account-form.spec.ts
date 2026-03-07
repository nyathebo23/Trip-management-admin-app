import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAccountForm } from './admin-account-form';

describe('AdminAccountForm', () => {
  let component: AdminAccountForm;
  let fixture: ComponentFixture<AdminAccountForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAccountForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAccountForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

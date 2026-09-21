import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAccountEditDialog } from './admin-account-edit-dialog';

describe('AdminAccountEditDialog', () => {
  let component: AdminAccountEditDialog;
  let fixture: ComponentFixture<AdminAccountEditDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAccountEditDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAccountEditDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

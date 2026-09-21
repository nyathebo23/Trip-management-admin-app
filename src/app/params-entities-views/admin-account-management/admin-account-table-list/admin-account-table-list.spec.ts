import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAccountTableList } from './admin-account-table-list';

describe('AdminAccountTableList', () => {
  let component: AdminAccountTableList;
  let fixture: ComponentFixture<AdminAccountTableList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAccountTableList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAccountTableList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

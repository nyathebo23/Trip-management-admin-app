import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyTableList } from './agency-table-list';

describe('AgencyTableList', () => {
  let component: AgencyTableList;
  let fixture: ComponentFixture<AgencyTableList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgencyTableList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgencyTableList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

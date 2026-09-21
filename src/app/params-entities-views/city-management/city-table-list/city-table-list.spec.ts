import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CityTableList } from './city-table-list';

describe('CityTableList', () => {
  let component: CityTableList;
  let fixture: ComponentFixture<CityTableList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CityTableList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CityTableList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

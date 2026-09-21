import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelPathTableList } from './travel-path-table-list';

describe('TravelPathTableList', () => {
  let component: TravelPathTableList;
  let fixture: ComponentFixture<TravelPathTableList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TravelPathTableList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TravelPathTableList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

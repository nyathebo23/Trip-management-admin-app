import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusTableList } from './bus-table-list';

describe('BusTableList', () => {
  let component: BusTableList;
  let fixture: ComponentFixture<BusTableList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusTableList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusTableList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

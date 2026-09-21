import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusDriverTableList } from './bus-driver-table-list';

describe('BusDriverTableList', () => {
  let component: BusDriverTableList;
  let fixture: ComponentFixture<BusDriverTableList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusDriverTableList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusDriverTableList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

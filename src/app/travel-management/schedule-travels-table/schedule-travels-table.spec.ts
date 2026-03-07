import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleTravelsTable } from './schedule-travels-table';

describe('ScheduleTravelsTable', () => {
  let component: ScheduleTravelsTable;
  let fixture: ComponentFixture<ScheduleTravelsTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScheduleTravelsTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduleTravelsTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

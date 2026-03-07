import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelCreateByBatch } from './travel-create-by-batch';

describe('TravelCreateByBatch', () => {
  let component: TravelCreateByBatch;
  let fixture: ComponentFixture<TravelCreateByBatch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TravelCreateByBatch]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TravelCreateByBatch);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

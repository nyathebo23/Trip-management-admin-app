import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelOperations } from './travel-operations';

describe('TravelOperations', () => {
  let component: TravelOperations;
  let fixture: ComponentFixture<TravelOperations>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TravelOperations]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TravelOperations);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

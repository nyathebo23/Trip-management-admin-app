import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelPathManagement } from './travel-path-management';

describe('TravelPathManagement', () => {
  let component: TravelPathManagement;
  let fixture: ComponentFixture<TravelPathManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TravelPathManagement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TravelPathManagement);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

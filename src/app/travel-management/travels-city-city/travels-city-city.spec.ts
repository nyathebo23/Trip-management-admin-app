import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelsCityCity } from './travels-city-city';

describe('TravelsCityCity', () => {
  let component: TravelsCityCity;
  let fixture: ComponentFixture<TravelsCityCity>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TravelsCityCity]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TravelsCityCity);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

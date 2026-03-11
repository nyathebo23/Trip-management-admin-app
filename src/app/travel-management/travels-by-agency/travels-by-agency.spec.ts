import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelsByAgency } from './travels-by-agency';

describe('TravelsByAgency', () => {
  let component: TravelsByAgency;
  let fixture: ComponentFixture<TravelsByAgency>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TravelsByAgency]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TravelsByAgency);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelsDepartAgency } from './travels-depart-agency';

describe('TravelsDepartAgency', () => {
  let component: TravelsDepartAgency;
  let fixture: ComponentFixture<TravelsDepartAgency>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TravelsDepartAgency]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TravelsDepartAgency);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

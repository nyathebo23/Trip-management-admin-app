import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelPathForm } from './travel-path-form';

describe('TravelPathForm', () => {
  let component: TravelPathForm;
  let fixture: ComponentFixture<TravelPathForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TravelPathForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TravelPathForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

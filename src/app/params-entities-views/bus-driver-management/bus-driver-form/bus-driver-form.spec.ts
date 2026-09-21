import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusDriverForm } from './bus-driver-form';

describe('BusDriverForm', () => {
  let component: BusDriverForm;
  let fixture: ComponentFixture<BusDriverForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusDriverForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusDriverForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

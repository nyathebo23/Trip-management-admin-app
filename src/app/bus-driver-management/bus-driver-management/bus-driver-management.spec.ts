import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusDriverManagement } from './bus-driver-management';

describe('BusDriverManagement', () => {
  let component: BusDriverManagement;
  let fixture: ComponentFixture<BusDriverManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusDriverManagement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusDriverManagement);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

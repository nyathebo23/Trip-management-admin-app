import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleTravelsPage } from './schedule-travels-page';

describe('ScheduleTravelsPage', () => {
  let component: ScheduleTravelsPage;
  let fixture: ComponentFixture<ScheduleTravelsPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScheduleTravelsPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScheduleTravelsPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

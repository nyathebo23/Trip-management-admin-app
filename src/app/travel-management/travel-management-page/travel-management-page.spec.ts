import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelManagementPage } from './travel-management-page';

describe('TravelManagementPage', () => {
  let component: TravelManagementPage;
  let fixture: ComponentFixture<TravelManagementPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TravelManagementPage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TravelManagementPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

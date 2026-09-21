import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelPathEditDialog } from './travel-path-edit-dialog';

describe('TravelPathEditDialog', () => {
  let component: TravelPathEditDialog;
  let fixture: ComponentFixture<TravelPathEditDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TravelPathEditDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TravelPathEditDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

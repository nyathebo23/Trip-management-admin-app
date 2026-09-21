import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelEditDialog } from './travel-edit-dialog';

describe('TravelEditDialog', () => {
  let component: TravelEditDialog;
  let fixture: ComponentFixture<TravelEditDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TravelEditDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TravelEditDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

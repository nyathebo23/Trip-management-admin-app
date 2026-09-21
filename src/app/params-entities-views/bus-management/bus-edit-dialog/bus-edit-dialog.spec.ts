import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusEditDialog } from './bus-edit-dialog';

describe('BusEditDialog', () => {
  let component: BusEditDialog;
  let fixture: ComponentFixture<BusEditDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusEditDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusEditDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

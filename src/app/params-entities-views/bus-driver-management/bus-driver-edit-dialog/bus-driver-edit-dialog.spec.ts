import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusDriverEditDialog } from './bus-driver-edit-dialog';

describe('BusDriverEditDialog', () => {
  let component: BusDriverEditDialog;
  let fixture: ComponentFixture<BusDriverEditDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BusDriverEditDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BusDriverEditDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyEditDialog } from './agency-edit-dialog';

describe('AgencyEditDialog', () => {
  let component: AgencyEditDialog;
  let fixture: ComponentFixture<AgencyEditDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgencyEditDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgencyEditDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

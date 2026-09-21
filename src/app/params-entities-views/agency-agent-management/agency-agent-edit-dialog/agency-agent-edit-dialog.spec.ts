import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyAgentEditDialog } from './agency-agent-edit-dialog';

describe('AgencyAgentEditDialog', () => {
  let component: AgencyAgentEditDialog;
  let fixture: ComponentFixture<AgencyAgentEditDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgencyAgentEditDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgencyAgentEditDialog);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

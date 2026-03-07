import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyAgentManagement } from './agency-agent-management';

describe('AgencyAgentManagement', () => {
  let component: AgencyAgentManagement;
  let fixture: ComponentFixture<AgencyAgentManagement>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgencyAgentManagement]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgencyAgentManagement);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

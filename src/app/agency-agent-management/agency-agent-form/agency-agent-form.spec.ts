import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyAgentForm } from './agency-agent-form';

describe('AgencyAgentForm', () => {
  let component: AgencyAgentForm;
  let fixture: ComponentFixture<AgencyAgentForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgencyAgentForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgencyAgentForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgencyAgentTableList } from './agency-agent-table-list';

describe('AgencyAgentTableList', () => {
  let component: AgencyAgentTableList;
  let fixture: ComponentFixture<AgencyAgentTableList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgencyAgentTableList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgencyAgentTableList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

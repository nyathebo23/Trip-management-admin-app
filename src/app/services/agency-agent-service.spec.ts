import { TestBed } from '@angular/core/testing';

import { AgencyAgentService } from './agency-agent-service';

describe('AgencyAgentService', () => {
  let service: AgencyAgentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AgencyAgentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

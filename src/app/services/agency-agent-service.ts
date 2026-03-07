import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { agencyAgentReqUrl } from '../utils/urls';
import { AgencyAgentUpdateData } from '../agency-agent-management/interfaces/agency-agent-update-data';
import { IAgencyAgent } from '../agency-agent-management/interfaces/iagency-agent';

@Injectable({
providedIn: 'root',
})
export class AgencyAgentService {
    private httpClient = inject(HttpClient);

    save(data: AgencyAgentData): Observable<IAgencyAgent> {
        return this.httpClient.post<IAgencyAgent>(agencyAgentReqUrl, data)
    }

    update(id: string, data: AgencyAgentUpdateData): Observable<IAgencyAgent> {
        return this.httpClient.put<IAgencyAgent>(agencyAgentReqUrl + id, data);
    }

    delete(id: string): Observable<any> {
        return this.httpClient.delete(agencyAgentReqUrl + id);
    }

    getAllByAgency(agencyId: string): Observable<IAgencyAgent[]> {
        return this.httpClient.get<IAgencyAgent[]>(agencyAgentReqUrl + 'agency/' + agencyId)
    }

    getAll(): Observable<IAgencyAgent[]> {
        return this.httpClient.get<IAgencyAgent[]>(agencyAgentReqUrl)
    }
}
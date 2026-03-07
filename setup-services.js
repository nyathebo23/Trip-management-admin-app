const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function run(cmd) {
  console.log(`\n▶ ${cmd}`);
  execSync(cmd, { stdio: 'inherit' });
}

let models = ['PaymentMethod', 'Agency', 'Bus', 'AgencyAgent', 'AdminAccount', 'Customer', 'BusDriver',  
     'TravelTicket', 'TicketRefund' ];
let names = ['payment-method', 'agency', 'bus', 'agency-agent', 'admin-account', 'customer', 'bus-driver',
    'travel-ticket', 'ticket-refund'];
let urls = ['paymentMethodReqUrl', 'agencyReqUrl', 'busReqUrl', 'agencyAgentReqUrl', 'adminAccountReqUrl', 'customerReqUrl', 'busDriverReqUrl',
     'travelTicketReqUrl', 'refundReqUrl'];
const userField = `firstname: string,
    lastname: string,
    username: string,
    password: string,
`;

let dataInterfaces = [
    `interface PaymentMethodData {
        name: string
    }`, 
    `interface AgencyData {
        locationDesc: string,
        quarter: string,
        city: string,
    }`, 
    `interface BusData {
        serialNumber: string,
        brand: string,
        capacity: number
    }`, 
    `interface AgencyAgentData {
        ${userField}
        agencyId: string,
        role: string
    }`, 
    `interface AdminAccountData {
        ${userField}
    }`,
    `interface Customer {
        ${userField}
        phoneNumber: string,
        dateBirth: string
    }`,
    `interface BusDriver {
        ${userField}
    }`,

    `interface TravelTicketData {
        ticketType: string,
        paid: number,
        paymentMethodId: string,
        customerId: string,
        travelId: string
    }`,
    `interface TicketRefundData {
        ticketId: string,
        paid: number,
        paymentMethodId: string
    }`,
];

let userStr = `user: {
    ${userField}
    role: string
}`;

let objectInterfaces = [
 `interface PaymentMethod {
        id: string,
        name: string
    }`, 
    `interface Agency {
        id: string,
        locationDesc: string,
        quarter: string,
        city: string,
    }`, 
    `interface Bus {
        id: string,
        serialNumber: string,
        brand: string,
        capacity: number,
        used: boolean
    }`, 
    `interface AgencyAgent {
        id: string,
        ${userStr},
        agencyId: string,
    }`, 
    `interface AdminAccount {
        id: string,
        ${userField}
    }`,
    `interface Customer {
        id: string,
        ${userStr}
    }`,
    `interface BusDriver {
        id: string,
        ${userStr}
    }`,
    `interface TravelTicket {
        id: string,
        refNumber: string,
        ticketType: string,
        issuanceDatetime: Date,
        paid: number,
        paymentMethod: string,
        customerId: string,
        customerFullname: string,
        agencyId: string,
        travelId: string,
        used: boolean,
        refund: boolean
    }`,
    `interface TicketRefund {
        id: string,
        ticketRefNumber: string,
        paid: number,
        datetime: Date,
        paymentMethod: string
    }`,
]

for(let i = 0; i < models.length; i++) {
    let model = models[i];
    let name = names[i];
    run(`ng generate interface ${name}-management/interfaces/${name}`);
    run(`ng generate interface ${name}-management/interfaces/${name}-data`);
    run(`ng generate service services/${name}-service`);
    let content = `import { HttpClient } from '@angular/common/http';
    import { inject, Injectable } from '@angular/core';
    import { Observable } from 'rxjs';
    import { ${urls[i]} } from '../utils/urls';

    @Injectable({
    providedIn: 'root',
    })
    export class ${model}Service {
    private httpClient = inject(HttpClient);

    save(data: ${model}Data): Observable<${model}> {
        return this.httpClient.post<${model}>(${urls[i]}, data)
    }

    update(id: string, data: ${model}Data): Observable<${model}> {
        return this.httpClient.put<${model}>(${urls[i]} + id, data);
    }

    delete(id: string): Observable<any> {
        return this.httpClient.delete(${urls[i]} + id);
    }

    getAll(): Observable<${model}[]> {
        return this.httpClient.get<${model}[]>(${urls[i]})
    }
    }`;

    fs.writeFileSync(`src/app/${name}-management/interfaces/${name}.ts`, objectInterfaces[i]);
    fs.writeFileSync(`src/app/${name}-management/interfaces/${name}-data.ts`, dataInterfaces[i]);
    fs.writeFileSync(`src/app/services/${name}-service.ts`, content.trim());
}

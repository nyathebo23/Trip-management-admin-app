import { Routes } from '@angular/router';
import { Layout } from './global/layout/layout';
import { CityManagement } from './city-management/city-management/city-management';
import { Login } from './authentication/pages/login/login';
import { BusManagement } from './bus-management/bus-management/bus-management';
import { AgencyManagement } from './agency-management/agency-management/agency-management';
import { AgencyAgentManagement } from './agency-agent-management/agency-agent-management/agency-agent-management';
import { PaymentMethodManagement } from './payment-method-management/payment-method-management/payment-method-management';
import { BusDriverManagement } from './bus-driver-management/bus-driver-management/bus-driver-management';
import { CustomerManagement } from './customer-management/customer-management/customer-management';
import { AdminAccountManagement } from './admin-account-management/admin-account-management/admin-account-management';
import { TravelTicketManagement } from './travel-ticket-management/travel-ticket-management/travel-ticket-management';
import { TicketRefundManagement } from './ticket-refund-management/ticket-refund-management/ticket-refund-management';
import { TravelManagementPage } from './travel-management/travel-management-page/travel-management-page';


export const routes: Routes = [
    {
        path: 'management', 
        component: Layout,
        children: [
            {path: 'city', component: CityManagement},
            {path: 'bus', component: BusManagement},
            {path: 'agency', component: AgencyManagement},
            {path: 'agency-agent', component: AgencyAgentManagement},
            {path: 'payment-method', component: PaymentMethodManagement},
            {path: 'bus-driver', component: BusDriverManagement},
            {path: 'customer', component: CustomerManagement},
            {path: 'travel', component: TravelManagementPage},
            {path: 'admin-account', component: AdminAccountManagement},
            {path: 'ticket', component: TravelTicketManagement},
            {path: 'refund', component: TicketRefundManagement},
        ]
    },
    {
        path: 'login',
        component: Login
    }
];

import { Routes } from '@angular/router';
import { Layout } from './global/layout/layout';
import { CityManagement } from './params-entities-views/city-management/city-management/city-management';
import { Login } from './authentication/pages/login/login';
import { BusManagement } from './params-entities-views/bus-management/bus-management/bus-management';
import { AgencyManagement } from './params-entities-views/agency-management/agency-management/agency-management';
import { AgencyAgentManagement } from './params-entities-views/agency-agent-management/agency-agent-management/agency-agent-management';
import { PaymentMethodManagement } from './params-entities-views/payment-method-management/payment-method-management/payment-method-management';
import { BusDriverManagement } from './params-entities-views/bus-driver-management/bus-driver-management/bus-driver-management';
import { CustomerManagement } from './functionnal-views/customer-management/customer-management/customer-management';
import { AdminAccountManagement } from './params-entities-views/admin-account-management/admin-account-management/admin-account-management';
import { TravelTicketManagement } from './functionnal-views/travel-ticket-management/travel-ticket-management/travel-ticket-management';
import { TicketRefundManagement } from './functionnal-views/ticket-refund-management/ticket-refund-management/ticket-refund-management';
import { TravelManagementPage } from './functionnal-views/travel-management/travel-management-page/travel-management-page';
import { authGuard } from './authentication/services/guards/auth-guard';
import { TravelPathManagement } from './params-entities-views/travel-path-management/travel-path-management/travel-path-management';
import { TravelCreateByBatch } from './functionnal-views/travel-management/travel-create-by-batch/travel-create-by-batch';
import { TravelsByAgency } from './functionnal-views/travel-management/travels-by-agency/travels-by-agency';
import { ScheduleTravelsPage } from './functionnal-views/travel-management/schedule-travels-page/schedule-travels-page';
import { TravelsCityCity } from './functionnal-views/travel-management/travels-city-city/travels-city-city';


export const routes: Routes = [
    {   path: '', redirectTo: 'management/travel', pathMatch: 'full'},
    {
        path: 'management', 
        canActivate: [authGuard],
        component: Layout,
        children: [
            {path: 'city', component: CityManagement},
            {path: 'bus', component: BusManagement},
            {path: 'agency', component: AgencyManagement},
            {path: 'agency-agent', component: AgencyAgentManagement},
            {path: 'payment-method', component: PaymentMethodManagement},
            {path: 'bus-driver', component: BusDriverManagement},
            {path: 'travelpath', component: TravelPathManagement},
            {path: 'admin-account', component: AdminAccountManagement},
            {path: 'customer', component: CustomerManagement},
            {path: 'travel', component: TravelManagementPage},
            {path: 'travels-city-city', component: TravelsCityCity},
            {path: 'travels-by-agency', component: TravelsByAgency},
            {path: 'travels-schedule', component: ScheduleTravelsPage},
            {path: 'travels-batch-create', component: TravelCreateByBatch},
            {path: 'travel-ticket', component: TravelTicketManagement},
            {path: 'ticket-refund', component: TicketRefundManagement},
        ]
    },

    {
        path: 'login',
        component: Login
    }
];

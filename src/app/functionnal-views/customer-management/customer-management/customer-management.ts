import { Component } from '@angular/core';
import { CustomerTableList } from '../customer-table-list/customer-table-list';

@Component({
  selector: 'app-customer-management',
  imports: [CustomerTableList],
  templateUrl: './customer-management.html',
  styleUrl: './customer-management.scss',
})
export class CustomerManagement {

}

import { Component } from '@angular/core';
import { AdminAccountForm } from "../admin-account-form/admin-account-form";
import { AdminAccountTableList } from '../admin-account-table-list/admin-account-table-list';

@Component({
  selector: 'app-admin-account-management',
  imports: [AdminAccountForm, AdminAccountTableList],
  templateUrl: './admin-account-management.html',
  styleUrl: './admin-account-management.scss',
})
export class AdminAccountManagement {

  
}

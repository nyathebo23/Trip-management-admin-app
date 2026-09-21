import { Component, input, OnInit } from '@angular/core';
import { IEntityAuditData } from '../interfaces/ientity-audit-data';
import { Entity } from '../interfaces/entity';
import { IEntityAudit } from '../interfaces/ientity-audit';
import { MatPaginatorModule} from '@angular/material/paginator';
import { MatTableModule} from '@angular/material/table'; 
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatCardModule } from "@angular/material/card";
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-audit-history',
  imports: [MatPaginatorModule, MatTableModule, MatIconModule, MatButtonModule, MatCardModule, DatePipe],
  templateUrl: './audit-history.html',
  styleUrl: './audit-history.scss',
})
export class AuditHistory implements OnInit {
  objectType = input.required<string>();
  entityObjects = input.required<Entity[]>();
  entityAudits = input.required<IEntityAudit[]>();
  displayedColumns: string[] = ['Audit action', 'User', 'Date'];
  entityAuditDatas: IEntityAuditData[] = [];
  ops = ['CREATE', 'UPDATE', 'DELETE'];
  
  constructor() {
    
  }

  ngOnInit(): void {
    this.displayedColumns = [this.objectType(), 'Audit action', 'User', 'Datetime'];
    this.entityAuditDatas = this.entityAudits().map(audit => {
      const entity = this.entityObjects().find(e => e.getId() === audit.entityId);
      return {
        objectStr: entity ? entity.toString() : 'Unknown',
        operationType: this.ops[audit.operationType],
        operationDatetime: audit.operationDatetime,
        user: audit.user.username,
        clientIP: audit.clientIP,
        auditDetails: audit.auditDetails,
      };
    });
  }
}

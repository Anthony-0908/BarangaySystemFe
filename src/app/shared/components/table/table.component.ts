import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ColumnDef} from './table.model';
import { TableModule } from 'primeng/table';
@Component({
  selector: 'app-table',
  imports: [TableModule,CommonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent {
  @Input() columns: ColumnDef[] = [];
  @Input() data: any[] = [];
  @Input() loading: boolean = false;



}

import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

import {
  ColumnDef,
  DataTableParams,
} from './data-table.model';

import { InputComponent } from '../input/input.component';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    InputComponent,
  ],
  templateUrl: './data-table.component.html',
})
export class DataTableComponent<
  T extends { id: number | string }
> implements OnInit {

  @Input() columns: ColumnDef<T>[] = [];

  @Input() data: T[] = [];

  @Input() totalRecords = 0;

  @Input() loading = false;

  @Output() paramsChange =
    new EventEmitter<DataTableParams>();

  @Output() edit = new EventEmitter<T>();

  @Output() delete = new EventEmitter<T>();

  page = 1;
  perPage = 10;
  search = '';
  sortBy = 'created_at';
  sortDir: 'asc' | 'desc' = 'desc';

  ngOnInit(): void {
    this.emitParams();
  }

  private emitParams(): void {
    this.paramsChange.emit({
      page: this.page,
      perPage: this.perPage,
      search: this.search,
      sortBy: this.sortBy,
      sortDir: this.sortDir,
    });
  }

  onLazyLoad(event: any): void {
    this.page = event.first / event.rows + 1;
    this.perPage = event.rows;

    if (event.sortField) {
      this.sortBy = event.sortField;
      this.sortDir =
        event.sortOrder === 1 ? 'asc' : 'desc';
    }

    this.emitParams();
  }

  onSearch(value: string): void {
    this.search = value;
    this.page = 1;

    this.emitParams();
  }
}
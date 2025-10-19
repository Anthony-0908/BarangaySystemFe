import { Component, EventEmitter, Input,OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ColumnDef, DataTableParams, DataTableResponse } from './data-table.model';
import { InputComponent } from "../input/input.component";

@Component({
  selector: 'app-data-table',
  standalone:true,
  imports: [CommonModule, TableModule, ButtonModule, InputComponent],
  templateUrl: './data-table.component.html',
})
export class DataTableComponent<T extends {id:number | string}> implements OnInit {

  @Input() columns: ColumnDef<T>[] = [];
  @Input() fetchFn!: (params:DataTableParams) => Promise<DataTableResponse<T>>;


  @Output() edit = new EventEmitter<T>();
  @Output() delete = new EventEmitter<T>();


  data:T[] = [];
  totalRecords = 0; 
  loading = true;

  page = 1;
  perPage = 10;
  search = '';
  sortBy = 'created_at';
  sortDir: 'asc' | 'desc' = 'desc';

  ngOnInit() 
  {
    this.loadData();

  }

private async loadData() {
  this.loading = true;
  try {
    const response = await this.fetchFn({
      page: this.page,
      perPage: this.perPage,
      search: this.search,
      sortBy: this.sortBy,
      sortDir: this.sortDir,
    });
    this.data = response.data;
    this.totalRecords = response.total;
  } finally {
    this.loading = false;
  }
}


  onLazyLoad(event:any) 
  { 
    this.page = event.first / event.rows + 1;
    this.perPage = event.rows;
    if(event.sortField) 
    {
      this.sortBy = event.sortField;
      this.sortDir = event.sortOrder === 1 ? 'asc' : 'desc';
    }

    this.loadData();
  }

  onSearch(value:string)
  {
    this.search = value;
    this.page = 1;
    this.loadData();
  }



}

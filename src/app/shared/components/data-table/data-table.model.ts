import { QueryParams } from "@core/helper/query-params";

export interface ColumnDef <T> { 
  field: keyof T & string;
  header:string,
  sortable?:boolean;
  clickable?:boolean;
}

export interface DataTableParams extends QueryParams { 
  page:number;
  perPage:number;
  search:string;
  sortBy:string;
  sortDir:'asc'|'desc';
}


export interface DataTableResponse<T> { 
  data:T[];
  total:number;
}
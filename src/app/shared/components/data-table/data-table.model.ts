export interface ColumnDef <T> { 
  field: keyof T & string;
  header:string,
  sortable?:boolean;
  clickable?:boolean;
}

export interface DataTableParams { 
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